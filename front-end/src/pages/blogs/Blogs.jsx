/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import BlogCard from '../../components/blogs/Blog-card';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector(state => state.auth.access_token)


  useEffect(() => {
    const fetchBlogs = async () => {
      if (!token) return;
      try {
        const response = await axios.get('/api/blogs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [token]);

  if (loading) return <div>Loading blogs...</div>;
  if (error) return <div>Error loading blogs: {error}</div>;

  return (
    <div className="space-y-6">
      {blogs.map((blog, index) => (
        <BlogCard
          key={index}
          blog={blog}
        />
      ))}
    </div>
  )
}

export default Blogs