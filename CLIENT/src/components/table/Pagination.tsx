import './Pagination.css';
import { Pagination } from 'react-bootstrap';

type Props = {
  totalPage: number;
  count: number;
  limit: number;
  currentPage: number;
  nameItem: string;
  setCurrentPage: (page: number) => void;
};

const PaginationComponent = (props: Props) => {
  const { totalPage, count, limit, currentPage, nameItem, setCurrentPage } = props;
  const startPage = (currentPage - 1) * limit + 1;
  const endPages = Math.min(currentPage * limit, count);
  const handleClickChangePage = (page: number): void => {
    if (page >= 1 && page <= totalPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="wrapper-pagination">
      <p className="list-items">
        {startPage} - {endPages} / {count} {nameItem}
      </p>
      <Pagination>
        <Pagination.Prev onClick={() => handleClickChangePage(Math.max(currentPage - 1, 1))}>Prev</Pagination.Prev>
        {[...Array(totalPage)].map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => handleClickChangePage(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handleClickChangePage(Math.min(currentPage + 1, totalPage))}>
          Next
        </Pagination.Next>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
