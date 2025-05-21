
/* eslint-disable react/prop-types */
import { BookmarkPlus, BookmarkMinus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSaves, removeSaves } from "../../../../Redux/PostsSilce";

export default function SavePost({ post }) {
  const [saved, setSaved] = useState(false);
  const state = useSelector((state) => state.auth);
  const dispatchEvent = useDispatch()
 useEffect(() => {
   const isSaved = post.saved_by_users?.some((ele) => ele.id === state.user.id);
   setSaved(isSaved);
 }, [post, state.user.id, dispatchEvent]);
  const save = async () => {
    try {
      const res = await fetch(`/api/save-post/${post.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.access_token}`,
        },
      });
       const data = await res.json();
      if (!res.ok) { throw new Error("Failed to save") } else {
        dispatchEvent(addSaves({ idPost: post.id, response: data }));
        setSaved(true);
      };
      
      // Optionally: Update local UI state or dispatch Redux action
    } catch (err) {
      console.error(err);
    }
  };

  const unsave = async () => {
    try {
      const res = await fetch(`/api/unsave-post/${post.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.access_token}`,
        },
      });
      const data = await res.json()
      if (!res.ok){ throw new Error("Failed to unsave")
    } else {

        dispatchEvent(removeSaves({ idPost: post.id, response: data }));
        setSaved(false);
      };
      // Optionally: Update local UI state or dispatch Redux action
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="gap-4 w-full bg-red-300">
      {!saved ? (
        <button
          onClick={save}
          className="bg-white text-emerald-600 border border-emerald-200 w-full py-3"
        >
          <div className="flex items-center px-3 ">
            <BookmarkPlus size={20} />
            <span>Save</span>
          </div>
          <p className="text-xs">
            Ajoutez cet article à vos articles enregistrés.
          </p>
        </button>
      ) : (
        <button
          onClick={unsave}
          className="bg-emerald-50 text-emerald-600 border border-emerald-200 w-full py-3"
        >
          <div className="flex items-center px-3 ">
            <BookmarkMinus size={20} />
            <span>Unsave</span>
          </div>
          <p className="text-xs">
            Ajoutez cet article à vos articles enregistrés.
          </p>
        </button>
      )}
    </div>
  );
}
