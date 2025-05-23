import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton } from '@mui/material';
import '../../components/blogs/BlogPreview.css';
import BlogLikeButton from '../../components/blogs/BlogLikeButton';
import { userProfile } from '../../helpers/helper';
import { addComment } from '../../Redux/blogInteractionsSlice';
import { Send, MessageCircle, Clock } from 'lucide-react';
import { MdOutlineGroups } from "react-icons/md";

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
                console.log(err.response?.data?.message || err.message);
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

    // Calculate reading time
    const readingTime = calculateReadingTime(blog.content);
    
    // Determine creator type
    const creatorType = blog.creator_type ? blog.creator_type.split('\\').pop().toLowerCase() : 'user';

    // Render creator information based on type
    const renderCreatorInfo = () => {
        if (creatorType === 'user') {
            return (
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                        {blog.creator?.image_profile_url && (
                            <img
                                src={userProfile(blog.creator.image_profile_url)}
                                alt={blog.creator.name}
                                className="w-10 h-10 rounded-full mr-3 object-cover"
                            />
                        )}
                        <div>
                            <p className="font-medium text-gray-900">{blog.creator?.name || 'Auteur inconnu'}</p>
                            <p className="text-sm text-gray-500">
                                {new Date(blog.created_at).toLocaleDateString('fr-FR', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">{readingTime} min read</span>
                    </div>
                </div>
            );
        } else if (creatorType === 'group' || creatorType === 'page') {
            // For group or page, display in the style of the second image
            const creatorName = blog.creator?.name || '';
            const creatorImage = blog.creator?.image_profile_url || blog.creator?.profile_image_url || '';
            const createdBy = blog.created_by_user || {};

            return (
                <div className="mb-8 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center">
                            <img
                                src={userProfile(createdBy.image_profile_url)}
                                alt={`${createdBy.name} Avatar`}
                                className="w-10 h-10 rounded-full mr-3 object-cover"
                            />
                            <div>
                                <p className="text-sm text-gray-600">
                                    Publié par: <span className="font-medium">{createdBy.name || 'Anonymous'}</span>
                                </p>
                                <p className="text-xs text-gray-500">
                                    {new Date(blog.created_at).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            {creatorImage && (
                                <img
                                    src={userProfile(creatorImage)}
                                    alt={`${creatorName}`}
                                    className="w-8 h-8 rounded-full mr-2 object-cover"
                                />
                            )}
                            <div className="flex items-center">
                                <span className="text-sm font-medium">
                                    {creatorType === 'group' ? <MdOutlineGroups className="inline mr-1" /> : '📄 '}
                                    {creatorName}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        
        return null;
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 blog-content">
            {/* Blog Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{blog.title}</h1>
            
            {/* Creator Info */}
            {renderCreatorInfo()}
            
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


// Function to calculate reading time
const calculateReadingTime = (content) => {
    // Strip HTML tags
    const text = content.replace(/<[^>]*>/g, '');
    // Average reading speed: 200 words per minute
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return minutes;
};