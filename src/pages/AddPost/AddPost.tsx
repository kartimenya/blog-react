import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import Button from '../../components/UI/Button/Button';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import 'easymde/dist/easymde.min.css';
import style from './AddPost.module.scss';
import axios from '../../axios';
import { IPost } from '../../models';

const AddPost = () => {
  const isAuth = useAppSelector((state) => Boolean(state.authReducer.data));
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (!window.localStorage.getItem('token') && !isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  const onChange = useCallback((valuse: string) => {
    setText(valuse);
  }, []);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: 'AddPost',
      },
    }),
    [],
  );

  const onSumit = async () => {
    try {
      const { data } = await axios.post<IPost>('/post', { title, text });
      console.log(data);
      const id = data._id;

      navigate(`/post/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        className={style.inputTitle}
        placeholder="Введите название статьи"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
      />
      <SimpleMDE className={style.editor} options={options} onChange={onChange} />
      <Button onClick={onSumit}>Опубликовать</Button>
    </div>
  );
};

export default AddPost;
