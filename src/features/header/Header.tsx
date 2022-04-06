import { useSelector } from 'react-redux';
import { LoginState } from '../../types/loginState';
import { selectProfile } from '../login/loginSlice';
import styles from './Header.module.css';

export const Header = () => {
  const profile: LoginState['profile'] = useSelector(selectProfile);

  return (
    <div className={styles.header}>
      <h3>{profile.username}</h3>
      <h1>Today's task</h1>
    </div>
  );
};
