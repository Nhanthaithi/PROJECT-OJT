import { useState } from 'react';
import styles from './SearchMall.module.css';
import { Link } from 'react-router-dom';

type Props = {
  setDataInputSearch: (code: string | undefined) => void;
  setCurrentPage: (page: number) => void;
};

function SearchMall(props: Props) {
  const [searchValue, setSearchValue] = useState<string>('');
  const { setDataInputSearch, setCurrentPage } = props;
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setError('');
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue.length > 11) {
      setError('Mall Warehouse Code has a maximum of 11 characters');
      return;
    }
    setCurrentPage(1);
    setDataInputSearch(searchValue);
  };

  return (
    <div className={styles.wrapperForm}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Mall Warehouse Code"
          className={styles.inputSearch}
          value={searchValue}
          onChange={handleInputChange}
        />
        <button type="submit" className={styles.btnSearch}>
          Search
        </button>
      </form>
      {error && <div className={styles.error}>{error}</div>}
      <Link to="/mall-warehouses/create">
        <button className={styles.btnCreate}>Create</button>
      </Link>
    </div>
  );
}

export default SearchMall;
