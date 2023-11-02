import EditShopWarehouse from '../../components/views/EditShopWarehouse';
import styles from './EditPageShopWarehouse.module.css';
import { useParams } from 'react-router-dom';
import { getShopWarehouseId } from '../../apis/stock';
import { useEffect, useState } from 'react';
import EditWarehouseDTO from '../../apis/stock/response/editShopWarehouse.dto';

const EditPage = () => {
  const { id } = useParams<{ id: string }>();
  // const dispatch = useDispatch();
  const [data, setData] = useState<EditWarehouseDTO>({});
  const handleFetchData = async () => {
    try {
      const result = await getShopWarehouseId(Number(id));
      // dispatch(editShopWarehouse(result));
      setData(result);
    } catch (error) {}
  };
  useEffect(() => {
    handleFetchData();
  }, []);
  return (
    <section className={`col-10 ${styles['section-edit']}`}>
      <EditShopWarehouse id={Number(id)} data={data} />
    </section>
  );
};

export default EditPage;
