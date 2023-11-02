import { useEffect, useState } from 'react';
import { getMallWarehouse } from '../../apis/stock/mall-warehouse';
import styles from './ListMalls.module.css';
import { MallWarehouseResponse } from '../../apis/stock/mall-warehouse/responses/mall-warehouse.response';
import SearchMall from '../../components/views/mall-warehouse/SearchMall/SearchMall';
import ListMall from '../../components/views/mall-warehouse/ListMall/ListMall';
import PaginationComponent from '../../components/table/Pagination';
import { Container } from 'react-bootstrap';

function ListMallPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(1);
  const [dataSearch, setDataSearch] = useState<MallWarehouseResponse[] | undefined>();
  const [dataInputSearch, setDataInputSearch] = useState<string | undefined>(undefined);
  const nameItem = 'warehouse';

  const getMallWarehouses = async (page: number, dataInputSearch: string | undefined) => {
    const response = await getMallWarehouse({ page, limit: 4, sort: 'DESC', code: dataInputSearch || undefined });
    setDataSearch(response.data);
    setTotalPages(response.totalPages);
    setTotalRecords(response.totalRecords);
    setLimit(Number(response.limit));
  };

  useEffect(() => {
    getMallWarehouses(currentPage, dataInputSearch);
  }, [currentPage, dataInputSearch]);

  return (
    <div className={`${styles.wrapperPage} col-10`}>
      <Container>
        <div className={styles.wrapperHeader}>
          <SearchMall setDataInputSearch={setDataInputSearch} setCurrentPage={setCurrentPage} />
          <PaginationComponent
            nameItem={nameItem}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            count={totalRecords}
            totalPage={totalPages}
            limit={limit}
          />
        </div>
        <ListMall mallWarehouses={dataSearch} />
      </Container>
    </div>
  );
}

export default ListMallPage;
