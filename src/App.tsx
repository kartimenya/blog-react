import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { useAppDispatch } from './hooks/reduxHooks';
import AddPost from './pages/AddPost/AddPost';
import Home from './pages/Home/Home';
import LoginPage from './pages/LoginPage/LoginPage';
import PostPage from './pages/PostPage/PostPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import { fetchAuthMe } from './store/slises/auth';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      dispatch(fetchAuthMe());
    }
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/post/:id/edit" element={<AddPost />} />
        <Route path="/addPost" element={<AddPost />} />
      </Routes>
    </Layout>
  );
};

export default App;
