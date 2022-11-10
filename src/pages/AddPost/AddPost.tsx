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
  const [imageUrl, setImageUrl] = useState('');
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const { id } = useParams();
  const isEditing = Boolean(id);
  const inputFileRef = useRef<HTMLInputElement>(null);

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
        console.log(data);
        setImageUrl(data.url);
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
        setText(data.text);
        setTitle(data.title);
        if (data.imageUrl) {
          setImageUrl(data.imageUrl);
        }
      });
    }
  }, [id]);

  const onChange = useCallback((valuse: string) => {
    setText(valuse);
  }, []);

  const onSubmit = async () => {
    try {
      const { data } = await axios.post<IPost>('/post', { title, text, imageUrl });
      const id = data._id;

      navigate(`/post/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onSumitEditor = async () => {
    try {
      await axios.patch(`post/${id}`, { title, text, imageUrl });
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
      {imageUrl && (
        <>
          <div>
            <Button onClick={() => setImageUrl('')}>Удалить</Button>
          </div>

          <img src={`http://localhost:4444${imageUrl}`} alt="img" />
        </>
      )}
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      <input
        className={style.inputTitle}
        placeholder="Введите название статьи"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
      />
      <SimpleMDE className={style.editor} options={options} value={text} onChange={onChange} />
      {isEditing ? (
        <Button onClick={onSumitEditor}>Сохранить</Button>
      ) : (
        <Button onClick={onSubmit}>Опубликовать</Button>
      )}
    </div>
  );
};

export default AddPost;
