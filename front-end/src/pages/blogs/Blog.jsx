import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton } from '@mui/material';
import '../../components/blogs/BlogPreview.css';
import BlogLikeButton from '../../components/blogs/BlogLikeButton';
import { userProfile } from '../../helpers/helper';
import { addComment } from '../../Redux/blogInteractionsSlice';
import { Send, MessageCircle } from 'lucide-react';

function Blog() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState("");
    const token = useSelector(state => state.auth.access_token);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

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
    }, [id, token]);

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const response = await fetch(`/api/blogs/${id}/comment`, {
                method: "POST",
                body: JSON.stringify({ content: newComment }),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();

            // Update Redux store
            dispatch(addComment({
                blogId: id,
                comment: data.comment
            }));

            // Update local state
            setBlog(prevBlog => ({
                ...prevBlog,
                comments: [...(prevBlog.comments || []), data.comment]
            }));

            // Clear input
            setNewComment("");
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

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
        <div className="max-w-4xl mx-auto px-4 py-8 blog-content">
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

            {/* Interactive Buttons */}
            <div className="mt-12 pt-6 border-t border-gray-200 flex items-center">
                <BlogLikeButton blogId={blog.id} />
                <div className="flex items-center ml-4">
                    <MessageCircle className="h-5 w-5 mr-2 text-gray-500" />
                    <span className="text-gray-500">{blog.comments ? blog.comments.length : 0} Commentaires</span>
                </div>
            </div>

            {/* Comment Form */}
            <div className="mt-8 max-w-[600px] mx-auto">
                <form onSubmit={handleSubmitComment} className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 flex-shrink-0">
                        <img
                            src={userProfile(user.image_profile_url)}
                            alt={user.name}
                            className="h-full w-full rounded-full object-cover"
                        />
                    </div>
                    <div className="flex-1 flex items-center bg-gray-100 rounded-full pr-2">
                        <input
                            className="flex-1 border-0 bg-transparent focus:outline-none px-4 py-2 text-gray-900 placeholder-gray-500"
                            placeholder="Écrire un commentaire..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-200 flex items-center justify-center"
                            disabled={!newComment.trim()}
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </div>
                </form>
            </div>

            {/* Comments Section */}
            {blog.comments && blog.comments.length > 0 && (
                <div className="mt-4 max-w-[600px] mx-auto">
                    <h3 className="text-xl font-semibold mb-6">Commentaires ({blog.comments.length})</h3>
                    <div className="space-y-6">
                        {blog.comments.map((comment, index) => (
                            <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                                <div className="flex items-start flex-col">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={userProfile(comment.user.image_profile_url)}
                                            alt={comment.user.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <p className="font-medium text-gray-900 ">{comment.user?.name || 'Utilisateur'}</p>
                                    </div>
                                    <div className="">
                                        <div className="text-gray-700 text-lg font-bold py-2">
                                            {comment.content}
                                        </div>
                                        <div className="flex items-center w-full mt-1">
                                            <span className="text-xs text-gray-500">
                                                {new Date(comment.created_at).toLocaleDateString('fr-FR', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Blog;