import { MallWarehouseResponse } from '../../../../apis/stock/mall-warehouse/responses/mall-warehouse.response';
import styles from './ListMall.module.css';
import { Link } from 'react-router-dom';

type Props = {
  mallWarehouses: MallWarehouseResponse[] | undefined;
};

function ListMall(props: Props) {
  const { mallWarehouses } = props;

  return (
    <>
      <div className={styles.wrapperTable}>
        <h4>Mall warehouse list</h4>
        <table>
          <thead>
            <tr>
              <th>List number</th>
              <th>Code</th>
              <th>Name</th>
              <th>Post code</th>
              <th>Address</th>
              <th>Usage status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mallWarehouses &&
              mallWarehouses.map((item, index) => (
                <tr key={index}>
                  <td>{item?.id}</td>
                  <td>{item?.code}</td>
                  <td>{item?.name}</td>
                  <td>{item?.postalCode}</td>
                  <td>{item?.address}</td>
                  <td>{item?.status}</td>
                  <td>
                    <Link to={`/mall-warehouses/${item.id}/edit`} className={styles.detail}>
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ListMall;
