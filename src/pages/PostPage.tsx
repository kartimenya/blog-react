import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import { IPost } from '../models';

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
    <div>
      <h2>{post.title}</h2>
      <img
        src="https://media.istockphoto.com/photos/the-word-blog-arranged-from-wooden-blocks-placed-on-a-white-computer-picture-id1338011657?b=1&k=20&m=1338011657&s=170667a&w=0&h=QxvXC8F7nKbux4YekofifQ3cvucJuLVtXaGdxu6ZLHU="
        alt=""
      />
      <p>{post.text}</p>
    </div>
  );
};

export default PostPage;
