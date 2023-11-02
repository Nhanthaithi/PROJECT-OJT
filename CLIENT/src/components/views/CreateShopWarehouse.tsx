import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import shop from '../../common/shop.common';
import styles from './CreateShopWarehouse.module.css';
import { CreateShopWarehouseDTO } from '../../apis/requests/Create-shop-warehouse.request';
import { FormikHelpers, FormikProps } from 'formik';
import { createShopWarehouseAPI } from '../../apis/stock';
import { message } from '../../common/message.common';
import schema from '../../common/schema.common';
import initialValues from '../../common/initialValues.common';

function CreateShopWarehouse() {
  const { Formik } = formik;
  const japaneseCities = ['Tokyo', 'Osaka', 'Kyoto', 'Nagoya', 'Fukuoka'];
  const handleCancel = (resetForm: FormikHelpers<CreateShopWarehouseDTO>['resetForm']) => {
    resetForm(initialValues);
  };
  const createShopWarehouse = async (
    values: CreateShopWarehouseDTO,
    resetForm: FormikHelpers<CreateShopWarehouseDTO>['resetForm'],
  ) => {
    try {
      const newData = {
        name: values.name,
        shopId: Number(values.shopId),
        code: values.postalCodeAfter,
        postalCode: values.postalCodeBefore,
        prefectureCode: values.postalCodeBefore,
        city: `${values.city} - ${values.municipalities}`,
        address: values.address,
        phoneNumber: values.phoneNumber,
        status: Number(values.status),
        createdBy: 'XuyenTN',
        modifiedBy: 'XuyenTN',
      };
      const hasEmptyField = Object.values(newData).some((value) => value === '');

      if (!hasEmptyField) {
        await createShopWarehouseAPI(newData);
        resetForm(initialValues);
        alert(message.createdSuccess);
      } else {
        alert(message.inforEmpty);
      }
    } catch (error) {}
  };
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values: CreateShopWarehouseDTO, { setSubmitting }: FormikHelpers<CreateShopWarehouseDTO>) => {
        setSubmitting(false);
      }}
      initialValues={initialValues}
    >
      {({ handleSubmit, handleChange, values, errors, resetForm }: FormikProps<CreateShopWarehouseDTO>) => (
        <Form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            createShopWarehouse(values, resetForm);
            handleSubmit();
          }}
        >
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="3">
              Shop Warehouse Name
            </Form.Label>
            <Col md="9">
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="3">
              Shop Name
            </Form.Label>
            <Col md="9">
              <Form.Select
                name="shopName"
                value={values.shopName}
                onChange={handleChange}
                isInvalid={values.shopName === ''}
              >
                <option value={0}>-- Shop Name --</option>
                {shop.map((item) => {
                  return (
                    <option key={item.id} value={(values.shopId = item.id)}>
                      {item.name}
                    </option>
                  );
                })}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.shopName}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="3">
              Postal Code
            </Form.Label>
            <Col md="4">
              <Form.Control
                type="text"
                name="postalCodeBefore"
                value={values.postalCodeBefore}
                onChange={handleChange}
                isInvalid={!!errors.postalCodeBefore}
              />
              <Form.Control.Feedback type="invalid">{errors.postalCodeBefore}</Form.Control.Feedback>
            </Col>
            <Col md="2">
              <span className="d-flex align-items-center justify-content-center">-</span>
            </Col>
            <Col md="3">
              <Form.Control
                type="text"
                name="postalCodeAfter"
                value={values.postalCodeAfter}
                onChange={handleChange}
                isInvalid={!!errors.postalCodeAfter}
              />
              <Form.Control.Feedback type="invalid">{errors.postalCodeAfter}</Form.Control.Feedback>
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
                    value={values.city}
                    onChange={handleChange}
                    isInvalid={values.city === ''}
                  >
                    <option value="">-- Chọn thành phố --</option>
                    {japaneseCities.map((item, index) => {
                      return (
                        <option key={index} value={item}>
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
                Municipalities
              </Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type="text"
                  id="municipalities"
                  placeholder="Municipalities"
                  name="municipalities"
                  value={values.municipalities}
                  onChange={handleChange}
                  isInvalid={!!errors.municipalities}
                />
              </div>
              <Form.Control.Feedback type="invalid">{errors.municipalities}</Form.Control.Feedback>
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
                  value={values.address}
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
                  value={values.phoneNumber}
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
                value={1}
                checked={values.status === 1}
                onChange={handleChange}
                isInvalid={!!errors.status}
              />
              <Form.Check
                type="radio"
                label="Stop"
                name="status"
                id="status-unactive"
                value={2}
                checked={values.status === 2}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Button type="submit" className={styles['btn-create']}>
            Create
          </Button>
          <Button type="button" className={styles['btn-cancel']} onClick={() => handleCancel(resetForm)}>
            Cancel
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default CreateShopWarehouse;
