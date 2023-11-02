import { Table } from 'react-bootstrap';
import { StandarResponse } from '../../../apis/item/standard/responses/standard.response';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store';
import { Link } from 'react-router-dom';

const StandardTable = () => {
  const standardList: StandarResponse[] = useSelector((state: AppState) => state.standardReducer.data);
  const skip: number = useSelector((state: AppState) => state.standardReducer.skip);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>No</th>
          <th>Standard code</th>
          <th>Standard name</th>
          <th>EC label</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {standardList.length > 0 &&
          standardList?.map((standard, index) => {
            return (
              <tr key={standard.id}>
                <td>{skip + index + 1}</td>
                <td>{standard.code}</td>
                <td>{standard.name}</td>
                <td>{standard.label}</td>
                <td>
                  <Link to={`${standard.id}`}>Detail </Link>
                </td>
              </tr>
            );
          })}
        {standardList.length <= 0 && (
          <tr>
            <td colSpan={5}>No data</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default StandardTable;
