import classNames from 'classnames';
import React, { FC } from 'react';
import styles from './Button.module.scss';

type IButton = {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  color?: 'green' | 'blue';
  onClick?: () => void;
};

const Button: FC<IButton> = ({ children, onClick, color, ...props }) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={classNames(
        styles.btn,
        color === 'green' ? styles.green : '',
        color === 'blue' ? styles.blue : '',
      )}>
      {children}
    </button>
  );
};

export default Button;
