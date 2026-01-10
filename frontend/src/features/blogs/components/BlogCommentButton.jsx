/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaComment } from "react-icons/fa";
import BlogCommentModal from "./BlogCommentModal";

function BlogCommentButton({ blogId, commentsCount }) {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <>
      <button
        onClick={toggleComments}
        className="flex items-center gap-1 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-all"
      >
        <FaComment className="text-gray-600" size={18} />
        <span>{commentsCount > 0 ? commentsCount : ""}</span>
      </button>

      {showComments && (
        <BlogCommentModal
          blogId={blogId}
          toggleComments={toggleComments}
        />
      )}
    </>
  );
}

export default BlogCommentButton;