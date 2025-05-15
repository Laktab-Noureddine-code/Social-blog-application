import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContainerPosts from "./ContainerPosts";
export default function PostsVideos() {
  const state = useSelector((state) => state);
  const dispatchEvent = useDispatch();
  
  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("/api/posts-videos", {
            headers: {
              Authorization: `Bearer ${state.access_token}`,
            },
          });

          if (!response.ok) {
            console.error("Unauthorized:", response.status);
            return;
          }

          const PostData = await response.json();
          dispatchEvent({ type: "upload_posts", payload: PostData });
          dispatchEvent({ type: "new_posts" });

        } catch (err) {
          console.error("Error fetching user:", err);
        }
      };
      fetchData();
      console.log("posting .......");
    
  }, [state.access_token, dispatchEvent, state.new_posts]);


  return (
    <>
      <ContainerPosts/>
    </>
  )
}
