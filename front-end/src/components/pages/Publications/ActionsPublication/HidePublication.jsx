/* eslint-disable react/prop-types */

import { Eye } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addhiddenByUsers } from "../../../../Redux/PostsSilce";

export default function HideButton({ post }) {
  const state = useSelector((state) => state.auth);
  const dispatchEvent = useDispatch();
  const handlehide = () => {
    const fetchData = async () => {
      const response = await fetch(`/api/hide/${post.id}`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${state.access_token}`,
        },
      });
      const res = await response.json();
      console.log(res)
      dispatchEvent(addhiddenByUsers({ idPost: post.id, response: res }));
    };
    fetchData();
  };
  return (
    <button
      onClick={handlehide}
      className={`
        group relative px-4 py-2.5 rounded-md  font-medium text-sm
        transition-all duration-200 w-full bg-white text-gray-700 shadow-sm border border-gray-200
      `}
    >
      <div className="flex items-center gap-2">
        <span
          className={`
          relative z-10 transition-transform duration-300 rotate-0 group-hover:-rotate-12
        `}
        >
          {/* {hidden ? <EyeOff size={18} /> : <Eye size={18} />} */}
          <Eye size={18} />
        </span>
        <span className="relative z-10">Masquer</span>
      </div>

      <span
        className={`
        absolute inset-0 rounded-md bg-gray-500/45
        transition-all duration-300 ease-out scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-10`}
      ></span>

      <div className="flex-1">
        <p className="text-xs text-gray-500">
          Masquer cette publication pour vous.
        </p>
      </div>
    </button>
  );
}
