import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { uploadPosts } from "../../Redux/PostsSilce";
import { getMediasProfile, getUserFriends, getUserProfile } from "../../Redux/ProfileSlice";

function Profile() {
  const state = useSelector((state) => state.auth);
    const { id } = useParams();
    const dispatchEvent = useDispatch()
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/profile/${id}`, {
            method: "get",
            headers: {
              Authorization: `Bearer ${state.access_token}`,
            },
          });

          if (!response.ok) {
            console.error("Unauthorized:", response.status);
            return;
          }


          const PostData = await response.json();
          if (PostData) {
            dispatchEvent(uploadPosts(PostData.posts));
            dispatchEvent(getMediasProfile(PostData.medias));
            dispatchEvent(getUserProfile(PostData.user));
            dispatchEvent(getUserFriends(PostData.amis));
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
export default Profile;