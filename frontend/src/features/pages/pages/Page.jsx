import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useParams, useNavigate } from "react-router-dom";
import { uploadPosts } from "@/Redux/PostsSilce";
import {
  getAdminsPage,
  getFlloersPage,
  getFollowersCountrPage,
  getMediasPage,
  getPage,
  setLoadingPage
} from "@/Redux/PageSlice";
import { setPath } from "@/Redux/authSlice";
import PageHeader from "@/features/pages/components/PageHeader";
import api from "@/lib/api";

function Page() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Set path once when component mounts
  useEffect(() => {
    dispatch(setPath(location.pathname));
  }, [dispatch, location.pathname]);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        dispatch(setLoadingPage(true));

        if (!isAuthenticated) {
          navigate('/login');
          return;
        }

        const response = await api.get(`/api/page/${id}`);
        const pageData = response.data;
        
        if (pageData) {
          dispatch(uploadPosts(pageData.posts));
          dispatch(getPage(pageData.page));
          dispatch(getMediasPage(pageData.medias));
          dispatch(getAdminsPage(pageData.admins));
          dispatch(getFollowersCountrPage(pageData.followorsCount));
          dispatch(getFlloersPage(pageData.page.followers));
        }
      } catch (err) {
        console.error("Error fetching page data:", err);
        if (err.response?.status === 401) {
          navigate('/login');
        } else {
          navigate('/error');
        }
      } finally {
        dispatch(setLoadingPage(false));
      }
    };

    fetchPageData();
  }, [isAuthenticated, id, dispatch, navigate]);

  return (
    <>
      <PageHeader />
      <Outlet />
    </>
  );
}

export default Page;