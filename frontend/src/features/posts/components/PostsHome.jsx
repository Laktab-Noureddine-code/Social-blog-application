// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import ContainerPosts from "./ContainerPosts";
// import ProfilePrompt from "@/features/home/components/Prompt_Profile";
// import { NewPosts, uploadPosts } from "@/Redux/PostsSilce";
// import { setPath } from "@/Redux/authSlice";
// import { useLocation } from "react-router-dom";

// export default function PostsHome() {
//   const state = useSelector((state) => state.auth);
//   const [loding, setLoadin] = useState(true);
//   const dispatchEvent = useDispatch();
//   const location = useLocation();
//   useEffect(() => {
//     dispatchEvent(setPath(location.pathname));
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/api/posts", {
//           headers: {
//             Authorization: `Bearer ${state.access_token}`,
//           },
//         });

//         if (!response.ok) {
//           console.error("Unauthorized:", response.status);
//           return;
//         } else {
//           const PostData = await response.json();
//           dispatchEvent(uploadPosts(PostData.data));
//           setLoadin(false);
//           dispatchEvent(NewPosts(false));
//         }
      
//       } catch (err) {
//         console.error("Error fetching user:", err);
//       }
//     };
//     fetchData();
//   }, [state.access_token, dispatchEvent]);

//   return (
//     <>
//       <ProfilePrompt />
//       <ContainerPosts setLoadin={setLoadin} loding={loding} />
//     </>
//   );
// }



import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContainerPosts from "./ContainerPosts";
import ProfilePrompt from "@/features/home/components/Prompt_Profile";
import { NewPosts, paginatePost, uploadPosts } from "@/Redux/PostsSilce";
import { setPath } from "@/Redux/authSlice";
import { useLocation } from "react-router-dom";
import { shuffleArray } from "@/shared/helpers/helper";
import api from "@/lib/api";

export default function PostsHome() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  

  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1); // Track page or offset
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(uploadPosts([]));
    dispatch(setPath(location.pathname));
    loadMorePosts(); // Initial fetch
  }, []);

  const loadMorePosts = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await api.get(`/api/posts?page=${page}&limit=5`);

      const data = response.data;
      if (data.data.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...shuffleArray(data.data)]);
        dispatch(paginatePost(shuffleArray(data.data)));
        // dispatch(uploadPosts([...posts, ...data.data]));
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
      dispatch(NewPosts(false));
    }
  };

  return (
    <>
      <ProfilePrompt />
      <ContainerPosts
        posts={posts}
        loadMorePosts={loadMorePosts}
        hasMore={hasMore}
        loading={loading}
      />
    </>
  );
}
