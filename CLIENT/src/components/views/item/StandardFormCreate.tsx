import { Button, Form } from 'react-bootstrap';
import styles from '../../../pages/item/standard.module.css';
import { useEffect, useState } from 'react';
import { StandardRequest } from '../../../apis/item/standard/requests/standard.request';
import { createStandard } from '../../../apis/item/standard';
import { useNavigate } from 'react-router-dom';

const StandardFormCreate = () => {
  const navigate = useNavigate();
  const initialValues: StandardRequest = { code: '', label: '', name: '', description: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCode, setIsCode] = useState<boolean>(false);
  const [isLabel, setIsLabel] = useState<boolean>(false);
  const [isName, setIsName] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values: StandardRequest) => {
    const errors: Record<string, string> = {};
    const regex = /^[A-Za-z0-9]/;
    if (!values.code) {
      errors.code = 'Code is required!';
      setIsCode(true);
    } else if (!regex.test(values.code)) {
      errors.code = 'Invalid format (must be 4 alphanumeric characters)';
      setIsCode(true);
    } else if (values.code.length !== 4) {
      errors.code = 'Code must be 4 characters';
      setIsCode(true);
    } else {
      setIsCode(false);
    }
    if (!values.label) {
      errors.label = 'Label is required';
      setIsLabel(true);
    } else if (values.label.length > 200) {
      errors.label = 'Label cannot exceed more than 200 characters';
      setIsLabel(true);
    } else {
      setIsLabel(false);
    }
    if (!values.name) {
      errors.name = 'Name is required';
      setIsName(true);
    } else if (values.name.length > 200) {
      errors.name = 'Name cannot exceed more than 200 characters';
      setIsName(true);
    } else {
      setIsName(false);
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleCaLLCraeteAPI();
    }
  }, [formErrors]);

  const handleCaLLCraeteAPI = async () => {
    try {
      await createStandard(formValues);
      alert('Successfully created.');
      navigate('/standards');
    } catch (err) {
      alert('Error created.' + err);
    }
  };
  return (
    <section id={styles['standard-create']}>
      <div className={styles['sc__div-content']}>
        <Form className={styles['sc__form']} onSubmit={handleSubmit}>
          <div className={styles['sc__f-flex']}>
            <div className={styles['sc__f-flex_left']}>
              <Form.Label column="lg">Standard code</Form.Label>
            </div>
            <div className={styles['sc__f-flex_right']}>
              <Form.Control
                type="text"
                className={styles['sc__f-input-text']}
                name="code"
                onChange={handleChange}
                isInvalid={isCode}
              />
              <Form.Control.Feedback type="invalid">{isCode && formErrors.code}</Form.Control.Feedback>
            </div>
          </div>
          <div className={styles['sc__f-flex']}>
            <div className={styles['sc__f-flex_left']}>
              <Form.Label column="lg">EC display label</Form.Label>
            </div>
            <div className={styles['sc__f-flex_right']}>
              <Form.Control
                type="text"
                className={styles['sc__f-input-text']}
                name="label"
                onChange={handleChange}
                maxLength={200}
                isInvalid={isLabel}
              />
              <Form.Control.Feedback type="invalid">{isCode && formErrors.label}</Form.Control.Feedback>
            </div>
          </div>
          <div className={styles['sc__f-flex']}>
            <div className={styles['sc__f-flex_left']}>
              <Form.Label column="lg">Standard name</Form.Label>
            </div>
            <div className={styles['sc__f-flex_right']}>
              <Form.Control
                type="text"
                className={styles['sc__f-input-text']}
                name="name"
                onChange={handleChange}
                maxLength={200}
                isInvalid={isName}
              />
              <Form.Control.Feedback type="invalid">{isCode && formErrors.name}</Form.Control.Feedback>
            </div>
          </div>
          <div className={styles['sc__f-flex']}>
            <div className={styles['sc__f-flex_left']}>
              <Form.Label column="lg">Description</Form.Label>
            </div>
            <div className={styles['sc__f-flex_right']}>
              <Form.Control
                type="text"
                className={styles['sc__f-input-text']}
                name="description"
                onChange={handleChange}
                maxLength={1000}
              />
              <Form.Control.Feedback type="invalid">Please enter value</Form.Control.Feedback>
            </div>
          </div>
          <div className={styles['sc__f-center']}>
            <Button type="submit" variant="outline-success" size="lg">
              Create
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default StandardFormCreate;
