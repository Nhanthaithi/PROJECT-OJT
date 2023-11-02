import styles from './ItemListFormSearch.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { getItemAPI } from '../../../apis/item';
import { getItemAction } from '../../../store/actions/item.action';
import { ItemRequest } from '../../../apis/item/requests/item.request';
import { Fragment, useEffect, useState } from 'react';
import { getBrandAPI } from '../../../apis/brand';
import { BrandResponse } from '../../../apis/brand/responses/brand.response';
import paginationCommom from '../../../common/pagination.common';
import { CategoryResponse } from '../../../apis/category/response/category.response';
import { getCategoryAPI } from '../../../apis/category';

type Props = {
  searchItemQuery: Partial<ItemRequest>;
  setSearchItemQuery: (data: Partial<ItemRequest>) => void;
  setCurrentPage: (page: number) => void;
  setError: (error: string | null) => void;
};

const ItemListFormSearch = (props: Props) => {
  const { searchItemQuery, setSearchItemQuery, setCurrentPage, setError } = props;
  const [errorValidate, setErrorValidate] = useState({
    errorCode: '',
    errorName: '',
  });
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [brands, setBrands] = useState<BrandResponse[]>([]);

  const handleGetBrands = async () => {
    try {
      const brandsResponse = await getBrandAPI({ limit: paginationCommom.limit });
      setBrands(brandsResponse.data);
    } catch (erorr) {
      throw erorr;
    }
    const brandsResponse = await getBrandAPI({ limit: paginationCommom.limit });
    setBrands(brandsResponse.data);
  };

  const handleGetCategories = async () => {
    const categoriessResponse = await getCategoryAPI({ page: paginationCommom.page, limit: paginationCommom.limit });
    setCategories(categoriessResponse.data);
  };

  useEffect(() => {
    handleGetBrands();
    handleGetCategories();
  }, []);

  const dispatch: AppDispatch = useDispatch();

  const renderCategoryTree = (parentId: number, indent: string = ''): JSX.Element[] => {
    return categories
      .filter((cat) => Number(cat.parentCategoryId) === parentId)
      .map((cat) => (
        <Fragment key={cat.id}>
          <option value={cat.id}>
            {indent}
            {cat.name}
          </option>
          {renderCategoryTree(Number(cat.id), indent + '--')}
        </Fragment>
      ));
  };

  const changeInputSearchItems = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSearchItemQuery({
      ...searchItemQuery,
      [name]: value,
    });

    switch (name) {
      case 'code':
        setErrorValidate((prev) => ({ ...prev, errorCode: '' }));
        break;
      case 'name':
        setErrorValidate((prev) => ({ ...prev, errorCode: '' }));
        break;
    }
  };

  const changeSelectSearchItems = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchItemQuery({
      ...searchItemQuery,
      [name]: value,
    });
  };

  const handleSearchItem: React.MouseEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault();

    if (searchItemQuery.code && searchItemQuery.code?.length > 16) {
      setErrorValidate((prev) => ({ ...prev, errorCode: 'Code Max length is 16 chars' }));
      return false;
    }

    if (searchItemQuery.name && searchItemQuery.name?.length > 200) {
      setErrorValidate((prev) => ({ ...prev, errorName: 'Name Max length is 200 chars' }));
      return false;
    }

    const responseItems = await getItemAPI(searchItemQuery);
    if ('data' in responseItems) {
      setCurrentPage(1);
      setError(null);
      return dispatch(getItemAction(responseItems));
    } else {
      setCurrentPage(1);
      setError(responseItems.message);
    }
  };

  return (
    <div className="search-form-wrapper">
      <div className="header-top">
        <form className={styles['search-form']}>
          <div className={styles['form-group']}>
            <input
              className={styles['search-input']}
              type="text"
              name="code"
              placeholder="Enter product code"
              onChange={changeInputSearchItems}
              value={searchItemQuery.code}
            />

            <select className={styles['search-select']} name="brandId" onChange={changeSelectSearchItems}>
              <option value={''}>Select brand</option>
              {brands?.length > 0 &&
                brands?.map((brand) => (
                  <option key={brand.id} value={brand?.id}>
                    {brand?.name}
                  </option>
                ))}
            </select>

            <div className={styles['radio-group']}>
              <input
                type="radio"
                id="isDisplayed"
                name="isDisplayed"
                value="1"
                className={styles['radio-button']}
                onChange={changeInputSearchItems}
              />
              <label htmlFor="isDisplayed" className={styles['radio-label']}>
                Displayed
              </label>

              <input
                type="radio"
                id="isNotDisplayed"
                name="isDisplayed"
                value="0"
                className={styles['radio-button']}
                onChange={changeInputSearchItems}
              />
              <label htmlFor="isNotDisplayed" className={styles['radio-label']}>
                Not displayed
              </label>
            </div>
            <p
              className={`${styles.error} text-danger`}
              style={{ display: errorValidate.errorCode ? 'block' : 'none' }}
            >
              {errorValidate.errorCode}
            </p>

            <input
              className={styles['search-input']}
              type="text"
              name="name"
              placeholder="Enter product name"
              onChange={changeInputSearchItems}
              value={searchItemQuery.name}
            />

            <select className={styles['search-select']} name="shopId" onChange={changeSelectSearchItems}>
              <option value={''}>Select Shop</option>
              <option value="1">Shop 1</option>
              <option value="2">Shop 2</option>
              <option value="3">Shop 3</option>
              <option value="4">Shop 4</option>
              <option value="5">Shop 5</option>
            </select>

            <div className={styles['radio-group']}>
              <input
                type="radio"
                id="hasImage"
                name="hasMainImage"
                value="1"
                className={styles['radio-button']}
                onChange={changeInputSearchItems}
              />
              <label htmlFor="hasImage" className={styles['radio-label']}>
                Has Image
              </label>
              <input
                type="radio"
                id="noHasImage"
                name="hasMainImage"
                value="0"
                className={styles['radio-button']}
                onChange={changeInputSearchItems}
              />
              <label htmlFor="noHasImage" className={styles['radio-label']}>
                No Image
              </label>
            </div>

            <select className={styles['search-select']} name="categoryId" onChange={changeSelectSearchItems}>
              <option value={''}>Select Category</option>
              {renderCategoryTree(0)}
            </select>

            <p
              className={`${styles.error} text-danger`}
              style={{ display: errorValidate.errorName ? 'block' : 'none' }}
            >
              {errorValidate.errorName}
            </p>
          </div>

          <div className={styles['form-group']}></div>
          <input
            type="submit"
            value="Search"
            className={styles['search-input-type-submit']}
            onClick={handleSearchItem}
          />
        </form>
      </div>
    </div>
  );
};

export default ItemListFormSearch;
