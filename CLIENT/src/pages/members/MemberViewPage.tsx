import { Container } from 'react-bootstrap';
import MemberForm from '../../components/views/members/MemberForm';
import MemberTable from '../../components/views/members/MemberTable';
import styles from './MemberViewPage.module.css';
import { useEffect, useState } from 'react';
import { MemberRequest } from '../../apis/members/requests/member.request';
import { MemberAPI } from '../../apis/members';
import PaginationComponent from '../../components/table/Pagination';
import { SearchMemberResponse } from '../../apis/members/response/member.response';

function MemberViewPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [memberRequest, setMemberRequest] = useState<MemberRequest>({});
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [members, setMembers] = useState<SearchMemberResponse>();
  const nameItem = 'members';

  const handleSearch = async (page: number, formSearchRequest: MemberRequest) => {
    setMemberRequest(formSearchRequest);
    const param: MemberRequest = {
      page,
      limit: 20,
      sort: 'ASC',
      ...formSearchRequest,
    };
    setIsDisable(true);
    try {
      const data = await MemberAPI.search(param);
      setMembers(data);
    } catch (error) {
      alert(error);
    } finally {
      setIsDisable(false);
    }
  };

  useEffect(() => {
    handleSearch(currentPage, memberRequest);
  }, [currentPage]);

  return (
    <div className={`${styles['page']} col-10`}>
      <Container>
        <div className={styles['form-pagination']}>
          <MemberForm currentPage={currentPage} handleSearch={handleSearch} isDisable={isDisable} />
          {members && (
            <PaginationComponent
              totalPage={members.totalPage}
              count={members.count}
              limit={members.limit}
              currentPage={currentPage}
              nameItem={nameItem}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
        {members && <MemberTable members={members} currentPage={currentPage} />}
      </Container>
    </div>
  );
}

export default MemberViewPage;
