
/* eslint-disable react/prop-types */
import { BookmarkPlus, BookmarkMinus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSaves, removeSaves } from "@/Redux/PostsSilce";
import api from "@/lib/api";

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
      const response = await api.post(`/api/save-post/${post.id}`);
      dispatchEvent(addSaves({ idPost: post.id, response: response.data }));
      setSaved(true);
    } catch (err) {
      console.error(err);
    }
  };

  const unsave = async () => {
    try {
      const response = await api.delete(`/api/unsave-post/${post.id}`);
      dispatchEvent(removeSaves({ idPost: post.id, response: response.data }));
      setSaved(false);
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
            Add this article to your saved articles.
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
            Remove this article from your saved articles.
          </p>
        </button>
      )}
    </div>
  );
}
