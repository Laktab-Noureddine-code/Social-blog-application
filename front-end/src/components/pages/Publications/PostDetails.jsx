import { useEffect } from "react";
import { useParams } from "react-router-dom";

function PostDetails() {
    const { postId, imageIndex } = useParams();
    const [Post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/posts/${postId}`);
            const data = await response.json(); 
            setPost(data);
            setIsLoading(false);
        };
        fetchPost();
    }, [postId]);
 
    return (
    <div>
    
    </div>
  )
}

export default PostDetails
