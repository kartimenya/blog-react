import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { IAuthResponse, ILogin } from '../../models';
import { cleanFailedMasage, fetchUserData } from '../../store/slises/auth';
import TextField from '../UI/TextField/TextField';
import styles from './Login.module.scss';

const Login = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => Boolean(state.authReducer.data));
  const navigate = useNavigate();
  const { failedMasage } = useAppSelector((state) => state.authReducer);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '1123456@mail.ru',
      password: 'wtvedsrtbrvetert',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (failedMasage) {
      alert(failedMasage);
    }
    return () => {
      dispatch(cleanFailedMasage());
    };
  }, [failedMasage, dispatch]);

  const onSubmit = async (values: ILogin) => {
    const data = await dispatch(fetchUserData(values));
    const payload = data.payload as IAuthResponse;

    if (!Boolean(payload)) {
      return console.log('Ошибка в запросе');
    }

    if ('token' in payload) {
      window.localStorage.setItem('token', payload.token);
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Email"
        placeholder="Введите email"
        errorMessage={errors.email?.message}
        error={Boolean(errors.email?.message)}
        {...register('email', { required: 'Укажите email' })}
      />
      <TextField
        label="Пароль"
        placeholder="Введите пароль"
        errorMessage={errors.password?.message}
        error={Boolean(errors.password?.message)}
        {...register('password', { required: 'Укажите пароль' })}
      />
      <button className={styles.btnSubmit} type="submit">
        Войти
      </button>
      <p className={styles.bottom}>
        Нет аккаунта?
        <Link to="/registration">Зарегистрироваться</Link>
      </p>
    </form>
  );
};

export default Login;
