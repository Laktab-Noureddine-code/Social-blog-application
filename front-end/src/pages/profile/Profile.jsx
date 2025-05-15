import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

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
          dispatchEvent({ type: "upload_posts", payload: PostData.posts });
          dispatchEvent({
            type: "get_medias_profile",
            payload: PostData.medias,
          });
          dispatchEvent({
            type: "get_user_profile",
            payload: PostData.user,
          });
          dispatchEvent({
            type: "get_user_friends",
            payload: PostData.amis,
          });
          // dispatchEvent({ type: "new_posts" });
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