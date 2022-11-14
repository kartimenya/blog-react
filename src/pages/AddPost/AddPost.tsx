import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import Button from '../../components/UI/Button/Button';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useNavigate, useParams } from 'react-router-dom';
import 'easymde/dist/easymde.min.css';
import style from './AddPost.module.scss';
import axios from '../../axios';
import { IPost } from '../../models';

const AddPost = () => {
  const isAuth = useAppSelector((state) => Boolean(state.authReducer.data));
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState({
    imageUrl: '',
    title: '',
    text: '',
  });
  const { id } = useParams();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const isEditing = Boolean(id);

  useEffect(() => {
    if (!window.localStorage.getItem('token') && !isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      if (e.target.files) {
        const file = e.target.files[0];
        formData.append('image', file);
        const { data } = await axios.post('/upload', formData);
        setPostContent({ ...postContent, imageUrl: data.url });
      }
    } catch (error) {
      console.log(error);
      alert('Ошибка при загрузке изображения');
    }
  };

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

  useEffect(() => {
    if (id) {
      axios.get<IPost>(`/post/${id}`).then(({ data }) => {
        setPostContent((prevPostContent) => ({
          ...prevPostContent,
          text: data.text,
          title: data.title,
          imageUrl: data.imageUrl,
        }));
      });
    }
  }, [id]);

  const onChange = useCallback(
    (valuse: string) => {
      setPostContent({ ...postContent, text: valuse });
    },
    [postContent],
  );

  const onSubmit = async () => {
    try {
      const { data } = await axios.post<IPost>('/post', postContent);
      const id = data._id;

      navigate(`/post/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onSumitEditor = async () => {
    try {
      await axios.patch(`post/${id}`, postContent);
      navigate(`/post/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={style.btnImg}>
        <Button onClick={() => inputFileRef.current?.click()} color="blue">
          Загрузить изображение
        </Button>
      </div>
      {postContent.imageUrl && (
        <>
          <div>
            <Button onClick={() => setPostContent({ ...postContent, imageUrl: '' })}>
              Удалить
            </Button>
          </div>

          <img
            className={style.img}
            src={`http://localhost:4444${postContent.imageUrl}`}
            alt="img"
          />
        </>
      )}
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      <input
        className={style.inputTitle}
        placeholder="Введите название статьи"
        onChange={(e) => setPostContent({ ...postContent, title: e.target.value })}
        value={postContent.title}
        type="text"
      />
      <SimpleMDE
        className={style.editor}
        options={options}
        value={postContent.text}
        onChange={onChange}
      />
      {isEditing ? (
        <Button onClick={onSumitEditor}>Сохранить</Button>
      ) : (
        <Button onClick={onSubmit}>Опубликовать</Button>
      )}
    </div>
  );
};

export default AddPost;
