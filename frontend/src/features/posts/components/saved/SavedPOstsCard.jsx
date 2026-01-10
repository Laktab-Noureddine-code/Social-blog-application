

/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Bookmark,
  BookmarkX,
  ImageIcon,
} from "lucide-react";

export default function SavedPostCard({ post, onUnsave }) {
  const [isHovering, setIsHovering] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Get first 7 words of text
  const previewText =
    post.text.split(" ").slice(0, 7).join(" ") +
    (post.text.split(" ").length > 7 ? "..." : "");

  // Get the first media item
  const firstMedia =
    post.medias && post.medias.length > 0 ? post.medias[0] : null;
  const isVideo =
    firstMedia?.type === "video" || firstMedia?.url?.includes(".mp4");

  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow duration-200 my-6"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex flex-col md:flex-row">
        {/* Media section */}
        <div className="relative h-[160px] md:w-1/3 bg-gray-100 dark:bg-gray-800 flex-shrink-0">
          {firstMedia ? (
            <div className="relative w-full h-full">
              {isVideo ? (
                <>
                  <img
                    src={
                      firstMedia.thumbnail ||
                      firstMedia.url.replace(".mp4", ".jpg")
                    }
                    alt=""
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                  {/* Video indicator - simple overlay with triangle */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    {/* Triangle play icon */}
                    <div className="w-0 h-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-white"></div>
                  </div>
                </>
              ) : (
                <img
                  src={firstMedia.url || "/placeholder.svg"}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              )}

              {/* Show fallback if image fails to load */}
              {imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                  <ImageIcon
                    size={32}
                    className="text-gray-400 dark:text-gray-500"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <ImageIcon
                size={32}
                className="text-gray-400 dark:text-gray-500"
              />
            </div>
          )}
          {post.medias && post.medias.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
              +{post.medias.length - 1}
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="p-4 md:p-5 flex flex-col justify-between flex-grow">
          <div>
            <p className="text-gray-800 dark:text-gray-200 text-base md:text-lg font-medium mb-2">
              {previewText}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Heart size={18} />
                <span className="text-sm">{post.likes.length}</span>
              </button>

              <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <MessageCircle size={18} />
                <span className="text-sm">{post.comments.length}</span>
              </button>
            </div>

            <button
              onClick={() => onUnsave(post.id)}
              className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              aria-label="Unsave post"
            >
              {isHovering ? (
                <BookmarkX size={20} />
              ) : (
                <Bookmark
                  size={20}
                  className="fill-blue-600 text-blue-600 dark:fill-blue-500 dark:text-blue-500"
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
