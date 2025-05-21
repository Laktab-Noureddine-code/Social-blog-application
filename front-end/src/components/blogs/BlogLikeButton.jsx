import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart } from "lucide-react";
import { toggleLike, setLoading } from "../../Redux/blogInteractionsSlice";

function BlogLikeButton({ blogId}) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { access_token: token } = useSelector((state) => state.auth);
    const [animatingLike, setAnimatingLike] = useState(false);

    // Get the blog from the Redux store
    const blog = useSelector(state => 
        state.blogInteractions.blogs.find(blog => blog.id === blogId)
    );
    
    // Get likes from the blog
    const likes = blog?.likes || [];

    // Check if current user has liked this blog
    const isLiked = likes.some(like => like.user_id === user.id);
    console.log(likes);
    
    // Function to handle like button click
    // Function to handle like button click
    const handleLike = async () => {
        // Animate the like button
        setAnimatingLike(true);
        setTimeout(() => setAnimatingLike(false), 500);

        // Optimistically update UI

        // Set loading state
        dispatch(setLoading(true));

        try {
            // Call API to toggle like
            const response = await fetch(`/api/blogs/${blogId}/like`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error("Failed to toggle like");
            }
            dispatch(toggleLike({ blogId, userId: user.id }));

            // API call successful, no need to update state again as we did it optimistically
        } catch (error) {
            console.error("Error toggling like:", error);
            // Revert the optimistic update on error
            dispatch(toggleLike({ blogId, userId: user.id }));
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