import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BlogCard from '../components/Blog-card';
import { setBlogs } from '@/Redux/blogInteractionsSlice';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import api from "@/lib/api";

function Blogs() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/api/blogs');
        dispatch(setBlogs(response.data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [dispatch]);
  
  const blogs = useSelector(state => state.blogInteractions.blogs);

  // Skeleton loader for 3 blog cards
  const renderSkeletons = () => {
    return [...Array(3)].map((_, index) => (
      <Box key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
        <Skeleton variant="rectangular" width="100%" height={160} />
        <Box className="p-4">
          <Skeleton variant="text" width="30%" height={24} className="mb-2" />
          <Skeleton variant="text" width="100%" height={28} className="mb-2" />
          <Skeleton variant="text" width="100%" height={20} className="mb-1" />
          <Skeleton variant="text" width="100%" height={20} className="mb-3" />
          <Box className="flex justify-between items-center">
            <Skeleton variant="circular" width={32} height={32} />
            <Box className="flex gap-2">
              <Skeleton variant="rounded" width={80} height={32} />
              <Skeleton variant="rounded" width={80} height={32} />
            </Box>
          </Box>
        </Box>
      </Box>
    ));
  };

  return (
    <div className="container mx-auto p-4">
      {/* Bouton Créer un Blog */}
      <div className="mb-6 flex justify-end">
        <Link
          to={`/blogs/create/user/${user?.id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Créer un nouveau blog
        </Link>
      </div>

      {/* Grille des blogs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? renderSkeletons() : (
          <>
            {error && (
              <div className="col-span-full text-red-500">
                Erreur lors du chargement des blogs: {error}
              </div>
            )}
            {blogs.map((blog, index) => (
              <BlogCard key={index} blog={blog} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Blogs;