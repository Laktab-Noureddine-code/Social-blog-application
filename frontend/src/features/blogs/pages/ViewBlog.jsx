import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BlogPreview from '../components/BlogPreview';
import api from "@/lib/api";

function ViewBlog() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/blogs/${blogId}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  if (!blog) {
    return <div className="text-center">Blog not found</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <span>By {blog.author?.name || 'Unknown'}</span>
          <span className="mx-2">•</span>
          <span>{new Date(blog.created_at).toLocaleDateString()}</span>
        </div>
        {blog.featured_image && (
          <img 
            src={blog.featured_image} 
            alt={blog.title} 
            className="w-full max-h-96 object-cover rounded-lg mb-6"
          />
        )}
      </div>
      
      <BlogPreview content={blog.content} />
    </div>
  );
}

export default ViewBlog;