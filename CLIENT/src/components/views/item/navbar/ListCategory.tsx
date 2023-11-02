import styles from './ListCategory.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../types/root-state.type';
import { CategoryResponse } from '../../../../apis/item/category/responses/get-list-category.response';

type Props = {
  setIdCategory: (idCategory: number) => void;
  setIsCreate: (data: boolean) => void;
};

function ListCategory(props: Props) {
  const { setIdCategory, setIsCreate } = props;
  const data = useSelector((state: RootState) => state.categoryReducer);

  const renderCategories = (categoryList: CategoryResponse[], parentId: string = '0', level: number = 0) => {
    const filteredCategories = categoryList.filter(
      (category) => Number(category.parentCategoryId) === Number(parentId),
    );

    if (filteredCategories.length === 0) {
      return null;
    }
    const handleClickCategory = async (id: number) => {
      setIdCategory(id);
    };
    return (
      <ul>
        {filteredCategories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => {
                handleClickCategory(category.id);
                setIsCreate(false);
              }}
              className="nav-link"
            >
              <span className="fw-bold fs-2">{'.'.repeat(level)}</span>
              {category.name}
              {/* {category.name} */}
            </button>
            {renderCategories(categoryList, category.id.toString(), level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <section>
        <nav className={styles.left}>
          <div className={styles.create}>
            <button onClick={() => setIsCreate(true)} className={styles.a}>
              Create
            </button>
          </div>
          <div className={styles['list-category']}>{renderCategories(data)}</div>
        </nav>
      </section>
    </>
  );
}

export default ListCategory;
