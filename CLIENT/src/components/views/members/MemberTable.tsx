import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SearchMemberResponse } from '../../../apis/members/response/member.response';
import styles from './MemberTable.module.css';
import { getApi } from '../../../apis/member';
import { useEffect, useState } from 'react';
import { MemberResponse } from '../../../apis/member/responses/member.response';

type Props = {
  members: SearchMemberResponse;
  currentPage: number;
};

const MemberTable = ({ members, currentPage }: Props) => {
  const { data, limit } = members;
  const [booleanArray, setBooleanArray] = useState<boolean[]>();

  const fetchMember = async () => {
    const memberPromises = data.map(async (member) => {
      return await getApi(member.id);
    });
    const members: MemberResponse[] = await Promise.all(memberPromises);
    const currentDate = new Date();
    const lastWeekDate = new Date(currentDate);
    lastWeekDate.setDate(lastWeekDate.getDate() - 7);
    const booleanArray = members.map((member) => {
      return member.status.toString() === 'WITHDRAWN' && lastWeekDate.getTime() < member.modifiedAt;
    });
    setBooleanArray(booleanArray);
  };

  useEffect(() => {
    fetchMember();
  }, []);

  return (
    <div className={styles['wrapper-table']}>
      <h3 className={styles['table-title']}>Member List</h3>
      <Table striped bordered hover className={styles['member-table']}>
        <thead>
          <tr>
            <th>No</th>
            <th>Member Number</th>
            <th>Name Kanji</th>
            <th>Name Kana</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Member Status</th>
            <th colSpan={2}></th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((member, index) => (
              <tr key={index}>
                <td>{(currentPage - 1) * Number(limit) + Number(index) + 1}</td>
                <td>{member.memberNumber}</td>
                <td>{member.name}</td>
                <td>{member.nameKana}</td>
                <td>{member.email}</td>
                <td>{member.phoneNumber}</td>
                <td>{member.status}</td>
                <td>
                  <Link to={`/members/${member.id}/edit`}>Details &gt;</Link>
                </td>
                <td>
                  {booleanArray?.[index] && <Link to={`/members/${member.id}/edit`}>Membership Return &gt;</Link>}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className={styles['no-member']}>
                No members
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default MemberTable;
