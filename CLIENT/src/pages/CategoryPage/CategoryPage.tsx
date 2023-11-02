import { useEffect, useState } from 'react';
import { getListCategory } from '../../apis/item/category';
import { CategoryRequest } from '../../apis/item/category/requests/get-list-category.request';
import EditCategory from '../../components/views/item/edit-category/EditCategory';
import ListCategory from '../../components/views/item/navbar/ListCategory';
import styles from './CategoryPage.module.css';
import { useDispatch } from 'react-redux';
import { getListCategoryAction } from '../../store/actions/category.action';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import RegisterCategory from '../../components/views/item/register-category/RegisterCategory';
import paginationCommom from '../../common/pagination.common';

function Category() {
  const dispatch = useDispatch();
  const [idCategory, setIdCategory] = useState(0);
  const isRefresh = useSelector((state: AppState) => state.refreshReducer);
  const [isCreate, setIsCreate] = useState(false);

  const handleGetListCategory = async (queryCategory: CategoryRequest) => {
    try {
      const response = await getListCategory(queryCategory);
      dispatch(getListCategoryAction(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetListCategory({ limit: paginationCommom.limit, page: paginationCommom.page, sort: 'name' });
  }, [isRefresh]);

  return (
    <>
      <section className={`${styles.box} col-10`}>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <ListCategory setIdCategory={setIdCategory} setIsCreate={setIsCreate} />
          </div>
          <div className={styles.right}>
            {isCreate ? <RegisterCategory setIsCreate={setIsCreate} /> : <EditCategory idCategory={idCategory} />}
          </div>
        </div>
      </section>
    </>
  );
}

export default Category;
