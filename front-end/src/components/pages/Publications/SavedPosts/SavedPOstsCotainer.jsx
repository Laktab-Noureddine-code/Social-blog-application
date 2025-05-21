import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSavedPosts } from "../../../../Redux/UserSilce";
import SavedPostsList from "./SavedPostsList";
import { setPath } from "../../../../Redux/authSlice";
import { useLocation } from "react-router-dom";


export default function SavedPostsContainer() {
  const state = useSelector(state => state)
  const [loading,setLoading] = useState(true)
    const dispatchEvent = useDispatch();
    const location = useLocation();
    useEffect(() => {
    dispatchEvent(setPath(location.pathname));
      console.log(state.auth.access_token);
      const fetchData = async () => {
        const response = await fetch("/api/saved-posts", {
          headers: {
            Authorization: `Bearer ${state.auth.access_token}`,
          },
        });
        const res = await response.json();
        if (response.ok) {
          dispatchEvent(getSavedPosts(res));
          setLoading(false);
        }
      };
      fetchData();
    }, [dispatchEvent, state.auth.access_token]);
  // Sample data - in a real app, this would come from an API or database
 

  return (
    <main className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <SavedPostsList savedPosts={state.user.savedPost} loading={loading} />
      {/* {loading ? <SkeletonSavedPosts /> : <SavedPostsList savedPosts={state.user.savedPost} />} */}
    </main>
  );
}
