import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContainerPosts from "./ContainerPosts";
import { NewPosts, uploadPosts } from "../../../Redux/PostsSilce";
import { useLocation } from "react-router-dom";
import { setPath } from "../../../Redux/authSlice";
export default function PostsVideos() {
  const state = useSelector((state) => state);
  const location = useLocation();
  const dispatchEvent = useDispatch();
  
  dispatchEvent(setPath(location.pathname));
  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("/api/posts-videos", {
            headers: {
              Authorization: `Bearer ${state.auth.access_token}`,
            },
          });

          if (!response.ok) {
            console.error("Unauthorized:", response.status);
            return;
          }

          const PostData = await response.json();
          dispatchEvent(uploadPosts(PostData));
          dispatchEvent(NewPosts(false));

        } catch (err) {
          console.error("Error fetching user:", err);
        }
      };
      fetchData();
  }, [state.auth.access_token, dispatchEvent]);


  return (
    <>
      <ContainerPosts/>
    </>
  )
}
