import EditMember from '../../components/views/members/EditMember';
import { useParams } from 'react-router-dom';

function MemberEditPage() {
  const paramsId = useParams<{ id: string }>();
  const id = Number(paramsId.id);

  return (
    <>
      <div className="col-10 pe-0">
        <EditMember id={id} />
      </div>
    </>
  );
}

export default MemberEditPage;
