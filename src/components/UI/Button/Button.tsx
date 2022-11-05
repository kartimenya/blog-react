import React, { FC } from 'react';
import styles from './Button.module.scss';

type IButton = {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
};

const Button: FC<IButton> = ({ children, onClick, ...props }) => {
  return (
    <button {...props} onClick={onClick} className={styles.btn}>
      {children}
    </button>
  );
};

export default Button;
