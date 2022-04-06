import { useDispatch, useSelector } from 'react-redux';
import styles from './Login.module.css';
import {
  editUsername,
  editPassword,
  selectAuthen,
  selectIsLoginView,
  toggleMode,
  fetchAsyncLogin,
  fetchAsyncRegister,
} from './loginSlice';
import Button from '@material-ui/core/Button';
import { Action } from '@reduxjs/toolkit';
import { AppDispatch } from '../../app/store';

export const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const authen = useSelector(selectAuthen);
  const isLoginView = useSelector(selectIsLoginView);
  const btnDisabled = authen.username === '' || authen.password === '';

  const login = async () => {
    if (isLoginView) {
      await dispatch(fetchAsyncLogin(authen));
    } else {
      console.log('ユーザー作成');
      const result = await dispatch(fetchAsyncRegister(authen));
      if (fetchAsyncRegister.fulfilled.match(result)) {
        console.log('作成後ログイン');
        await dispatch(fetchAsyncLogin(authen));
      }
    }
  };

  return (
    <div className={styles.containerLogin}>
      <div className={styles.appLogin}>
        <h1>{isLoginView ? 'Login' : 'Register'}</h1>
        <span>Username</span>
        <input
          type="text"
          className={styles.inputLog}
          name="username"
          placeholder=""
          required
          onChange={(e) => dispatch(editUsername(e.target.value))}
        />
        <span>Password</span>
        <input
          type="password"
          className={styles.inputLog}
          name="username"
          placeholder=""
          required
          onChange={(e) => dispatch(editPassword(e.target.value))}
        />
        <div className={styles.switch}>
          <Button
            variant="contained"
            disabled={btnDisabled}
            color="primary"
            onClick={login}
          >
            {isLoginView ? 'Login' : 'Create'}
          </Button>
        </div>
        <span
          className={styles.switchText}
          onClick={() => dispatch(toggleMode())}
        >
          Create Account?
        </span>
      </div>
    </div>
  );
};
