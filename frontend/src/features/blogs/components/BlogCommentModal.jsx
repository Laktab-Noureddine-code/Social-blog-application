/* eslint-disable react/prop-types */
import { Button } from "@/shared/ui/button";
import { Avatar } from "@/shared/ui/avatar";
import { Input } from "@/shared/ui/input";
import { Send, X, MessageCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "@/Redux/blogInteractionsSlice";
import GetRelativeTime from "@/features/home/components/GetRelativeTimes";
import { userProfile } from "@/shared/helpers/helper";
import api from "@/lib/api";

function BlogCommentModal({ blogId, toggleComments }) {
    const dispatch = useDispatch();
    const [newComment, setNewComment] = useState("");
    const commentsEndRef = useRef(null);
    const { user } = useSelector((state) => state.auth);
    // // Remplacez cette ligne
    // const blogComments = useSelector(state =>
    //     state.blogInteractions.blogs.find(blog => blog.id === blogId).comments
    // );
    
    // Par celle-ci avec une vérification de sécurité
    const blogComments = useSelector(state => {
        const blog = state.blogInteractions.blogs.find(blog => blog.id === blogId);
        return blog ? blog.comments || [] : [];
    });
    console.log(blogComments)

    // Get comments from Redux store or fetch them
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await api.get(`/api/blogs/${blogId}/comments`);
                // Ensure data is an array
                // setComments(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Error loading comments:", error);
                // setComments([]); // Set to empty array on error
            }
        };
        fetchComments();
    }, [blogId]);

    const handleSubmitComment = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        const submitComment = async () => {
            try {
                const response = await api.post(`/api/blogs/${blogId}/comment`, { content: newComment });

                // Update Redux store
                dispatch(addComment({
                    blogId,
                    comment: response.data.comment
                }));
            } catch (error) {
                console.error("Error submitting comment:", error);
            }
        };

        submitComment();
        setNewComment("");

        // Scroll to bottom after adding comment
        setTimeout(() => {
            commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={toggleComments}
            ></div>

            <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-neutral-800">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <MessageCircle className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                                Comments
                            </h3>
                        </div>
                        <button
                            type="button"
                            onClick={toggleComments}
                            className="rounded-full p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            {blogComments && blogComments.length === 1 ? "comment" : "comments"}
                        </p>
                    </p>
                </div>

                {/* Comments List */}
                <div className="h-[60vh] overflow-y-auto px-6 py-4">

                    {blogComments && blogComments.length > 0 ? (
                        <div className="space-y-4">
                            {blogComments.map((comment, index) => (
                                <div key={index} className="flex gap-3">
                                    <div className="h-14 w-14 flex items-center justify-center rounded-full">
                                        <img
                                            src={userProfile(comment.user.image_profile_url)}
                                            alt="Avatar"
                                            className="h-full w-full rounded-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-2xl rounded-tl-none">
                                            <div className="font-medium text-sm text-neutral-900 dark:text-white mb-1">
                                                {comment.user.name}
                                            </div>
                                            <div className="text-neutral-700 dark:text-neutral-300 text-sm whitespace-pre-wrap break-words">
                                                {comment.content}
                                            </div>
                                        </div>
                                        <div className="text-xs text-neutral-500 dark:text-neutral-500 mt-1 ml-2">
                                            {GetRelativeTime(comment.created_at)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={commentsEndRef}></div>
                        </div>
                    ) : (
                        <div className="py-12 text-center text-neutral-500 dark:text-neutral-400">
                            <p>No comments yet</p>
                            <p className="text-sm mt-2">Be the first to comment</p>
                        </div>
                    )}
                </div>

                {/* Comment Form */}
                <div className="border-t border-gray-100 dark:border-neutral-800 px-6 py-4">
                    <form
                        onSubmit={handleSubmitComment}
                        className="flex items-center gap-3"
                    >
                        <Avatar className="h-9 w-9 flex-shrink-0">
                            {user.image_profile_url ? (
                                <img
                                    src={user.image_profile_url || "/placeholder.svg"}
                                    alt="Your avatar"
                                    className="h-full w-full rounded-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/placeholder.svg?height=36&width=36";
                                    }}
                                />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-700 rounded-full">
                                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                                        {user.name
                                            ? user.name.charAt(0).toUpperCase()
                                            : "U"}
                                    </span>
                                </div>
                            )}
                        </Avatar>
                        <div className="flex-1 flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-full pr-2">
                            <Input
                                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-neutral-900 dark:text-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
                                placeholder="Write a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <Button
                                type="submit"
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:hover:bg-neutral-700"
                                disabled={!newComment.trim()}
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BlogCommentModal;