import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { MemberRequest } from '../../../apis/members/requests/member.request';
import styles from './MemberForm.module.css';
type Props = {
  currentPage: number;
  handleSearch: (currentPage: number, formSearchRequest: MemberRequest) => void;
  isDisable: boolean;
};

const MemberForm = (props: Props) => {
  const { currentPage, handleSearch, isDisable } = props;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isMemberNumber, setIsMemberNumber] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPhoneNumber, setIsPhoneNumber] = useState<boolean>(false);
  const [formSearchRequest, setFormSearchRequest] = useState<MemberRequest>({
    memberNumber: undefined,
    email: undefined,
    phoneNumber: undefined,
    name: undefined,
    nameKana: undefined,
    status: undefined,
  });

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setFormSearchRequest((prevData) => ({ ...prevData, [name]: value }));
    validateInput(name, value);
  };

  const validateInput = (name: string, value: string) => {
    const errorMessages: Record<string, string> = {};
    if (name === 'memberNumber') {
      if (!/^[0-9]+$/.test(value)) {
        errorMessages.memberNumber = 'Invalid format';
        setIsMemberNumber(true);
      } else if (value.length !== 8) {
        errorMessages.memberNumber = '8 characters long';
        setIsMemberNumber(true);
      } else {
        setIsMemberNumber(false);
      }
    }

    if (name === 'email') {
      if (value.length < 5) {
        errorMessages.email = '5 characters or more';
        setIsEmail(true);
      } else {
        setIsEmail(false);
      }
    }

    if (name === 'phoneNumber') {
      if (!/^[0-9]+$/.test(value)) {
        errorMessages.phoneNumber = 'Invalid format';
        setIsPhoneNumber(true);
      } else if (value.length < 10 || value.length > 11) {
        errorMessages.phoneNumber = 'Between 10 and 11 characters long';
        setIsPhoneNumber(true);
      } else {
        setIsPhoneNumber(false);
        errorMessages.phoneNumber = '';
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...errorMessages }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isMemberNumber && !isEmail && !isPhoneNumber) {
      handleSearch(currentPage, formSearchRequest);
      setFormSearchRequest({
        memberNumber: undefined,
        email: undefined,
        phoneNumber: undefined,
        name: undefined,
        nameKana: undefined,
        status: undefined,
      });
      setErrors({});
    }
  };

  return (
    <Form noValidate onSubmit={handleSubmit} className={styles['form-search-member']}>
      <Form.Group controlId="member-number">
        <Form.Control
          type="text"
          name="memberNumber"
          placeholder="Member Number"
          className={styles['form-control']}
          value={formSearchRequest.memberNumber || ''}
          onChange={(e) => handleChangeValue(e)}
          isInvalid={isMemberNumber}
        />
        <Form.Control.Feedback type="invalid">{isMemberNumber && errors.memberNumber}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Control
          type="text"
          name="email"
          placeholder="Email Address"
          className={styles['form-control']}
          value={formSearchRequest.email || ''}
          onChange={(e) => handleChangeValue(e)}
          isInvalid={isEmail}
        />
        <Form.Control.Feedback type="invalid">{isEmail && errors.email}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="phone-number">
        <Form.Control
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          className={styles['form-control']}
          value={formSearchRequest.phoneNumber || ''}
          onChange={(e) => handleChangeValue(e)}
          isInvalid={isPhoneNumber}
        />
        <Form.Control.Feedback type="invalid">{isPhoneNumber && errors.phoneNumber}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="name">
        <Form.Control
          type="text"
          name="name"
          placeholder="Name Kanji"
          className={`${styles['form-control']} ${styles['name']}`}
          value={formSearchRequest.name || ''}
          onChange={(e) => handleChangeValue(e)}
        />
      </Form.Group>
      <Form.Group controlId="name-kana">
        <Form.Control
          type="text"
          name="nameKana"
          placeholder="Name Kana"
          className={`${styles['form-control']} ${styles['name-kana']}`}
          value={formSearchRequest.nameKana || ''}
          onChange={(e) => handleChangeValue(e)}
        />
      </Form.Group>
      <Form.Group controlId="status">
        <Form.Control
          as="select"
          name="status"
          className={`${styles['form-control']} ${styles['status']}`}
          value={formSearchRequest.status || ''}
          onChange={(e) => handleChangeValue(e)}
        >
          <option value="">Status</option>
          <option value={1}>Join</option>
          <option value={2}>Withdrawn</option>
        </Form.Control>
      </Form.Group>
      <Button type="submit" className={styles['btn-search']} disabled={isDisable}>
        Search
      </Button>
    </Form>
  );
};

export default MemberForm;
