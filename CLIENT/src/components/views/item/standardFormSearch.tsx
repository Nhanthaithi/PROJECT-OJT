import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { StandardSearchProps } from '../../../types/standard.type';

const StandardFormSearch = (props: StandardSearchProps) => {
  const [validated, setValidated] = useState(false);
  const { setCode, setName, setCurrentPage } = props;
  const [formData, setFormData] = useState({ code: '', name: '' });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    setCode(formData.code);
    setName(formData.name);
    setCurrentPage(1);
  };
  const handleChangeValue = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="5" controlId="validationCode">
          <Form.Control
            required
            type="text"
            placeholder="Code"
            minLength={4}
            maxLength={4}
            name="code"
            value={formData.code}
            onChange={handleChangeValue}
          />
          <Form.Control.Feedback type="invalid">Code must be 4 characters long.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="5" controlId="validationName">
          <Form.Control
            required
            type="text"
            placeholder="Name"
            name="name"
            maxLength={200}
            value={formData.name}
            onChange={handleChangeValue}
          />
          <Form.Control.Feedback type="invalid">Invalid format</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="ButtonSearch">
          <Button type="submit" variant="outline-primary">
            Sesrch
          </Button>
        </Form.Group>
      </Row>
    </Form>
  );
};

export default StandardFormSearch;
