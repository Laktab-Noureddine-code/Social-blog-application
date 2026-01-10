import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/lib/api";

function PostDetails() {
    const { postId, imageIndex } = useParams();
    const [Post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/api/posts/${postId}`);
                setPost(response.data);
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPost();
    }, [postId]);
 
    return (
    <div>
    
    </div>
  )
}

export default PostDetails
