import React, { useEffect, useState } from 'react';
import { CategoryByIdResponse } from '../../../../apis/item/category/responses/get-category.response';
import styles from './EditCatgory.module.css';
import { deleteCategory, getCategoryById, updateCategory } from '../../../../apis/item/category';
import { useDispatch } from 'react-redux';
import { refreshAction } from '../../../../store/actions/category.action';
import { SUCCESS_CODES } from '../../../../constants/success.constant';

type Props = {
  idCategory: number;
};
function EditCategory(props: Props) {
  const { idCategory } = props;
  const [category, setCategory] = useState<CategoryByIdResponse>({});
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [name, setName] = useState<string>('');
  const dispatch = useDispatch();

  const findCategoryById = async (id: number): Promise<CategoryByIdResponse> => {
    const response = await getCategoryById(Number(id));
    setCategory(response);
    return response;
  };

  useEffect(() => {
    if (idCategory) {
      findCategoryById(idCategory);
    }
  }, [idCategory]);

  const handleDeleteClick = () => {
    setIsShowDelete(true);
  };

  const handleEditClick = () => {
    setIsShowEdit(true);
  };

  const handleCancel = () => {
    if (isShowDelete) {
      setIsShowDelete(false);
    }
    if (isShowEdit) {
      setIsShowEdit(false);
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    if (isShowEdit) {
      setCategory((prevCategory) => ({
        ...prevCategory,
        name: newName,
      }));
      setName(newName);
    }
  };

  const handleUpdateApi = async () => {
    try {
      await updateCategory(idCategory, name);
      dispatch(refreshAction(false));
      setIsShowEdit(false);
      alert(SUCCESS_CODES.EDIT_SUCCESSFULLY);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteApi = async () => {
    try {
      await deleteCategory(idCategory);
      dispatch(refreshAction(false));
      setIsShowDelete(false);
      alert(SUCCESS_CODES.DELETE_SUCCESSFULLY);
      setCategory({});
      setName('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section>
        <div className={styles['box-button']}>
          {isShowDelete || isShowEdit ? (
            <div className={styles['btn-left']}>
              <button className={styles['btn-keep']} onClick={isShowEdit ? handleUpdateApi : handleDeleteApi}>
                Save
              </button>
              <button className={styles['btn-cancel']} onClick={handleCancel}>
                cancel
              </button>
            </div>
          ) : (
            ''
          )}
          <div className={styles['btn-right']}>
            <button onClick={handleDeleteClick}>delete</button>
            <button onClick={handleEditClick}>edit</button>
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.info}>
            <label>Category Code</label>
            <p>{category?.code}</p>
          </div>
          <div className={styles.info}>
            <label>Category Name</label>
            <input
              type="text"
              placeholder="name"
              readOnly={!isShowEdit}
              value={category?.name || ''}
              onChange={handleChangeInput}
              name="name"
            />
          </div>
          <div className={styles.info}>
            <label>Parent Category</label>
            <p>{category?.parentCategoryName}</p>
          </div>
          <div className={styles.info}>
            <label>Registered Date</label>
            <p>{category?.createdAt}</p>
          </div>
          <div className={styles.info}>
            <label>Registered Person</label>
            <p>{category?.createdBy}</p>
          </div>
          <div className={styles.info}>
            <label>
              Update Date And <br />
              Time
            </label>
            <p>{category?.modifiedAt}</p>
          </div>
          <div className={styles.info}>
            <label>Updated Person</label>
            <p>{category?.modifiedBy}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default EditCategory;
