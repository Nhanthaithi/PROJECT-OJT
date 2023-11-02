import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Formik } from 'formik';
import { schema } from '../../apis/common/schema.common';
import { FormikHelpers, FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import EditWarehouseDTO from '../../apis/stock/response/editShopWarehouse.dto';
import { deleteShopWarehouseAPI, updateShopWarehouseAPI } from '../../apis/stock';
import { useNavigate } from 'react-router-dom';
import initialValues from '../../apis/common/initialValues.common';
import styles from './EditShopWrarehouse.module.css';
import { message } from '../../constants/validate.constants';
interface Props {
  id: number;
  data: EditWarehouseDTO;
}
const EditShopWarehouse = (props: Props) => {
  const { id, data } = props;
  //TO DO
  const japaneseCities = ['Tokyo', 'Osaka', 'Kyoto', 'Nagoya', 'Fukuoka'];
  const [readOnly, setReadOnly] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [initValues, setInitValues] = useState<Partial<EditWarehouseDTO> | null>(null);
  useEffect(() => {
    if (data) {
      setInitValues(data as unknown as EditWarehouseDTO);
    }
  }, [data]);
  const editShopWarehouse = () => {
    setReadOnly(false);
    setIsEditing(!isEditing);
  };
  const handleSave = async (values: EditWarehouseDTO) => {
    setReadOnly(false);
    setIsEditing(!isEditing);
    try {
      const newData = {
        name: values?.name || '',
        postalCode: values?.postalCode || '',
        prefectureCode: values?.prefectureCode || '',
        city: `${values?.city?.trim()} ` || '',
        address: values?.address || '',
        phoneNumber: values?.phoneNumber || '',
        status: Number(values?.status) || 1,
      };
      const hasEmptyField = Object.values(newData).some((value) => value === '');
      if (!hasEmptyField) {
        await updateShopWarehouseAPI(Number(id), newData);
        alert(message.updateSuccess);
      } else {
        alert(message.inforEmpty);
      }
    } catch (error) {}
  };
  const handleCancel = () => {
    setIsEditing(!isEditing);
    setReadOnly(true);
  };
  const handleDelete = () => {
    deleteShopWarehouseAPI(id);
    navigate('/shop-warehouses');
  };
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values: EditWarehouseDTO, { setSubmitting }: FormikHelpers<EditWarehouseDTO>) => {
        setSubmitting(false);
      }}
      key={initValues?.id}
      initialValues={initValues || initialValues}
    >
      {({ handleChange, values, errors }: FormikProps<EditWarehouseDTO>) => (
        <Form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            handleSave(values);
          }}
        >
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="3">
              Code
            </Form.Label>
            <Col md="9">
              <p>{data?.code}</p>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="3">
              Shop WareHouse name
            </Form.Label>
            <Col md="9">
              <Form.Control
                type="text"
                name="name"
                readOnly={readOnly}
                value={values?.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="3">
              Shop name
            </Form.Label>
            <Col md="9">
              <p>ShopName</p>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="3">
              Postal Code
            </Form.Label>
            <Col md="4">
              <Form.Control
                type="text"
                name="prefectureCode"
                readOnly={readOnly}
                value={values?.prefectureCode}
                onChange={handleChange}
                isInvalid={!!errors.prefectureCode}
              />
              <Form.Control.Feedback type="invalid">{errors.prefectureCode}</Form.Control.Feedback>
            </Col>
            <Col md="2">
              <span className="d-flex align-items-center justify-content-center">-</span>
            </Col>
            <Col md="3">
              <Form.Control
                type="text"
                name="postalCode"
                readOnly={readOnly}
                value={values?.postalCode}
                onChange={handleChange}
                isInvalid={!!errors.postalCode}
              />
              <Form.Control.Feedback type="invalid">{errors.postalCode}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <div className="mb-3">
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md="3">
                City
              </Form.Label>
              <Col md="9">
                <div className="d-flex align-items-center">
                  <Form.Select
                    id="city"
                    name="city"
                    value={values?.city}
                    onChange={handleChange}
                    disabled={readOnly}
                    isInvalid={values?.city === ''}
                  >
                    <option value="">-- Chọn thành phố --</option>
                    {japaneseCities.map((item, index) => {
                      return (
                        <option key={index} value={item} selected={values?.city === item}>
                          {item}
                        </option>
                      );
                    })}
                  </Form.Select>
                </div>
                <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
              </Col>
            </Form.Group>
          </div>
          <div className="mb-3">
            <Form.Group as={Row} md="3">
              <Form.Label column md="3">
                Address
              </Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type="text"
                  id="address"
                  placeholder="Address"
                  name="address"
                  readOnly={readOnly}
                  value={values?.address}
                  onChange={handleChange}
                  isInvalid={!!errors.address}
                />
              </div>
              <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="mb-3">
            <Form.Group as={Row} md="3">
              <Form.Label column md="3">
                Phone Number
              </Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type="text"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  readOnly={readOnly}
                  value={values?.phoneNumber}
                  onChange={handleChange}
                  isInvalid={!!errors.phoneNumber}
                />
              </div>
              <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
            </Form.Group>
          </div>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="3">
              Status
            </Form.Label>
            <Col md="9">
              <Form.Check
                type="radio"
                label="Active"
                name="status"
                id="status-active"
                disabled={readOnly}
                value={1}
                checked={Number(values?.status) === 1}
                onChange={handleChange}
                isInvalid={!!errors.status}
              />
              <Form.Check
                type="radio"
                label="Stop"
                name="status"
                id="status-unactive"
                disabled={readOnly}
                value={2}
                checked={Number(values?.status) === 2}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          {!isEditing && (
            <Button type="button" className={`${styles['btn-edit']} btn-warning`} onClick={editShopWarehouse}>
              Edit
            </Button>
          )}
          {isEditing && (
            <>
              <Button type="submit" className={styles['btn-save']}>
                Save
              </Button>
              <Button type="button" className={`${styles['btn-cancel']} btn-warning`} onClick={handleCancel}>
                Cancel
              </Button>
            </>
          )}
          <Button type="button" className={`${styles['btn-delete']} btn-danger`} onClick={handleDelete}>
            Delete
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EditShopWarehouse;
