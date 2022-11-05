import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { IRegist } from '../../models';
import { fetchRegistration } from '../../store/slises/auth';
import TextField from '../UI/TextField/TextField';
import styles from './Registration.module.scss';

const Registration = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      userName: 'Name',
      email: '1123456@mail.ru',
      password: 'wtvedsrtbrvetert',
    },
    mode: 'onChange',
  });

  const onSubmit = (values: IRegist) => {
    dispatch(fetchRegistration(values));
  };

  return (
    <div className={styles.wrapp}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Имя"
          placeholder="Введите имя"
          errorMessage={errors.userName?.message}
          error={Boolean(errors.userName?.message)}
          {...register('userName', { required: 'Укажите имя' })}
        />
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
          Зарегистрироваться
        </button>
        <p className={styles.bottom}>
          <span>Уже есть аккаунта? </span>
          <Link to="/login">Войти</Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;
