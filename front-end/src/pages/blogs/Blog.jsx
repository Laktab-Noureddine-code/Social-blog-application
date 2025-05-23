import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton } from '@mui/material';
import { Send, MessageCircle, Clock, Trash2 } from 'lucide-react';
import { MdOutlineGroups } from "react-icons/md";
import BlogLikeButton from '../../components/blogs/BlogLikeButton';
import { userProfile } from '../../helpers/helper';
import { addComment } from '../../Redux/blogInteractionsSlice';
import '../../components/blogs/BlogPreview.css';

function Blog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const token = useSelector(state => state.auth.access_token);
    const currentUser = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    // Fetch blog data
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`/api/blogs/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setBlog(response.data);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id, token]);

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
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce blog ? Cette action est irréversible.')) return;

        setIsDeleting(true);
        try {
            await axios.delete(`/api/blogs/${blog.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            // dispatch(deleteBlog(blog.id));
            console.log("blog deleted from Blog.jsx")
            navigate('/blogs');
        } catch (error) {
            console.error(error.response?.data?.message || 'Erreur lors de la suppression');
        } finally {
            setIsDeleting(false);
        }
    };

    // Handle comment submission
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const response = await axios.post(`/api/blogs/${id}/comment`,
                { content: newComment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
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
            <div className="max-w-4xl mx-auto px-4 py-8">
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
    if (error) return <div className="max-w-4xl mx-auto px-4 py-8 text-red-500">Erreur: {error}</div>;
    if (!blog) return <div className="max-w-4xl mx-auto px-4 py-8">Blog introuvable</div>;

    // Calculate reading time
    const readingTime = Math.ceil(blog.content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200);
    const creatorType = blog.creator_type?.split('\\').pop().toLowerCase() || 'user';

    // Render creator information
    const renderCreatorInfo = () => {
        const commonInfo = (
            <div className="flex items-center gap-4">
                <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{readingTime} min de lecture</span>
                </div>
                {canDeleteBlog() && (
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="text-red-600 hover:text-red-800 transition-colors flex items-center gap-1 text-sm"
                    >
                        <Trash2 className="h-4 w-4" />
                        {isDeleting ? 'Suppression...' : 'Supprimer'}
                    </button>
                )}
            </div>
        );

        if (creatorType === 'user') {
            return (
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                        <img
                            src={userProfile(blog.creator?.image_profile_url)}
                            alt={blog.creator?.name}
                            className="w-10 h-10 rounded-full mr-3 object-cover"
                        />
                        <div>
                            <p className="font-medium text-gray-900">{blog.creator?.name || 'Auteur inconnu'}</p>
                            <p className="text-sm text-gray-500">
                                {new Date(blog.created_at).toLocaleDateString('fr-FR')}
                            </p>
                        </div>
                    </div>
                    {commonInfo}
                </div>
            );
        }

        // For groups and pages
        return (
            <div className="mb-8 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img
                            src={userProfile(blog.created_by_user?.image_profile_url)}
                            alt={blog.created_by_user?.name}
                            className="w-10 h-10 rounded-full mr-3 object-cover"
                        />
                        <div>
                            <p className="text-sm text-gray-600">
                                Publié par: <span className="font-medium">{blog.created_by_user?.name || 'Anonyme'}</span>
                            </p>
                            <p className="text-xs text-gray-500">
                                {new Date(blog.created_at).toLocaleDateString('fr-FR')}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            <img
                                src={userProfile(blog.creator?.profile_image_url || blog.creator?.image_profile_url)}
                                alt={blog.creator?.name}
                                className="w-8 h-8 rounded-full mr-2 object-cover"
                            />
                            <span className="text-sm font-medium">
                                {creatorType === 'group' ? <MdOutlineGroups className="inline mr-1" /> : '📄 '}
                                {blog.creator?.name}
                            </span>
                        </div>
                        {commonInfo}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 blog-content">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{blog.title}</h1>

            {renderCreatorInfo()}

            {blog.cover_image && (
                <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src={`http://localhost:8000/storage/${blog.cover_image}`}
                        alt={blog.title}
                        className="w-full h-auto max-h-96 object-cover"
                    />
                </div>
            )}

            <div
                className="prose max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            <div className="mt-12 pt-6 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                    <BlogLikeButton blogId={blog.id} />
                    <div className="flex items-center ml-4">
                        <MessageCircle className="h-5 w-5 mr-2 text-gray-500" />
                        <span className="text-gray-500">
                            {blog.comments?.length || 0} Commentaire{blog.comments?.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                </div>
                {canDeleteBlog() && (
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="hidden md:flex items-center gap-2 px-3 py-1 text-red-600 hover:text-red-800 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
                    >
                        <Trash2 className="h-4 w-4" />
                        <span>{isDeleting ? 'Suppression...' : 'Supprimer le blog'}</span>
                    </button>
                )}
            </div>

            <div className="mt-8 max-w-[600px] mx-auto">
                <form onSubmit={handleCommentSubmit} className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 flex-shrink-0">
                        <img
                            src={userProfile(currentUser.image_profile_url)}
                            alt={currentUser.name}
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
        </div>
    );
}

export default Blog;