import ItemListTable from '../components/views/item/ItemListTable';
import ItemListFormSearch from '../components/views/item/ItemListFormSearch';
import { getItemAPI } from '../apis/item';
import { getItemAction } from '../store/actions/item.action';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { ItemRequest } from '../apis/item/requests/item.request';
import paginationCommom from '../common/pagination.common';

const ItemListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const [searchItemQuery, setSearchItemQuery] = useState<Partial<ItemRequest>>({
    name: '',
    code: '',
    limit: paginationCommom.limit,
  });

  const dispatch = useDispatch();

  const handleGetItems = async (page: number) => {
    const result = await getItemAPI({ ...searchItemQuery, page });
    if ('data' in result) {
      dispatch(getItemAction(result));
    } else {
      setError(result.message);
    }
  };

  useEffect(() => {
    handleGetItems(currentPage);
  }, [currentPage]);

  return (
    <div className="col-10 pe-0">
      <ItemListFormSearch
        searchItemQuery={searchItemQuery}
        setSearchItemQuery={setSearchItemQuery}
        setCurrentPage={setCurrentPage}
        setError={setError}
      />
      {error ? (
        <b className="text-danger">{error}</b>
      ) : (
        <ItemListTable
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          searchItemQuery={searchItemQuery}
          setSearchItemQuery={setSearchItemQuery}
        />
      )}
    </div>
  );
};

export default ItemListPage;
