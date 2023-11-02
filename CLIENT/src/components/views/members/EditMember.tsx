import { Button, Container, Form } from 'react-bootstrap';
import styles from './EditMember.module.css';
import React, { useEffect, useState } from 'react';
import { getApi, updateApi } from '../../../apis/member';
import { MemberStatus } from '../../../types/member-status.enum';
import { useNavigate } from 'react-router-dom';
import { MemberResponse } from '../../../apis/member/responses/member.response';

interface FormData {
  status?: MemberStatus | string;

  isBlacklisted?: boolean | string;

  memo?: string;
}

interface EditMemberProps {
  id: number;
}

function EditMember(props: EditMemberProps) {
  const { id } = props;

  const [dataForm, setDataForm] = useState<FormData>({});
  const [editMember, setEditMember] = useState<boolean>(false);
  const [member, setMember] = useState<MemberResponse>();
  const [isMemoTooLong, setIsMemoTooLong] = useState(false);

  const navigate = useNavigate();

  const getMember = (id: number) => {
    getApi(id)
      .then((response) => {
        setMember(response);
      })
      .catch((error) => {
        console.error('Error get member:', error);
        navigate('/resourceNotFound');
      });
  };

  useEffect(() => {
    getMember(id);
  }, [id]);

  const statusMember = member?.status.toString() === 'JOIN' ? MemberStatus.JOIN : MemberStatus.WITHDRAWN;

  const handleEdit = (): void => {
    setEditMember(true);
    setDataForm({
      status: statusMember,
      isBlacklisted: member?.isBlacklisted,
      memo: member?.memo,
    });
  };

  const handleCancel = (): void => {
    setEditMember(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setDataForm((prevDataForm) => ({
      ...prevDataForm,
      [name]: value,
    }));

    if (name === 'memo' && value.length > 10000) {
      setIsMemoTooLong(true);
    } else {
      setIsMemoTooLong(false);
    }
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updateData = {
      ...dataForm,
      isBlacklisted: dataForm?.isBlacklisted === 'true' || dataForm?.isBlacklisted === true,
      status: dataForm?.status?.toString() === '1' ? MemberStatus.JOIN : MemberStatus.WITHDRAWN,
    };
    try {
      await updateApi(id, updateData);
      alert('Updated memember success.');
      navigate('/members/success');
    } catch (error) {
      console.error('Error get member:', error);
      navigate('/resourceNotFound');
    }
  };

  const handleToMember = () => {
    navigate('/members');
  };

  return (
    <Container className={styles.container}>
      <div>
        <h4 className={styles.task}>Edit member</h4>
      </div>
      <Form onSubmit={handleSubmit} className={styles.wrap}>
        {member && (
          <div>
            <Form.Group className={styles.info}>
              <Form.Label>Member Number</Form.Label>
              <Form.Text>{member?.memberNumber}</Form.Text>
            </Form.Group>
            <Form.Group className={styles.info}>
              <Form.Label>Full Name</Form.Label>
              <Form.Text>{member?.name}</Form.Text>
            </Form.Group>
            <Form.Group className={styles.info}>
              <Form.Label>Full Name Kana</Form.Label>
              <Form.Text>{member?.nameKana}</Form.Text>
            </Form.Group>
            <Form.Group className={styles.info}>
              <Form.Label>Email</Form.Label>
              <Form.Text>{member?.email}</Form.Text>
            </Form.Group>
            <Form.Group className={styles.info}>
              <Form.Label>Postal Code</Form.Label>
              <Form.Text>{member?.postalCode.slice(0, 3) + '-' + member?.postalCode.slice(3)}</Form.Text>
            </Form.Group>
            <Form.Group className={styles.info}>
              <Form.Label>Prefecture Code</Form.Label>
              <Form.Text>{member?.prefectureCode}</Form.Text>
            </Form.Group>
            <Form.Group className={styles.info}>
              <Form.Label>City</Form.Label>
              <Form.Text>{member?.city}</Form.Text>
            </Form.Group>
            <Form.Group className={styles.info}>
              <Form.Label>Address</Form.Label>
              <Form.Text>{member?.address}</Form.Text>
            </Form.Group>
            <Form.Group className={styles.info}>
              <Form.Label>Phone</Form.Label>
              <Form.Text>{member?.phoneNumber}</Form.Text>
            </Form.Group>
            <Form.Group className={styles.radio}>
              <Form.Label className={styles.status}>Status</Form.Label>
              <div className={styles['radio-detail']}>
                <Form.Check
                  type="radio"
                  label="Join"
                  name="status"
                  id={styles.join}
                  defaultChecked={statusMember === MemberStatus.JOIN}
                  disabled={!editMember}
                  value={MemberStatus.JOIN}
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  label="Withdrawn"
                  name="status"
                  id={styles.withdrawn}
                  defaultChecked={statusMember === MemberStatus.WITHDRAWN}
                  disabled={!editMember}
                  value={MemberStatus.WITHDRAWN}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
            <Form.Group className={styles.memo}>
              <Form.Label>Customer Memo Board</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="customer memo board"
                rows={3}
                name="memo"
                disabled={!editMember}
                maxLength={10000}
                defaultValue={member?.memo}
                onChange={handleChange}
                value={dataForm?.memo}
                isInvalid={isMemoTooLong}
              />
              <Form.Control.Feedback className={styles.invalid} type="invalid">
                Memo exceeds 10000 characters.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className={styles.blacklisted}>
              <Form.Label className={styles.black}>Blacklisted Customer</Form.Label>
              <div className={styles['radio-detail']}>
                <Form.Check
                  type="radio"
                  label="False"
                  name="isBlacklisted"
                  id={styles.false}
                  disabled={!editMember}
                  defaultChecked={member?.isBlacklisted === false}
                  value="false"
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  label="True"
                  name="isBlacklisted"
                  id={styles.true}
                  disabled={!editMember}
                  defaultChecked={member?.isBlacklisted === true}
                  value="true"
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
          </div>
        )}
        <div>
          {editMember && (
            <div className={styles.btn1}>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </div>
          )}
          {!editMember && (
            <div className={styles['btn-edit']}>
              <Button variant="danger" onClick={handleEdit}>
                Edit
              </Button>
            </div>
          )}
          <div className={styles['btn-list']}>
            <Button variant="success" onClick={handleToMember}>
              Member List
            </Button>
          </div>
        </div>
      </Form>
    </Container>
  );
}

export default EditMember;
