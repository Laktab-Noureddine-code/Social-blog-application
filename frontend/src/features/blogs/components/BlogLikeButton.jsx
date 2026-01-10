import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart } from "lucide-react";
import { toggleLike, setLoading } from "@/Redux/blogInteractionsSlice";
import api from "@/lib/api";

function BlogLikeButton({ blogId, localBlog, onLikeUpdate }) {
    
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [animatingLike, setAnimatingLike] = useState(false);

    // Get the blog from the Redux store
    const reduxBlog = useSelector(state =>
        state.blogInteractions.blogs.find(blog => blog.id === blogId)
    );

    // Use localBlog if provided (for Blog.jsx), otherwise use reduxBlog (for BlogCard.jsx)
    const blog = localBlog || reduxBlog;
    
    // Get likes from the blog
    const likes = blog?.likes || [];

    // Check if current user has liked this blog
    const isLiked = likes.some(like => like.user_id === user.id);

    // Function to handle like button click
    const handleLike = async () => {
        // Animate the like button
        setAnimatingLike(true);
        setTimeout(() => setAnimatingLike(false), 500);

        // Set loading state
        dispatch(setLoading(true));

        try {
            // Call API to toggle like
            await api.post(`/api/blogs/${blogId}/like`);
            
            // Update Redux state
            dispatch(toggleLike({ blogId, userId: user.id }));
            
            // If we have a callback for local state updates, call it
            if (onLikeUpdate && localBlog) {
                // Create a new likes array based on the current state
                let updatedLikes = [...likes];
                const userLikeIndex = updatedLikes.findIndex(like => like.user_id === user.id);
                
                if (userLikeIndex !== -1) {
                    // Remove like if it exists
                    updatedLikes.splice(userLikeIndex, 1);
                } else {
                    // Add like if it doesn't exist
                    updatedLikes.push({ 
                        user_id: user.id,
                        blog_id: blogId,
                        id: Date.now() // Temporary ID until server response
                    });
                }
                
                onLikeUpdate(updatedLikes);
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <button
            onClick={handleLike}
            className={`flex items-center gap-1 px-3 py-2 rounded-md transition-all ${isLiked ? "text-red-500" : "text-gray-600 hover:bg-gray-100"
                }`}
        >
            <Heart
                className={`${animatingLike ? "scale-125" : "scale-100"
                    } transition-all duration-300 ${isLiked ? "fill-red-500" : ""
                    }`}
                size={20}
            />
            <span>{likes.length > 0 ? likes.length : ""}</span>
        </button>
    );
}

export default BlogLikeButton;