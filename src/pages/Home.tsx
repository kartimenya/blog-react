import React, { useEffect } from 'react';
import Post from '../components/Post/Post';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchPostsData } from '../store/slises/posts';

const Home = () => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.postsReducer);

  useEffect(() => {
    dispatch(fetchPostsData());
  }, [dispatch]);

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post key={post._id} {...post} />
      ))}
    </div>
  );
};

export default Home;
