import { useSelector } from 'react-redux';
import styles from './ShopWarehouseTable.module.css';
import { Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getShopWarehouse } from '../../../store/actions/ShopWarehouse.action';
import { getShopWarehouseAPI } from '../../../apis/stock';
import paginationCommom from '../../../common/pagination.common';
import { RootState } from '../../../types/root-state.type';

type Props = {
  currentPage: number;
  limit: number;
};

const ShopWarehouseTable = (props: Props) => {
  const { currentPage, limit } = props;
  const data = useSelector((state: RootState) => state.shopWarehouseReducer);
  const dispatch = useDispatch();
  const handleSort = async (orderBy: string) => {
    const result = await getShopWarehouseAPI({ limit: paginationCommom.limit, sort: orderBy });
    dispatch(getShopWarehouse(result.data));
  };
  return (
    <div>
      <h3 className={styles['title-h3']}>Shop Warehouse List</h3>
      <Table responsive className={styles['wrapper-table']}>
        <thead>
          <tr className={styles['wrapper-thead']}>
            <th>NO</th>
            <th onClick={() => handleSort('')}>Shop Code</th>
            <th onClick={() => handleSort('name')}>Shop Warehouse Name</th>
            <th onClick={() => handleSort('code')}>Shop Warehouse Code</th>
            <th onClick={() => handleSort('')}>Shop s Name</th>
            <th onClick={() => handleSort('postalCode')}>Post Code</th>
            <th onClick={() => handleSort('address')}>Address</th>
            <th onClick={() => handleSort('status')}>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody className={styles['wrapper-tbody']}>
          {data?.length > 0 &&
            data?.map((item, index) => {
              return (
                <tr className={styles['wrapper-colum']} key={item.id}>
                  <td>{(currentPage - 1) * Number(limit) + index + 1}</td>
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td>{item.code}</td>
                  <td>XuyenSHOP</td>
                  <td>{item.postalCode}</td>
                  <td>{item.address}</td>
                  <td>{item.status}</td>
                  <td>
                    <Link to={`${item.id}`} className={`btn ${styles['btn-detail']}`}>
                      Detail
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default ShopWarehouseTable;
