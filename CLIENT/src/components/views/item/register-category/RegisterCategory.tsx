import { useSelector } from 'react-redux';
import styles from './RegisterCategory.module.css';
import { RootState } from '../../../../types/root-state.type';
import { Fragment, useState } from 'react';
import { createCategory } from '../../../../apis/item/category';
import { useDispatch } from 'react-redux';
import { refreshAction } from '../../../../store/actions/category.action';
import { SUCCESS_CODES } from '../../../../constants/success.constant';

type Props = {
  setIsCreate: (data: boolean) => void;
};

function RegisterCategory(prop: Props) {
  const { setIsCreate } = prop;
  const listData = useSelector((state: RootState) => state.categoryReducer);
  const [nameChildren, setNameChildren] = useState('');
  const [idParent, setIdParent] = useState('');
  const dispatch = useDispatch();
  const [messageError, setMessageError] = useState('');
  const [isError, setIsError] = useState(false);
  const [messageValue, setMessageValue] = useState('');
  const [isErrorValue, setIsErrorValue] = useState(false);

  const renderCategoryOptions = (parenId: number, indent: string = ''): JSX.Element[] => {
    return listData
      .filter((data) => Number(data.parentCategoryId) === parenId)
      .map((data) => (
        <Fragment key={data.id}>
          <option value={data.id}>
            {indent}
            {data.name}
          </option>
          {renderCategoryOptions(Number(data.id), indent + '--')}
        </Fragment>
      ));
  };

  const changeInputCategory = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name } = e.target;
    switch (name) {
      case 'name':
        setNameChildren(value);
        if (value.length < 1 || value.length > 200) {
          setMessageError('characters 1 to 200');
          setIsError(true);
        } else {
          setMessageError('');
          setIsError(false);
        }
        break;
      case 'option':
        setIdParent(value);
        if (value === '') {
          setMessageValue('you must provide a value');
          setIsErrorValue(true);
        } else {
          setMessageValue('');
          setIsErrorValue(false);
        }
        break;
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createCategory({ name: nameChildren, parentCategoryId: idParent });
      setIsCreate(false);
      dispatch(refreshAction(false));
      alert(SUCCESS_CODES.CREATE_SUCCESSFULLY);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section className={styles['category-register']}>
      <div className={styles['box-register']}>
        <form id={styles['form-register']} onSubmit={handleSave}>
          <div className={styles['box-name-category']}>
            <label>Category Name</label>
            <div>
              <input className={styles['category-name']} name="name" onChange={changeInputCategory} />
              <p className={styles['error-name']}>{isError && messageError}</p>
            </div>
          </div>
          <div className={styles['box-level-category']}>
            <label>Parent Name</label>
            <div>
              <select name="option" className={styles['select-name-category']} onChange={changeInputCategory}>
                <option value={''}>Level</option>
                <option value={0}>Create Category Main</option>
                {renderCategoryOptions(0)}
              </select>
              <p className={styles['error-name']}>{isErrorValue && messageValue}</p>
            </div>
          </div>
          <div className={styles['btn-register-categories']}>
            <button>Save</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default RegisterCategory;
