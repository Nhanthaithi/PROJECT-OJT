import styles from './standard.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, AppState } from '../../store';
import { StandardRequest } from '../../types/standard.type';
import { Button } from 'react-bootstrap';
import PaginationComponent from '../../components/table/Pagination';
import { useSelector } from 'react-redux';
import { standardState } from '../../store/reducers/standard.reduder';
import { Link } from 'react-router-dom';
import { searchStandard } from '../../apis/item/standard';
import { getStandard } from '../../store/actions/standard.action';
import StandardFormSearch from '../../components/views/item/standardFormSearch';
import StandardTable from '../../components/views/item/standardTable';

const StandardViewPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const standards: standardState = useSelector((state: AppState) => state.standardReducer);
  const [currentPage, setCurrentPage] = useState(1);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const limit: number = 10;
  const nameItem = 'record';

  const handeleCallAPI = async () => {
    try {
      const searchParams: StandardRequest = {
        page: currentPage,
        limit: limit,
        sort: 'DESC',
        orderBy: 'createdAt',
      };
      if (name) {
        searchParams.name = name;
      }
      if (code && code.length === 4) {
        searchParams.code = code;
      }
      const res = await searchStandard(searchParams);
      dispatch(getStandard(res));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handeleCallAPI();
  }, [name, code, currentPage]);
  return (
    <div className="col-10 pe-0">
      <section id={styles['standard_list']}>
        <div className={styles['sl__div_padding']}>
          <div className={styles['sl__div_search']}>
            <StandardFormSearch setCode={setCode} setName={setName} setCurrentPage={setCurrentPage} />
          </div>
          <div className={styles['sl__div_padding']}>
            <div className={styles['sl__div_flex_bettween']}>
              <div>
                <Link to={'created'}>
                  <Button variant="outline-success" size="lg">
                    Create
                  </Button>
                </Link>
              </div>
              {standards && (
                <PaginationComponent
                  totalPage={standards.totalPage}
                  count={standards.totalRecord}
                  limit={limit}
                  currentPage={currentPage}
                  nameItem={nameItem}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </div>
          </div>
          <div className={styles['sl__div_table']}>
            <StandardTable />
          </div>
        </div>
      </section>
    </div>
  );
};

export default StandardViewPage;
