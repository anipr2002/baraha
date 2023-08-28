import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditBlog = ({ heading, submit }) => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    if (id) {
      fetchSinglePost(id);
    }
  }, [id]);

  const fetchSinglePost = async (postId) => {
    try {
      const response = await axios.get(`/api/posts/${postId}`);
      const post = response.data;
      setTitle(post.title);
      setContent(post.content);
      setAuthor(post.author);
    } catch (error) {
      console.error('Error fetching the post:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      content,
      author,
    };

    try {
      if (id) {
        await axios.patch(`/api/posts/${id}`, postData);
      } else {
        await axios.post('/api/posts', postData);
      }
      // Redirect or handle success
    } catch (error) {
      console.error('Error submitting the post:', error);
    }
  };

  return (
    <div className="container">
      <h1>{heading}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
          rows="10"
        />
        <input
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          required
        />
        <button className="full-width" type="submit">
          {submit}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
