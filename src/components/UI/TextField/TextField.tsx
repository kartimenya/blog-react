import React, { forwardRef } from 'react';
import styles from './TextField.module.scss';
import classNames from 'classnames';

interface ITextField {
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  error?: boolean;
  modele?: 'bold';
}

const TextField = forwardRef<HTMLInputElement, ITextField>(
  ({ label, errorMessage, error = false, modele, ...props }, ref) => {
    return (
      <label className={classNames(styles.label)}>
        {label && <span className={styles.caption}>{label}</span>}
        <input
          data-testid="input"
          ref={ref}
          {...props}
          className={classNames(
            styles.textField,
            modele === 'bold' && styles.bold,
            error === true && styles.error,
          )}
        />
        {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
      </label>
    );
  },
);

export default TextField;
