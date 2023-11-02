import React, { useEffect, useState } from 'react';
import ShopWarehouseForm from '../../components/views/stock/ShopWarehouseForm';
import styles from './ShopWarehousePage.module.css';
import { getShopWarehouseAPI } from '../../apis/stock';
import { useDispatch } from 'react-redux';
import { getShopWarehouse } from '../../store/actions/ShopWarehouse.action';
import ShopWarehousePagination from '../../components/table/ShopWarehousePagination';
import ShopWarehouseTable from '../../components/views/stock/ShopWarehouseTable';
import paginationCommom from '../../common/pagination.common';

const ShopWarehousePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(1);
  const [code, setCode] = useState('');
  const [shopId, setShopId] = useState('');
  const dispatch = useDispatch();

  const handleGetListShopWarehouse = async (page: number) => {
    try {
      const result = await getShopWarehouseAPI({
        page,
        limit: paginationCommom.limit,
      });
      setTotalPages(result.totalPage);
      setTotalRecords(result.totalRecords);
      setLimit(Number(result.limit));
      dispatch(getShopWarehouse(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetListShopWarehouse(currentPage);
  }, [currentPage]);

  return (
    <section className={`col-10 ${styles['shop-warehouse-top']}`}>
      <div className={styles['wrapper-content']}>
        <ShopWarehouseForm
          setCode={setCode}
          setShopId={setShopId}
          code={code}
          shopId={shopId}
          setTotalRecords={setTotalRecords}
          setTotalPages={setTotalPages}
        />
        <ShopWarehousePagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          total={totalRecords}
          totalPages={totalPages}
          limit={limit}
        />
      </div>
      <ShopWarehouseTable currentPage={currentPage} limit={limit} />
    </section>
  );
};

export default ShopWarehousePage;
