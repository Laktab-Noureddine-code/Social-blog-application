import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useParams, useNavigate } from "react-router-dom";
import { uploadPosts } from "@/Redux/PostsSilce";
import { getMediasProfile, getUserFriends, getUserProfile } from "@/Redux/ProfileSlice";
import { setPath } from "@/Redux/authSlice";
import ProfileHeader from "./ProfileHeader";

function Profile() {
  const { access_token } = useSelector((state) => state.auth);
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
        if (!access_token) {
          navigate('/login');
          return;
        }

        const response = await fetch(`/api/profile/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            navigate('/login');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const postData = await response.json();
        if (postData) {
          dispatch(uploadPosts(postData.posts));
          dispatch(getMediasProfile(postData.medias));
          dispatch(getUserProfile(postData.user));
          dispatch(getUserFriends(postData.amis));
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
        navigate('/error'); // Redirect to error page or handle appropriately
      }
    };

    fetchData();
  }, [access_token, id, dispatch, navigate]);

  return (
    <>
      <ProfileHeader />
      <Outlet />
    </>
  );
}

export default Profile;