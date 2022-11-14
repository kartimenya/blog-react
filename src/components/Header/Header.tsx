import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { logOut } from '../../store/slises/auth';
import Button from '../UI/Button/Button';
import styles from './Header.module.scss';

const Header: FC = () => {
  const isAuth = useAppSelector((state) => Boolean(state.authReducer.data));
  const dispatch = useAppDispatch();

  const logOutClick = () => {
    dispatch(logOut());
    window.localStorage.removeItem('token');
  };

  return (
    <header className={styles.header}>
      <Link className={styles.link} to="/">
        MyBlog
      </Link>
      {isAuth ? (
        <div className={styles.box}>
          <Link to="/addPost">
            <Button>Создать пост</Button>
          </Link>
          <Link onClick={logOutClick} to="#">
            Выйти
          </Link>
        </div>
      ) : (
        <Link to="/login">Войти</Link>
      )}
    </header>
  );
};

export default Header;
