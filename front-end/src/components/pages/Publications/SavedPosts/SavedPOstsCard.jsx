/* eslint-disable react/prop-types */


import { useState } from "react"

import { Heart, MessageCircle, Bookmark, BookmarkX, ImageIcon } from "lucide-react"



export default function SavedPostCard({ post, onUnsave }) {
  const [isHovering, setIsHovering] = useState(false)

  // Get first 7 words of text
  const previewText = post.text.split(" ").slice(0, 7).join(" ") + (post.text.split(" ").length > 7 ? "..." : "")

  // Format date
  // const formattedDate = new Intl.DateTimeFormat("en-US", {
  //   month: "short",
  //   day: "numeric",
  //   year: "numeric",
  // }).format(post.created_at)

  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow duration-200"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image section */}
        <div className="relative h-48 md:h-auto md:w-1/3 md:min-h-[180px] bg-gray-100 dark:bg-gray-800 flex-shrink-0">
          {post.images && post.images.length > 0 ? (
            <img src={post.images[0] || "/placeholder.svg"} alt="Post image" className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon size={48} className="text-gray-400 dark:text-gray-600" />
            </div>
          )}
          {post.medias.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
              +{post.images.length - 1}
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="p-4 md:p-5 flex flex-col justify-between flex-grow">
          <div>
            <p className="text-gray-800 dark:text-gray-200 text-base md:text-lg font-medium mb-2">{previewText}</p>
            {/* <p className="text-gray-500 dark:text-gray-400 text-sm">Saved on {formattedDate}</p> */}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-4">
              <button
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Heart
                  size={18}
                />
                <span className="text-sm">{post.likes.length}</span>
              </button>

              <button
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
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
                <Bookmark size={20} className="fill-blue-600 text-blue-600 dark:fill-blue-500 dark:text-blue-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
