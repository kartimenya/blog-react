import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import { IPost } from '../../models';
import styles from './PostPage.module.scss';

const PostPage = () => {
  const [post, setPost] = useState({} as IPost);
  const { id } = useParams<'id'>();

  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const { data } = await axios.get<IPost>(`/post/${id}`);
        setPost(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPostById();
  }, [id]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.fullPost}>
          <img className={styles.img} src={`http://localhost:4444${post.imageUrl}`} alt="" />
          <h2 className={styles.title}>{post.title}</h2>
          <p>{post.text}</p>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
