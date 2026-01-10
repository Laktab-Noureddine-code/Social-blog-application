// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import ContainerPosts from "./ContainerPosts";
// import { NewPosts, paginatePost, uploadPosts } from "@/Redux/PostsSilce";
// import { useLocation } from "react-router-dom";
// import { setPath } from "@/Redux/authSlice";
// import { shuffleArray } from "@/shared/helpers/helper";
// export default function PostsVideos() {
//   const state = useSelector((state) => state);
//   const location = useLocation();
//   const dispatchEvent = useDispatch();
  
//   dispatchEvent(setPath(location.pathname));
//   useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await fetch("/api/posts-videos", {
//             headers: {
//               Authorization: `Bearer ${state.auth.access_token}`,
//             },
//           });

//           if (!response.ok) {
//             console.error("Unauthorized:", response.status);
//             return;
//           }

//           const PostData = await response.json();
//           // dispatchEvent(uploadPosts(PostData));
//           console.log(PostData);
//         dispatchEvent(paginatePost(shuffleArray(PostData.data)));

//           dispatchEvent(NewPosts(false));

//         } catch (err) {
//           console.error("Error fetching user:", err);
//         }
//       };
//       fetchData();
//   }, [state.auth.access_token, dispatchEvent]);


//   return (
//     <>
//       <ContainerPosts/>
//     </>
//   )
// }


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContainerPosts from "./ContainerPosts";
import { NewPosts, paginatePost, uploadPosts } from "@/Redux/PostsSilce";
import { setPath } from "@/Redux/authSlice";
import { useLocation } from "react-router-dom";
import { shuffleArray } from "@/shared/helpers/helper";
import api from "@/lib/api";

export default function PostsVideos() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(setPath(location.pathname));
    loadMorePosts(); // Initial fetch
  }, []);

  const loadMorePosts = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await api.get(`/api/posts-videos?page=${page}&limit=5`);

      const data = response.data;
      if (!data.data || data.data.length === 0) {
        setHasMore(false);
      } else {
        const shuffled = shuffleArray(data.data);
        setPosts((prev) => [...prev, ...shuffled]);
        dispatch(paginatePost(shuffled));
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to fetch video posts:", error);
    } finally {
      setLoading(false);
      dispatch(NewPosts(false));
    }
  };
  useEffect(() => {
     dispatch(uploadPosts([]));
    loadMorePosts()
  }, []);

  return (
    <ContainerPosts
      posts={posts}
      loadMorePosts={loadMorePosts}
      hasMore={hasMore}
      loading={loading}
    />
  );
}
