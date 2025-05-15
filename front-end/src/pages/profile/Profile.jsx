import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { uploadPosts } from "../../Redux/PostsSilce";
import { getMediasProfile, getUserFriends, getUserProfile } from "../../Redux/ProfileSlice";

function Profile() {
    const state = useSelector((state) => state);
    const { id } = useParams();
    const dispatchEvent = useDispatch()
    useEffect(() => {
      console.log(state.access_token);
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

          console.log(state.access_token);
          const PostData = await response.json();
          console.log(PostData)
          dispatchEvent(uploadPosts(PostData));
          dispatchEvent( getMediasProfile(PostData.medias));
          dispatchEvent(getUserProfile(PostData));
          dispatchEvent(getUserFriends(PostData.amis));
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      };
      fetchData();
    }, [state.access_token, id, dispatchEvent]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(`/api/amis/${id}`, {
  //       method: "get",
  //       headers: {
  //         Authorization: `Bearer ${state.access_token}`,
  //       },
  //     });
  //     const PostData = await response.json();
  //     console.log('this amis',PostData);
      
  //   }
  //   fetchData();
  // })
    return (
        <>
            <Outlet/>
        </>
    )
}
export default Profile;