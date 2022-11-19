import React, { FormEvent, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import Comment from '../../components/Comment/Comment';
import Button from '../../components/UI/Button/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { IComment, IPost } from '../../models';
import { addPostComments, clearPostComments, fetchPostComments } from '../../store/slises/comments';
import styles from './PostPage.module.scss';

const PostPage = () => {
  const isAuth = useAppSelector((state) => Boolean(state.authReducer.data));
  const dispatch = useAppDispatch();
  const { postComments } = useAppSelector((state) => state.commentsReducer);
  const [post, setPost] = useState({} as IPost);
  const [inputValue, setInputValue] = useState('');
  const { id } = useParams<'id'>();

  useEffect(() => {
    const fetchPostById = async () => {
      if (id) {
        try {
          const { data } = await axios.get<IPost>(`/post/${id}`);
          setPost(data);
          dispatch(fetchPostComments(id));
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchPostById();
    return () => {
      dispatch(clearPostComments());
    };
  }, [id, dispatch]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id && inputValue) {
      dispatch(addPostComments({ text: inputValue, id }));
      setInputValue('');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.fullPost}>
          {post.imageUrl && (
            <img className={styles.img} src={`http://localhost:4444${post.imageUrl}`} alt="" />
          )}
          <p className={styles.autor}>
            <span>Автор: </span>
            {post.user?.userName}
          </p>
          <h2 className={styles.title}>{post.title}</h2>
          <ReactMarkdown children={post.text} />
        </div>
      </div>
      <div className={styles.coments}>
        <h3>Коментарии:</h3>
        {isAuth && (
          <form className={styles.formComment} onSubmit={handleSubmit}>
            <input
              className={styles.inputComment}
              type="text"
              name=""
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button type="submit">Отправить</Button>
          </form>
        )}

        {postComments.map((item: IComment) => (
          <div key={item._id} className={styles.comment}>
            <Comment user={item.user}>{item.text}</Comment>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;
