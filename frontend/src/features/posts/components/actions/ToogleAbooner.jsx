/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import { UserPlus, UserMinus } from "lucide-react";
import { addNewAbonnes, removeAbonne } from "@/Redux/AmisSicie";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function ToggleFollowButton({ post }) {
  const state = useSelector((state) => state);
  const [isFollowing, setIsFollowing] = useState(false);
  const dispatchEvent = useDispatch();
  useEffect(() => {
    
    const exists = state.amis.abonnes.some((abonne) => abonne.id === post.page.id);
    setIsFollowing(exists);
  }, [dispatchEvent, post.page.id, state.amis.abonnes]);

  const followPage = async () => {
    try {
      const response = await api.post(`/api/follow/${post.page.id}/${state.auth.user.id}`);
      dispatchEvent(addNewAbonnes(response.data));
    } catch (error) {
      console.error("Follow error:", error);
    }
  };

  const unfollowPage = async () => {
    try {
      const response = await api.delete(`/api/unfollow/${post.page.id}/${state.auth.user.id}`);
      dispatchEvent(removeAbonne(response.data));
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
        <span>Unfollow</span>
      </div>
      <p className="text-xs text-gray-500">
        You are subscribed. Click to unfollow.
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
        <span>Follow</span>
      </div>
      <p className="text-xs text-gray-500">
        Subscribe to receive updates.
      </p>
    </button>
  );
}
