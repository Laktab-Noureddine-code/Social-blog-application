import { useState, useEffect } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import BlogCard from '../../components/blogs/Blog-card';
import { setBlogs } from '../../Redux/blogInteractionsSlice';

function Blogs() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector(state => state.auth.access_token)
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    const fetchBlogs = async () => {
      if (!token) return;
      try {
        const response = await axios.get('/api/blogs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setBlogs(response.data))
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [token ,dispatch]);
  
  const blogs = useSelector(state => state.blogInteractions.blogs)

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