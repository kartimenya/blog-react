import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { IPost } from '../../models';
import { fetchRemovePosts } from '../../store/slises/posts';
import Button from '../UI/Button/Button';
import styles from './Post.module.scss';

const Post: FC<IPost> = ({ text, title, _id, user, viewCount }) => {
  const userData = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  const removePost = (id: string) => {
    dispatch(fetchRemovePosts(id));
  };

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
        <p className={styles.post__user}>{user.userName}</p>
        <h2 className={styles.post__title}>{title}</h2>
        <p className={styles.post__desc}>{text}</p>
        <p className={styles.viewBlock}>
          <svg className={styles.viewSvg} x="0px" y="0px" viewBox="0 0 59.2 59.2">
            <path
              d="M51.062,21.561c-11.889-11.889-31.232-11.889-43.121,0L0,29.501l8.138,8.138c5.944,5.944,13.752,8.917,21.561,8.917
		s15.616-2.972,21.561-8.917l7.941-7.941L51.062,21.561z M49.845,36.225c-11.109,11.108-29.184,11.108-40.293,0l-6.724-6.724
		l6.527-6.527c11.109-11.108,29.184-11.108,40.293,0l6.724,6.724L49.845,36.225z"
            />
            <path
              d="M28.572,21.57c-3.86,0-7,3.14-7,7c0,0.552,0.448,1,1,1s1-0.448,1-1c0-2.757,2.243-5,5-5c0.552,0,1-0.448,1-1
		S29.125,21.57,28.572,21.57z"
            />
            <path
              d="M29.572,16.57c-7.168,0-13,5.832-13,13s5.832,13,13,13s13-5.832,13-13S36.741,16.57,29.572,16.57z M29.572,40.57
		c-6.065,0-11-4.935-11-11s4.935-11,11-11s11,4.935,11,11S35.638,40.57,29.572,40.57z"
            />
          </svg>

          {viewCount}
        </p>
        <div className={styles.btns}>
          <Link className={styles.post__more} to={`post/${_id}`}>
            <Button>Читать</Button>
          </Link>
          {user._id === userData?.data?.user?._id ? (
            <>
              <Button onClick={() => removePost(_id)} color="green">
                Удалить
              </Button>
              <Link to={`/post/${_id}/edit`}>
                <Button color="blue">Редактировать</Button>
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Post;
