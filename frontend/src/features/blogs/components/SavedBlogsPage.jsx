import { useEffect, useState } from 'react';
import BlogCard from './Blog-card';
import api from '@/lib/api';

function SavedBlogsPage() {
    const [savedBlogs, setSavedBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSavedBlogs = async () => {
            try {
                const response = await api.get('/api/saved-blogs');
                setSavedBlogs(response.data.data);
            } catch (error) {
                console.error('Error fetching saved blogs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSavedBlogs();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Saved Blogs</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedBlogs.map(blog => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    );
}

export default SavedBlogsPage;