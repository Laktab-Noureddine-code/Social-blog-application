import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOthersPages } from "@/Redux/PagesSlice";
import MyLoader from "@/shared/components/Loader";
import PageCardUnFollow from './PageCardeUnfollow'
import api from "@/lib/api";

export default function PageListFollow() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const others_pages = useSelector((state) => state.pages.others_pages);
  const [loading, setLoading] = useState(true);
  const dispatcheEvent = useDispatch();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/pages/other-pages");
        setLoading(false);
        dispatcheEvent(getOthersPages(response.data));
      } catch (error) {
        console.error("Error fetching other pages:", error);
        setLoading(false);
      }
    };
    if (isAuthenticated) fetchData();
  }, [isAuthenticated, dispatcheEvent]);

  return !loading ? (
    <div className="w-full p-4">
      <h2 className="text-xl font-bold mb-4">Pages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {others_pages.map((page) => (
          <PageCardUnFollow key={page.id} page={page} />
        ))}
      </div>
    </div>
  ) : (
    <MyLoader />
  );
}
