import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { uploadPosts } from "../../Redux/PostsSilce";
import { getAdminsPage, getFollowersCountrPage, getMediasPage, getPage } from "../../Redux/PageSlice";

function Page() {
  const state = useSelector((state) => state.auth);
    const { id } = useParams();
  const dispatchEvent = useDispatch()
  // console.log(state);
  useEffect(() => {
      if(!state.access_token) return 
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/page/${id}`, {
            method: "get",
            headers: {
              Authorization: `Bearer ${state.access_token}`,
            },
          });

          if (!response.ok) {
            console.error("hello:", response.status);
            return;
          }


          const PageData = await response.json();
          console.log('PageData',PageData)
          if (PageData) {
            dispatchEvent(uploadPosts(PageData.posts));
            dispatchEvent(getPage(PageData.page));
            dispatchEvent(getMediasPage(PageData.medias));
            dispatchEvent(getAdminsPage(PageData.admins));
            dispatchEvent(getFollowersCountrPage(PageData.followorsCount));
          }
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      };
      fetchData();
    }, [state.access_token, id, dispatchEvent]);
    return (
        <>
            <Outlet/>
        </>
    )
}
export default Page;