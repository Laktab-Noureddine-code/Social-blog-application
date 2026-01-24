import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import api from "@/lib/api";
import { Skeleton } from '@mui/material';
import { Send, MessageCircle, Clock, Trash2 } from 'lucide-react';
import { MdOutlineGroups } from "react-icons/md";
import { FaUser, FaRegNewspaper } from "react-icons/fa";
import BlogLikeButton from '../components/BlogLikeButton';
import SaveBlogButton from '../components/SaveBlogButton';
import { groupCover, userProfile } from "@/shared/helpers/helper";
import { addComment } from '@/Redux/blogInteractionsSlice';
import '../components/BlogPreview.css';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import java from 'highlight.js/lib/languages/java';
import python from 'highlight.js/lib/languages/python';
import php from 'highlight.js/lib/languages/php';

// Register languages for syntax highlighting
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('java', java);
hljs.registerLanguage('python', python);
hljs.registerLanguage('php', php);

function Blog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const currentUser = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const contentRef = useRef(null);

    // Apply syntax highlighting after blog content is rendered
    useEffect(() => {
        if (blog?.content && contentRef.current) {
            const codeBlocks = contentRef.current.querySelectorAll('pre code');
            codeBlocks.forEach((block) => {
                // Only highlight if not already highlighted
                if (!block.classList.contains('hljs')) {
                    hljs.highlightElement(block);
                }
            });
        }
    }, [blog?.content]);

    // Fetch blog data
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await api.get(`/api/blogs/${id}`);
                setBlog(response.data);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    // Check delete permissions
    const canDeleteBlog = () => {
        if (!currentUser || !blog) return false;

        // Blog owner can always delete
        if (blog.created_by === currentUser.id) return true;

        // For Page blogs - page owner or admins
        if (blog.creator_type.includes('Page')) {
            return (
                blog.creator?.user_id === currentUser.id ||
                blog.creator?.admins?.some(admin => admin.id === currentUser.id)
            );
        }

        // For Group blogs - group owner or admins
        if (blog.creator_type.includes('Group')) {
            return (
                blog.creator?.created_by === currentUser.id ||
                blog.group_admins?.some(admin => admin.id === currentUser.id)
            );
        }

        return false;
    };

    // Handle blog deletion
    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) return;
        setIsDeleting(true);
        try {
            await api.delete(`/api/blogs/${blog.id}`);
            navigate('/blogs');
        } catch (error) {
            console.error(error.response?.data?.message || 'Error deleting blog');
        } finally {
            setIsDeleting(false);
        }
    };

    // Handle comment submission
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const response = await api.post(`/api/blogs/${id}/comment`,
                { content: newComment }
            );

            dispatch(addComment({
                blogId: id,
                comment: response.data.comment
            }));

            setBlog(prev => ({
                ...prev,
                comments: [...(prev.comments || []), response.data.comment]
            }));

            setNewComment("");
        } catch (error) {
            console.log(error)
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <Skeleton variant="rectangular" width="100%" height={400} className="rounded-lg mb-8" />
                <Skeleton variant="text" height={60} width="80%" className="mb-6" />
                <div className="flex items-center mb-8">
                    <Skeleton variant="circular" width={48} height={48} className="mr-4" />
                    <div>
                        <Skeleton variant="text" width={120} height={24} />
                        <Skeleton variant="text" width={160} height={20} />
                    </div>
                </div>
                <div className="space-y-4">
                    <Skeleton variant="text" height={24} />
                    <Skeleton variant="text" height={24} />
                    <Skeleton variant="text" height={24} />
                    <Skeleton variant="rectangular" height={100} className="my-4" />
                    <Skeleton variant="text" height={24} />
                    <Skeleton variant="text" height={24} />
                    <Skeleton variant="text" height={24} width="80%" />
                </div>
            </div>
        );
    }

    // Error state
    if (error) return <div className="max-w-4xl mx-auto px-4 py-8 text-red-500">Error: {error}</div>;
    if (!blog) return <div className="max-w-4xl mx-auto px-4 py-8">Blog not found</div>;

    // Calculate reading time
    const creatorType = blog.creator_type?.split('\\').pop().toLowerCase() || 'user';

    // Render creator information
    const renderCreatorInfo = () => {
        const getCreatorIcon = () => {
            switch (creatorType) {
                case 'group': return <MdOutlineGroups className="text-blue-500" />;
                case 'page': return <FaRegNewspaper className="text-purple-500" />;
                default: return <FaUser className="text-gray-500" />;
            }
        };

        const creatorImage = () => {
            if (creatorType === 'user') {
                return userProfile(blog.creator?.image_profile_url);
            } else if (creatorType === 'group') {
                return groupCover(blog.creator?.cover_image);
            } else if (creatorType === 'page') {
                return blog.creator?.profile_image_url || userProfile(blog.created_by_user?.image_profile_url);
            }
        };

        return (
            <div className="flex items-start justify-between mb-8">
                <div className="flex items-start gap-4">
                    <div className="relative">
                        <img
                            src={creatorImage()}
                            alt={creatorType === 'user' ? blog.creator?.name : blog.creator?.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/default-avatar.png';
                            }}
                        />
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                            {getCreatorIcon()}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">
                                {creatorType === 'user' ? blog.creator?.name : blog.creator?.name}
                            </h3>
                            {creatorType !== 'user' && (
                                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                    {creatorType === 'group' ? 'Group' : 'Page'}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center text-sm text-gray-500 gap-2">
                            <span>
                                {new Date(blog.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </span>
                            {creatorType !== 'user' && (
                                <>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <FaUser className="text-xs" />
                                        {blog.created_by_user?.name}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {canDeleteBlog() && (
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                    >
                        <Trash2 className="h-4 w-4" />
                        <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
            {/* Blog Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
                {renderCreatorInfo()}
            </div>

            {/* Blog Cover Image */}
            {blog.cover_image && (
                <div className="mb-8 rounded-xl overflow-hidden shadow-md">
                    <img
                        src={`http://localhost:8000/storage/${blog.cover_image}`}
                        alt={blog.title}
                        className="w-full h-auto max-h-[32rem] object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/default-blog-cover.jpg';
                        }}
                    />
                </div>
            )}

            {/* Blog Content */}
            <div
                ref={contentRef}
                className="prose prose-lg max-w-none mb-12 blog-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Blog Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <BlogLikeButton 
                        blogId={blog.id} 
                        localBlog={blog} 
                        onLikeUpdate={(updatedLikes) => {
                            setBlog(prev => ({
                                ...prev,
                                likes: updatedLikes
                            }));
                        }} 
                    />
                    <SaveBlogButton 
                        blogId={blog.id} 
                        isInitiallySaved={blog.is_saved} 
                        onSaveToggle={(newSavedState) => {
                            setBlog(prev => ({
                                ...prev,
                                is_saved: newSavedState
                            }));
                        }}
                    />

                    <div className="flex items-center text-gray-600">
                        <MessageCircle className="h-5 w-5 mr-2" />
                        <span>
                            {blog.comments?.length || 0} Comment{blog.comments?.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                </div>
            </div>
            {/* Comments Section */}
            <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Comments</h3>

                {/* Comment Form */}
                <div className="mb-8">
                    <form onSubmit={handleCommentSubmit} className="flex gap-3">
                        <div className="flex-shrink-0">
                            <img
                                src={userProfile(currentUser.image_profile_url)}
                                alt={currentUser.name}
                                className="h-10 w-10 rounded-full object-cover border border-gray-200"
                            />
                        </div>
                        <div className="flex-1 relative">
                            <input
                                className="w-full border border-gray-300 rounded-full px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Write a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button
                                type="submit"
                                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full ${newComment.trim() ? 'text-blue-500 hover:text-blue-600' : 'text-gray-400'}`}
                                disabled={!newComment.trim()}
                            >
                                <Send className="h-5 w-5" />
                            </button>
                        </div>
                    </form>
                </div>

                {/* Comments List */}
                {blog.comments && blog.comments.length > 0 && (
                    <div className="space-y-4">
                        {blog.comments.map((comment, index) => (
                            <div key={index} className="flex gap-3">
                                <div className="flex-shrink-0">
                                    <img
                                        src={userProfile(comment.user.image_profile_url)}
                                        alt={comment.user.name}
                                        className="h-10 w-10 rounded-full object-cover border border-gray-200"
                                    />
                                </div>
                                <div className="flex-1 bg-gray-50 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium text-gray-900">{comment.user?.name}</span>
                                        <span className="text-xs text-gray-500">
                                            {new Date(comment.created_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <p className="text-gray-700">{comment.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Blog;