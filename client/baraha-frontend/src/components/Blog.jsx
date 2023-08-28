import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      fetchPosts(); // Refresh posts after deletion
    } catch (error) {
      console.error('Error deleting the post:', error);
    }
  };

  return (
    <div className="container">
      <h1>My Blog</h1>
      <Link to="/new">New Post</Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <small>{post.date}</small>
            <p>{post.content}</p>
            <small>By: {post.author}</small>
            <Link to={`/edit/${post.id}`}>Edit</Link>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
