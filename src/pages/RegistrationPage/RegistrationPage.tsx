import React from 'react';
import Registration from '../../components/Registration/Registration';
import styles from './RegistrationPage.module.scss';

const RegistrationPage = () => {
  return (
    <div className={styles.wrapp}>
      <Registration />
    </div>
  );
};

export default RegistrationPage;
