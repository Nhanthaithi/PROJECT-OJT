import CreateShopWarehouse from '../../components/views/CreateShopWarehouse';
import styles from './PageCreate.module.css';

const PageCreate = () => {
  return (
    <section className={`col-10 ${styles['section-create']}`}>
      <CreateShopWarehouse />
    </section>
  );
};

export default PageCreate;
