/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import BlogCard from "../../components/Accueil Page/Blog/Blog-card";
import axios from 'axios';
import { useSelector } from 'react-redux';

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
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          id={blog.id}
          title={blog.title}
          content={blog.content}
          coverImage={blog.cover_image ? `http://localhost:8000/storage/${blog.cover_image}` : null}
          author={blog.creator}
          date={new Date(blog.created_at).toLocaleDateString()}
          likesCount={blog.likes?.length || 0}
          commentsCount={blog.comments?.length || 0}
        />
      ))}
    </div>
  )
}

export default Blogs