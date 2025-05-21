/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import { UserPlus, UserMinus } from "lucide-react";
import { addNewAbonnes, removeAbonne } from "../../../../Redux/AmisSicie";
import { useEffect, useState } from "react";

export default function ToggleFollowButton({ post }) {
  const state = useSelector((state) => state);
  const [isFollowing, setIsFollowing] = useState(false);
  const dispatchEvent = useDispatch();
  console.log(state.amis.abonnes);
  useEffect(() => {
    
    const exists = state.amis.abonnes.some((abonne) => abonne.id === post.page.id);
    setIsFollowing(exists);
    console.log("exists", exists);
  }, [dispatchEvent, post.page.id, state.amis.abonnes]);

  const followPage = async () => {
    try {
      const response = await fetch(`/api/follow/${post.page.id}/${state.auth.user.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.auth.access_token}`,
        },
      });
      if (!response.ok) throw new Error("Erreur lors du follow");
      const data = await response.json();
      dispatchEvent(addNewAbonnes( data ));
    } catch (error) {
      console.error("Follow error:", error);
    }
  };

  const unfollowPage = async () => {
    try {
      const response = await fetch(
        `/api/unfollow/${post.page.id}/${state.auth.user.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${state.auth.access_token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Erreur lors de l’unfollow");
      const data = await response.json();
      dispatchEvent(removeAbonne(data));
    } catch (error) {
      console.error("Unfollow error:", error);
    }
  };

  return isFollowing ? (
    <button
      onClick={unfollowPage}
      className="group gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 w-full"
    >
      <div className="flex items-center gap-2 ">
        <UserMinus
          className="group-hover:scale-110 transition-transform"
          size={18}
        />
        <span>Se désabonner</span>
      </div>
      <p className="text-xs text-gray-500">
        Vous êtes abonné. Cliquez pour vous désabonner.
      </p>
    </button>
  ) : (
    <button
      onClick={followPage}
      className="group gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 w-full"
    >
      <div className="flex items-center gap-2 ">
        <UserPlus
          className="group-hover:scale-110 transition-transform"
          size={18}
        />
        <span>S’abonner</span>
      </div>
      <p className="text-xs text-gray-500">
        Abonnez-vous pour recevoir les mises à jour.
      </p>
    </button>
  );
}
