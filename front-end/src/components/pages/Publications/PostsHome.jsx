import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContainerPosts from "./ContainerPosts";
import ProfilePrompt from "../../Accueil Page/components/Prompt_Profile";
import { NewPosts, uploadPosts } from "../../../Redux/PostsSilce";

export default function PostsHome() {
  const state = useSelector((state) => state);
  const dispatchEvent = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/posts", {
          headers: {
            Authorization: `Bearer ${state.access_token}`,
          },
        });

        if (!response.ok) {
          console.error("Unauthorized:", response.status);
          return;
        }

        const PostData = await response.json();
        dispatchEvent(uploadPosts(PostData));
        
        dispatchEvent(NewPosts(false));
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchData();
    console.log("posting .......");
    console.log("postin,", state.showProfilePrompt);
  }, [state.access_token, dispatchEvent]);

  return (
    <>
      <ProfilePrompt/>
      <ContainerPosts />
    </>
  );
}
