import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContainerPosts from "./ContainerPosts";
import ProfilePrompt from "../../Accueil Page/components/Prompt_Profile";
import { NewPosts, uploadPosts } from "../../../Redux/PostsSilce";
import { setPath } from "../../../Redux/authSlice";
import { useLocation } from "react-router-dom";

export default function PostsHome() {
  const state = useSelector((state) => state.auth);
  const [loding, setLoadin] = useState(true);
  const dispatchEvent = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatchEvent(setPath(location.pathname));
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
        } else {
          const PostData = await response.json();
          dispatchEvent(uploadPosts(PostData));
          setLoadin(false);
          dispatchEvent(NewPosts(false));
        }
      
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchData();
  }, [state.access_token, dispatchEvent]);

  return (
    <>
      <ProfilePrompt />
      <ContainerPosts setLoadin={setLoadin} loding={loding} />
    </>
  );
}
