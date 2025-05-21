import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Skeleton } from '@mui/material';

function Blog() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useSelector(state => state.auth.access_token)

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`/api/blogs/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                },);
                setBlog(response.data);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id ,token]);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Cover Image Skeleton */}
                <Skeleton variant="rectangular" width="100%" height={400} className="rounded-lg mb-8" />
                
                {/* Title Skeleton */}
                <Skeleton variant="text" height={60} width="80%" className="mb-6" />
                
                {/* Author Info Skeleton */}
                <div className="flex items-center mb-8">
                    <Skeleton variant="circular" width={48} height={48} className="mr-4" />
                    <div>
                        <Skeleton variant="text" width={120} height={24} />
                        <Skeleton variant="text" width={160} height={20} />
                    </div>
                </div>
                
                {/* Content Skeleton */}
                <div className="space-y-4">
                    <Skeleton variant="text" height={24} />
                    <Skeleton variant="text" height={24} />
                    <Skeleton variant="text" height={24} />
                    <Skeleton variant="rectangular" height={100} className="my-4" />
                    <Skeleton variant="text" height={24} />
                    <Skeleton variant="text" height={24} />
                    <Skeleton variant="text" height={24} width="80%" />
                </div>
                
                {/* Stats Skeleton */}
                <div className="mt-12 pt-6 border-t border-gray-200 flex space-x-6">
                    <Skeleton variant="text" width={80} height={24} />
                    <Skeleton variant="text" width={100} height={24} />
                </div>
            </div>
        );
    }
    
    if (!blog && !loading) return <div>Article introuvable</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Cover Image */}
            {blog.cover_image && (
                <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src={`http://localhost:8000/storage/${blog.cover_image}`}
                        alt={blog.title}
                        className="w-full h-auto max-h-96 object-cover"
                    />
                </div>
            )}

            {/* Blog Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{blog.title}</h1>

            {/* Creator Info */}
            <div className="flex items-center mb-8">
                {blog.creator?.image_profile_url && (
                    <img
                        src={blog.creator.image_profile_url}
                        alt={blog.creator.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                )}
                <div>
                    <p className="font-medium">{blog.creator?.name || 'Auteur inconnu'}</p>
                    <p className="text-gray-500 text-sm">
                        {new Date(blog.created_at).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>
            </div>

            {/* Blog Content */}
            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            {/* Stats */}
            <div className="mt-12 pt-6 border-t border-gray-200 flex space-x-6 text-gray-500">
                <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{blog.likes?.length || 0} J'aime</span>
                </div>
                <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8z" />
                    </svg>
                    <span>{blog.comments?.length || 0} Commentaires</span>
                </div>
            </div>
        </div>
    );
}

export default Blog;