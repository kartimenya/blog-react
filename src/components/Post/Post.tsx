import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import { IPost } from '../../models';
import Button from '../UI/Button/Button';
import styles from './Post.module.scss';

const Post: FC<IPost> = ({ text, title, _id, user }) => {
  const userData = useAppSelector((state) => state.authReducer);

  console.log(user._id, '-', userData);

  return (
    <div className={styles.post}>
      <div className={styles.post__img}>
        <img
          src="https://media.istockphoto.com/photos/the-word-blog-arranged-from-wooden-blocks-placed-on-a-white-computer-picture-id1338011657?b=1&k=20&m=1338011657&s=170667a&w=0&h=QxvXC8F7nKbux4YekofifQ3cvucJuLVtXaGdxu6ZLHU="
          alt=""
        />
      </div>
      <div className={styles.post__info}>
        <div className={styles.post__tags}>
          <ul>
            <li>
              <p>работа</p>
            </li>
            <li>
              <p>работа</p>
            </li>
          </ul>
        </div>
        <h2 className={styles.post__title}>{title}</h2>
        <p className={styles.post__desc}>{text}</p>
        <Link className={styles.post__more} to={`post/${_id}`}>
          <Button>Читать</Button>
        </Link>
        {user._id === userData?.data?.user?._id ? <button>Удалить</button> : null}
      </div>
    </div>
  );
};

export default Post;
