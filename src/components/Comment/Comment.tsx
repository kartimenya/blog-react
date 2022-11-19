import React, { FC } from 'react';
import { IUser } from '../../models';
import styles from './Comment.module.scss';

interface ICommentComponent {
  children?: React.ReactNode;
  user: IUser;
}

const Comment: FC<ICommentComponent> = ({ user, children }) => {
  return (
    <div className={styles.comment}>
      <p className={styles.user}>{user.userName}</p>
      <p className={styles.text}>{children}</p>
    </div>
  );
};

export default Comment;
