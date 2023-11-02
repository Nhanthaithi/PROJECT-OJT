import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './MallWarehouseForm.module.css';
import { Link } from 'react-router-dom';
import { MallWarehouseType } from '../../../types/mall-warehouse/MallWarehouse.type';
import { selectOptions } from '../../../utilities/prefecture.util';

type Props = {
  id?: string;
  hidden?: number;
  editForm?: number;
  isEditing?: boolean;
  data?: MallWarehouseType;
  onSubmit: (data: MallWarehouseType) => void;
  onChange?: (newHidden: number, newEditForm: number, newIsEditing: boolean) => void;
  onDelete?: () => void;
};

const MallWarehouseForm = (props: Props) => {
  const { id, hidden, editForm, isEditing, data } = props;

  const validateField = (fieldName: string, fieldValue: string): string => {
    switch (fieldName) {
      case 'name':
        if (fieldValue === '') {
          return 'Mall Warehouse must not be blank';
        }
        if (fieldValue?.length > 200) {
          return 'Too long';
        }
        break;
      case 'postalCodePrefix':
        if (fieldValue?.trim() && /[a-zA-Z]/.test(fieldValue)) {
          return 'Can only number';
        }
        if (fieldValue?.length !== 3) {
          return 'Have 3 numbers';
        }
        break;
      case 'postalCodeSuffix':
        if (fieldValue?.trim() && /[a-zA-Z]/.test(fieldValue)) {
          return 'Can only number';
        }
        if (fieldValue?.length !== 4) {
          return 'Have 4 numbers';
        }
        break;
      case 'phoneNumber':
        if (fieldValue?.trim() && /[a-zA-Z]/.test(fieldValue)) {
          return 'PhoneNumber can only number';
        }
        if (fieldValue?.trim() && !/^\d{10,11}$/.test(fieldValue)) {
          return 'Must be from 10 to 11 numbers';
        }
        break;
      case 'prefectureCode':
        if (fieldValue === '') {
          return 'PrefectureCode must not be blank';
        }
        break;
      case 'city':
        if (fieldValue === '') {
          return 'City must not be blank';
        }
        if (fieldValue?.length > 100) {
          return 'Too long';
        }
        break;
      case 'address':
        if (fieldValue === '') {
          return 'Address must not be blank';
        }
        if (fieldValue?.length > 200) {
          return 'Too long';
        }
        break;
      case 'operatingCompanyName':
        if (fieldValue === '') {
          return 'Company Name must not be blank';
        }
        if (fieldValue?.length > 200) {
          return 'Too long';
        }
        break;
      case 'operatingCompanyPhoneNumber':
        if (fieldValue?.trim() === '') {
          return 'Company PhoneNumber must not be blank';
        }
        if (fieldValue?.trim() && /[a-zA-Z]/.test(fieldValue)) {
          return 'Company PhoneNumber can only number';
        }
        if (fieldValue?.trim() && !/^\d{10,11}$/.test(fieldValue)) {
          return 'Must be from 10 to 11 numbers';
        }
        break;
      case 'senddingStoreCode':
        if (fieldValue === '') {
          return 'Store Code must not be blank';
        }
        if (fieldValue?.trim() && /[a-zA-Z]/.test(fieldValue)) {
          return 'Store Code can only number';
        }
        if (fieldValue?.length > 20) {
          return 'Too long';
        }
        break;
      case 'status':
        if (fieldValue === '') {
          return 'Status must not be blank';
        }
        break;
      default:
        break;
    }
    return '';
  };

  const [formData, setFormData] = useState<MallWarehouseType>({
    name: '',
    code: '',
    city: '',
    phoneNumber: '',
    address: '',
    operatingCompanyName: '',
    operatingCompanyPhoneNumber: '',
    senddingStoreCode: '',
    status: '',
    postalCode: '',
    prefectureCode: '',
  });

  const [code, setCode] = useState<MallWarehouseType>({
    postalCodePrefix: '',
    postalCodeSuffix: '',
  });

  const handleGetData = () => {
    if (data) {
      setFormData(data);

      if (data.postalCode) {
        const postalCodeParts = data.postalCode.split('-');
        setCode({
          postalCodePrefix: postalCodeParts[0],
          postalCodeSuffix: postalCodeParts[1],
        });
      }
    }
  };

  useEffect(() => {
    handleGetData();
  }, [data]);

  const [errors, setErrors] = useState<Record<string, string>>({
    name: '',
    postalCodePrefix: '',
    postalCodeSuffix: '',
    phoneNumber: '',
    prefectureCode: '',
    city: '',
    address: '',
    operatingCompanyName: '',
    operatingCompanyPhoneNumber: '',
    senddingStoreCode: '',
    status: '',
  });

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);
    setErrors({
      ...errors,
      [name]: errorMessage,
    });
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectPrefectureCode = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);
    setErrors({
      ...errors,
      [name]: errorMessage,
    });
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePostalCode = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);
    setErrors({
      ...errors,
      [name]: errorMessage,
    });
    setCode({
      ...code,
      [name]: value,
    });
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasErrors = false;

    for (const fieldName in formData) {
      if (Object.hasOwnProperty.call(formData, fieldName)) {
        const errorMessage = validateField(fieldName, formData[fieldName]);
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: errorMessage,
        }));

        if (errorMessage) {
          hasErrors = true;
        }
      }
    }

    if (!hasErrors) {
      const postalCode = `${code.postalCodePrefix}-${code.postalCodeSuffix}`;

      const data: MallWarehouseType = {
        name: formData.name,
        postalCode: postalCode,
        prefectureCode: formData.prefectureCode,
        city: formData.city,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        operatingCompanyName: formData.operatingCompanyName,
        operatingCompanyPhoneNumber: formData.operatingCompanyPhoneNumber,
        senddingStoreCode: formData.senddingStoreCode,
        status: formData.status,
      };

      props.onSubmit(data);
      handleCancel();
    }
  };

  const handleChangeHidden = () => {
    if (props.onChange) {
      props.onChange(2, 2, false);
    }
  };

  const handleCancel = () => {
    if (props.onChange) {
      props.onChange(1, 1, true);
    }
    setErrors({});
  };

  const handleDelete = () => {
    if (props.onDelete) {
      props.onDelete();
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.backgroundForm}>
        <form onSubmit={handleSubmitForm}>
          <div className={styles.formCreateMall}>
            {id ? (
              <>
                <p id={styles.mallwarecode}>Mall Warehouse Code</p>
                <p id={styles.mallwarecode}>{formData?.code}</p>
              </>
            ) : null}

            <label htmlFor="">Mall Warehouse Name</label>
            <div className={styles.formCreateMallInput}>
              <input
                type="text"
                name="name"
                value={formData?.name}
                onChange={handleChangeForm}
                readOnly={id ? editForm !== 2 : false}
              />
              <br />
              <span className="text-danger">{errors.name}</span>
            </div>

            <label htmlFor="">Postal Code</label>
            <div>
              <div className={styles.PostCode}>
                <div className={styles.PostCodeValidate}>
                  <input
                    type="text"
                    id={styles.inputPostCode}
                    name="postalCodePrefix"
                    placeholder="First 3 digits"
                    value={code?.postalCodePrefix}
                    readOnly={id ? editForm !== 2 : false}
                    onChange={handlePostalCode}
                  />
                  <p className="text-danger">{errors.postalCodePrefix}</p>
                </div>

                <div className={styles.PostCodeValidate2}>
                  <div className={styles.PostCodeValidate1}>
                    <p id={styles.postCodeP}> - </p>
                    <input
                      type="text"
                      id={styles.inputPostCode1}
                      name="postalCodeSuffix"
                      placeholder="First 4 digits"
                      value={code?.postalCodeSuffix}
                      readOnly={id ? editForm !== 2 : false}
                      onChange={handlePostalCode}
                    />
                  </div>
                  <p className="text-danger">{errors.postalCodeSuffix}</p>
                </div>
              </div>
            </div>

            <label htmlFor="">Prefecture Code</label>
            <div className={styles.formCreateMallSelect}>
              <select
                name="prefectureCode"
                className={styles.selectPrefectures}
                value={formData?.prefectureCode}
                onChange={handleSelectPrefectureCode}
                disabled={id ? isEditing : false}
              >
                {selectOptions.map((prefecture) => (
                  <option key={prefecture.value} value={prefecture.value}>
                    {prefecture.text}
                  </option>
                ))}
              </select>
              <br />
              <span className="text-danger">{errors.prefectureCode}</span>
            </div>

            <label htmlFor="">City</label>
            <div className={styles.formCreateMallInput}>
              <input
                type="text"
                name="city"
                value={formData?.city}
                onChange={handleChangeForm}
                readOnly={id ? editForm !== 2 : false}
              />
              <br />
              <span className="text-danger">{errors.city}</span>
            </div>

            <label htmlFor="">Address</label>
            <div className={styles.formCreateMallInput}>
              <input
                type="text"
                name="address"
                value={formData?.address}
                onChange={handleChangeForm}
                readOnly={id ? editForm !== 2 : false}
              />
              <br />
              <span className="text-danger">{errors.address}</span>
            </div>

            <label htmlFor="">Phone Number</label>
            <div className={styles.formCreateMallInput}>
              <input
                type="text"
                name="phoneNumber"
                value={formData?.phoneNumber}
                onChange={handleChangeForm}
                readOnly={id ? editForm !== 2 : false}
              />
              <br />
              <span className="text-danger">{errors.phoneNumber}</span>
            </div>

            <label htmlFor="">Operating Company Name</label>
            <div className={styles.formCreateMallInput}>
              <input
                type="text"
                name="operatingCompanyName"
                value={formData?.operatingCompanyName}
                onChange={handleChangeForm}
                readOnly={id ? editForm !== 2 : false}
              />
              <br />
              <span className="text-danger">{errors.operatingCompanyName}</span>
            </div>

            <label htmlFor="">Contact Phone Number</label>
            <div className={styles.formCreateMallInput}>
              <input
                type="text"
                name="operatingCompanyPhoneNumber"
                value={formData?.operatingCompanyPhoneNumber}
                onChange={handleChangeForm}
                readOnly={id ? editForm !== 2 : false}
              />
              <br />
              <span className="text-danger">{errors.operatingCompanyPhoneNumber}</span>
            </div>

            <label htmlFor="">Store Code</label>
            <div className={styles.formCreateMallInput}>
              <input
                type="text"
                name="senddingStoreCode"
                value={formData?.senddingStoreCode}
                onChange={handleChangeForm}
                readOnly={id ? editForm !== 2 : false}
              />
              <br />
              <span className="text-danger">{errors.senddingStoreCode}</span>
            </div>

            <label htmlFor="">Status</label>
            <div className={styles.formCreateMallInput}>
              <div className={styles.usageStatus}>
                <label htmlFor="status" className={styles.checkBoxStatus}>
                  <input
                    id="status"
                    type="radio"
                    name="status"
                    value={'ACTIVE'}
                    checked={formData?.status === 'ACTIVE'}
                    onChange={handleChangeForm}
                    disabled={id ? isEditing : false}
                  />
                  <p>Active</p>
                </label>
                <label htmlFor="status1" className={styles.checkBoxStatus}>
                  <input
                    id="status1"
                    type="radio"
                    name="status"
                    value={'STOP'}
                    checked={formData?.status === 'STOP'}
                    onChange={handleChangeForm}
                    disabled={id ? isEditing : false}
                  />
                  <p>Stop</p>
                </label>
              </div>
              <span className="text-danger">{errors.status}</span>
            </div>
          </div>
          {id ? (
            <>
              {hidden === 1 ? null : (
                <div className={styles.btnFormMall}>
                  <button id={styles.btnFormMallCancel} onClick={handleCancel}>
                    Cancel
                  </button>
                  <button type="submit" id={styles.btnFormMallSave}>
                    Save
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <div className={styles.btnFormMall}>
                <Link to={'/mall-warehouses'} id={styles.btnFormMallCancel}>
                  Cancel
                </Link>
                <button type="submit" id={styles.btnFormMallSave}>
                  Save
                </button>
              </div>
            </>
          )}
        </form>
        {hidden === 1 ? (
          <div className={styles.btnFormMall}>
            <button id={styles.btnFormMallCancel} onClick={handleDelete}>
              Delete
            </button>
            <button id={styles.btnFormMallSave} onClick={handleChangeHidden}>
              Edit
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MallWarehouseForm;
