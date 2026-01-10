import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useParams, useNavigate } from "react-router-dom";
import { uploadPosts } from "@/Redux/PostsSilce";
import { getMediasProfile, getUserFriends, getUserProfile } from "@/Redux/ProfileSlice";
import { setPath } from "@/Redux/authSlice";
import ProfileHeader from "./ProfileHeader";
import api from "@/lib/api";

function Profile() {
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
    const fetchData = async () => {
      try {
        if (!isAuthenticated) {
          navigate('/login');
          return;
        }

        const response = await api.get(`/api/profile/${id}`);

        const postData = response.data;
        if (postData) {
          dispatch(uploadPosts(postData.posts));
          dispatch(getMediasProfile(postData.medias));
          dispatch(getUserProfile(postData.user));
          dispatch(getUserFriends(postData.amis));
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
        if (err.response?.status === 401) {
          navigate('/login');
        } else {
          navigate('/error');
        }
      }
    };

    fetchData();
  }, [isAuthenticated, id, dispatch, navigate]);

  return (
    <>
      <ProfileHeader />
      <Outlet />
    </>
  );
}

export default Profile;