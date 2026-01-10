/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "@/shared/ui/button";
import { Avatar } from "@/shared/ui/avatar";
import { Input } from "@/shared/ui/input";
import { Send, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GetRelativeTime from "./GetRelativeTimes";
import api from "@/lib/api";
function CommentsSectionViwe({ postId, SetPost }) {
  const state = useSelector((state) => state);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/api/comment/${postId}`);
      setComments(response.data);
    };
    fetchData();
  }, [postId]);

  // const handleSubmitComment = (e) => {
  //   e.preventDefault();
  //   if (newComment.trim() === "") return;
  //   // Logic to add comment would go here
  //   setNewComment("");
  // };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    const StorComment = async () => {
      const res = await api.post("/api/storComment", { content: newComment, post_id: postId });
      setComments((prev) => [...prev, res.data.comment]);
      // SetPost(res.comments);
    };
    StorComment();
    setNewComment("");
  };

  return (
    <div className="py-1 bg-gray-50 dark:bg-gray-800 h-[80vh] relative w-full">
      <div className="px-4 overflow-y-auto h-[70vh]">
        {comments.map((comment, index) => (
          <div key={index} className="flex gap-2 mb-3 ">
            <Avatar className="w-8 h-8">
              {/* <img src="/api/placeholder/32/32" alt={comment.author} />  */}
              {comment.user.image_profile_url ? (
                <img
                  src={comment.user.image_profile_url}
                  alt={comment.user.name}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
                  <circle cx="40" cy="40" r="40" fill="#E5E7EB" />
                  <path
                    d="M40 40C45.5228 40 50 35.5228 50 30C50 24.4772 45.5228 20 40 20C34.4772 20 30 24.4772 30 30C30 35.5228 34.4772 40 40 40Z"
                    fill="#9CA3AF"
                  />
                  <path
                    d="M40 44C30.06 44 22 52.06 22 62C22 63.1046 22.8954 64 24 64H56C57.1046 64 58 63.1046 58 62C58 52.06 49.94 44 40 44Z"
                    fill="#9CA3AF"
                  />
                  <path
                    d="M56 30C56 35.5228 51.5228 40 46 40C40.4772 40 36 35.5228 36 30C36 24.4772 40.4772 20 46 20C51.5228 20 56 24.4772 56 30Z"
                    fill="#6B7280"
                  />
                  <path
                    d="M46 44C56.94 44 65 52.06 65 62C65 63.1046 64.1046 64 63 64H56C54.8954 64 54 63.1046 54 62C54 56.4772 50.5228 52 46 52C41.4772 52 38 56.4772 38 62C38 63.1046 37.1046 64 36 64H29C27.8954 64 27 63.1046 27 62C27 52.06 35.06 44 46 44Z"
                    fill="#6B7280"
                  />
                </svg>
              )}
            </Avatar>
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg max-w-[90%]">
              <div className="font-semibold text-xs">{comment.user.name}</div>
              <div className="text-sm">{comment.content}</div>
              <div className="text-xs text-gray-500 mt-1">
                {GetRelativeTime(comment.created_at)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmitComment}
        className="flex gap-2 mt-3 w-full py-2 bg-gray-300 px-3"
      >
        <Avatar className="w-8 h-8">
          {/* <img src="/api/placeholder/32/32" alt="Your avatar" /> */}
          {state.auth.user.image_profile_url ? (
            <img
              src={state.auth.user.image_profile_url}
              alt="Your avatar"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
              <circle cx="40" cy="40" r="40" fill="#E5E7EB" />
              <path
                d="M40 40C45.5228 40 50 35.5228 50 30C50 24.4772 45.5228 20 40 20C34.4772 20 30 24.4772 30 30C30 35.5228 34.4772 40 40 40Z"
                fill="#9CA3AF"
              />
              <path
                d="M40 44C30.06 44 22 52.06 22 62C22 63.1046 22.8954 64 24 64H56C57.1046 64 58 63.1046 58 62C58 52.06 49.94 44 40 44Z"
                fill="#9CA3AF"
              />
              <path
                d="M56 30C56 35.5228 51.5228 40 46 40C40.4772 40 36 35.5228 36 30C36 24.4772 40.4772 20 46 20C51.5228 20 56 24.4772 56 30Z"
                fill="#6B7280"
              />
              <path
                d="M46 44C56.94 44 65 52.06 65 62C65 63.1046 64.1046 64 63 64H56C54.8954 64 54 63.1046 54 62C54 56.4772 50.5228 52 46 52C41.4772 52 38 56.4772 38 62C38 63.1046 37.1046 64 36 64H29C27.8954 64 27 63.1046 27 62C27 52.06 35.06 44 46 44Z"
                fill="#6B7280"
              />
            </svg>
          )}
        </Avatar>
        <div className="flex-1 flex">
          <Input
            className="flex-1 rounded-full bg-gray-100 dark:bg-gray-700"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button type="submit" variant="ghost" className="ml-2 p-2">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
export default CommentsSectionViwe;
