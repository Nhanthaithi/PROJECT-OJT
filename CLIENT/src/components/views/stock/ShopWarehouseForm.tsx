import { FormEvent, useState } from 'react';
import styles from './ShopWarehouse.module.css';
import { getShopWarehouseAPI } from '../../../apis/stock';
import { getShopWarehouse } from '../../../store/actions/ShopWarehouse.action';
import { useDispatch } from 'react-redux';
import errorSearchMessage from '../../../common/error.common';
import paginationCommom from '../../../common/pagination.common';
import { Link } from 'react-router-dom';

type Props = {
  setShopId: (shopId: string) => void;
  setCode: (code: string) => void;
  code: string | '';
  shopId: string | '';
  setTotalPages: (totalPages: number) => void;
  setTotalRecords: (totalRecords: number) => void;
};
const ShopWarehouseForm = (props: Props) => {
  const { setShopId, setCode, code, shopId, setTotalPages, setTotalRecords } = props;
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'code') {
      if (value.length === 11 || value.length === 0) {
        setCode(value);
        setErrorMessage('');
      } else {
        setErrorMessage(errorSearchMessage.lengthCode);
      }
    } else if (name === 'shopId') {
      if (!isNaN(Number(value))) {
        setShopId(value);
        setErrorMessage('');
      } else {
        setErrorMessage(errorSearchMessage.shopIdType);
      }
    }
  };

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (code === '' || shopId === '') {
        const result = await getShopWarehouseAPI({ limit: paginationCommom.limit });
        dispatch(getShopWarehouse(result.data));
        setTotalPages(result.totalPage);
        setTotalRecords(result.totalRecords);
      }
      const result = await getShopWarehouseAPI({ limit: paginationCommom.limit, code, shopId: shopId });
      dispatch(getShopWarehouse(result.data));
      setTotalPages(result.totalPage);
      setTotalRecords(result.totalRecords);
      setCode('');
      setShopId('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className={styles['form']} onSubmit={handleSearch}>
      <div className={styles['wrapper-form']}>
        <div className={styles['wrapper-input']}>
          <input
            onChange={handleChangeInput}
            name="code"
            type="text"
            className={styles['shop-warehouse-input']}
            placeholder="Shop Warehouse Code"
          />
        </div>
        <div className={styles['wrapper-input']}>
          <input
            onChange={handleChangeInput}
            name="shopId"
            type="text"
            className={styles['shop-warehouse-input']}
            placeholder="Shop selection field"
          />
        </div>
        <button type="submit" className={`btn ${styles['btn-search']}`}>
          Search
        </button>
      </div>
      <p className={styles.danger}>{errorMessage}</p>
      <Link to="/create-shop-warehouse" className={`btn ${styles['btn-display']}`}>
        Create
      </Link>
    </form>
  );
};

export default ShopWarehouseForm;
