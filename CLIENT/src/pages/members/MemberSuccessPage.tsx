import { Link } from 'react-router-dom';
import styles from './MemberSuccessPage.module.css';

const MemberSuccessPage = () => {
  return (
    <div className={`${styles['member-success']} col-10`}>
      <div className={styles['form-success']}>
        <p className={styles['title']}>Member editing has been completed</p>
        <Link to="/members">
          <button className={styles['btn']}>TOP</button>
        </Link>
      </div>
    </div>
  );
};

export default MemberSuccessPage;
