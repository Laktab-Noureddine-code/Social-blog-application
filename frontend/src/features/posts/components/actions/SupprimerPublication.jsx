/* eslint-disable react/prop-types */
import { useState } from "react";
import { Trash2, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { removePost } from "@/Redux/PostsSilce";
import api from "@/lib/api";

export default function SupprimerButton({ post }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const dispachEvent = useDispatch();

  const handleClick = () => {
    if (confirmDelete) {
      // Perform delete action here
      if (!post.id) return;

      const deletePost = async () => {
        try {
          const response = await api.delete(`/api/posts/${post.id}`);
          dispachEvent(removePost(response.data.post));
        } catch (error) {
          console.error("Erreur réseau:", error);
        }
      };

      deletePost();
      // Reset after deletion
      setTimeout(() => setConfirmDelete(false), 1000);
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        group relative overflow-hidden px-4 py-2.5 rounded-md font-medium text-sm
        transition-all duration-300 ease-out w-full
        ${
          confirmDelete
            ? "bg-red-600 text-white"
            : "bg-white text-gray-700 border border-gray-200 hover:border-red-300 hover:bg-red-50/50"
        }
      `}
    >
      <div className="flex items-center gap-2">
        <Trash2
          size={18}
          className={`transition-all duration-300 ${
            confirmDelete ? "animate-wiggle" : "group-hover:text-red-500"
          }`}
        />
        <span>{confirmDelete ? "Confirmer" : "Supprimer"}</span>
      </div>

      {confirmDelete && (
        <div
          className="absolute top-0 right-0 h-full flex items-center pr-2"
          onClick={(e) => {
            e.stopPropagation();
            setConfirmDelete(false);
          }}
        >
          <X size={16} className="text-white/80 hover:text-white" />
        </div>
      )}

      <style>{`
        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(0);
          }
          25% {
            transform: rotate(-8deg);
          }
          75% {
            transform: rotate(8deg);
          }
        }
        .animate-wiggle {
          animation: wiggle 0.5s ease-in-out;
        }
      `}</style>
      <p className="text-xs text-gray-500">
        Show fewer posts like this in your feed.
      </p>
    </button>
  );
}
