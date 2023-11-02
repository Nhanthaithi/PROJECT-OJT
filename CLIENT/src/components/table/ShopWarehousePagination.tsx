import paginationCommom from '../../common/pagination.common';
import styles from './shopWarehousePagination.module.css';
type Props = {
  total: number;
  totalPages: number;
  limit: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
};

const ShopWarehousePagination = (props: Props) => {
  const { total, totalPages, limit, setCurrentPage, currentPage } = props;
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  const handleClickChangePage = async (page: number) => {
    if (page >= paginationCommom.page && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className={styles['shop-warehouse-pagination']}>
      <div className={styles['display-result']}>
        <p className={styles['title']}>Displayed results</p>
        <p>
          1 - {limit} / {total} Subject
        </p>
      </div>
      <div className={styles['pagination']}>
        <p className={styles['title']}>Pagination</p>
        <div className={styles['wrapper-pagination']}>
          <button
            className={`btn ${styles['btn-pagination']}`}
            onClick={() => handleClickChangePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {pageNumbers.map((page) => (
            <button
              key={page}
              className={`btn ${styles['btn-pagination']} ${page === currentPage ? styles['active'] : ''}`}
              onClick={() => handleClickChangePage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className={`btn ${styles['btn-pagination']}`}
            onClick={() => handleClickChangePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopWarehousePagination;
