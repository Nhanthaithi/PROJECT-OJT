import { Table } from 'react-bootstrap';
import './ItemListTable.css';
import PaginationComponent from '../../table/Pagination';
import { useSelector } from 'react-redux';
import { RootState } from '../../../types/root-state.type';
import { Link } from 'react-router-dom';
import { ItemRequest } from '../../../apis/item/requests/item.request';
import { getItemAPI } from '../../../apis/item';
import { useDispatch } from 'react-redux';
import { getItemAction } from '../../../store/actions/item.action';
import { useEffect } from 'react';

type Props = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  searchItemQuery: Partial<ItemRequest>;
  setSearchItemQuery: (data: Partial<ItemRequest>) => void;
};

const ItemListTable = (props: Props) => {
  const { currentPage, setCurrentPage, searchItemQuery, setSearchItemQuery } = props;

  const items = useSelector((state: RootState) => state.itemReducer.data);
  const totalPages = useSelector((state: RootState) => state.itemReducer.totalPage);
  const countItems = useSelector((state: RootState) => state.itemReducer.count);
  const limit = Number(useSelector((state: RootState) => state.itemReducer.limit));

  const dispatch = useDispatch();

  const handleGetItemsBySort = async (page: number) => {
    const result = await getItemAPI({ ...searchItemQuery, page });
    if ('data' in result) {
      dispatch(getItemAction(result));
    }
  };

  const handleSortItem = async (orderBy: string) => {
    setSearchItemQuery({
      ...searchItemQuery,
      orderBy,
    });
  };

  useEffect(() => {
    if (searchItemQuery.orderBy) {
      handleGetItemsBySort(currentPage);
    }
  }, [searchItemQuery, currentPage]);

  return (
    <div className="mt-5 list-item">
      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-success">Create New Item</button>
        <div className="d-flex justify-content-end align-items-center">
          <PaginationComponent
            currentPage={currentPage}
            totalPage={totalPages}
            setCurrentPage={(page) => setCurrentPage(page)}
            limit={limit}
            count={countItems}
            nameItem="Items"
          />
        </div>
      </div>

      <Table hover bordered className="item-table mt-5 text-center">
        <thead>
          <tr>
            <th>No</th>
            <th>Item Code</th>
            <th onClick={() => handleSortItem('name')}>Item Name</th>
            <th>Item Type</th>
            <th>Represetative Image</th>
            <th onClick={() => handleSortItem('shopName')}>Shop Name</th>
            <th onClick={() => handleSortItem('brandName')}>Brand Name</th>
            <th>Standard Name</th>
            <th onClick={() => handleSortItem('categoryName')}>Category Name</th>
            <th>Displayed Flag</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 &&
            items.map((item, index) => (
              <tr key={item.id}>
                <td>{(currentPage - 1) * limit + index + 1}</td>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.representativeItemImageUrl[0]}</td>
                <td>{item.shopName}</td>
                <td>{item.brandName}</td>
                <td>{item.mainStandardname[0]}</td>
                <td>{item.categoryName}</td>
                <td>{item.isDisplayed ? 'Yes' : 'No'}</td>
                <td>
                  <Link to={`/items/${item.id}`} className="text-decoration-none">
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ItemListTable;
