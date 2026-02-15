import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSavedPosts } from "@/Redux/UserSilce";
import SavedPostsList from "./SavedPostsList";
import { setPath } from "@/Redux/authSlice";
import { useLocation } from "react-router-dom";
import api from "@/lib/api";


export default function SavedPostsContainer() {
  const savedPost = useSelector(state => state.user?.savedPost);
  const [loading, setLoading] = useState(true);
  const dispatchEvent = useDispatch();
    const location = useLocation();
    useEffect(() => {
    dispatchEvent(setPath(location.pathname));
      const fetchData = async () => {
        try {
          const response = await api.get("/api/saved-posts");
          dispatchEvent(getSavedPosts(response.data));
          setLoading(false);
        } catch (error) {
          console.error("Error fetching saved posts:", error);
          setLoading(false);
        }
      };
      fetchData();
    }, [dispatchEvent, location.pathname]);
  // Sample data - in a real app, this would come from an API or database
 

  return (
    <main className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <SavedPostsList savedPosts={savedPost} loading={loading} />
      {/* {loading ? <SkeletonSavedPosts /> : <SavedPostsList savedPosts={savedPost} />} */}
    </main>
  );
}
