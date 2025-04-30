/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Send, X } from "lucide-react";
import { useState } from "react";
function CommentsSectionViwe({ postId, comments = [], toggleComments }) {
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    // Logic to add comment would go here
    setNewComment("");
  };

  return (
    <div className="px-4 py-1 bg-gray-50 dark:bg-gray-800 overflow-y-auto max-h-[500px]">
      {comments.map((comment, index) => (
        <div key={index} className="flex gap-2 mb-3 ">
          <Avatar className="w-8 h-8">
            {/* <img src="/api/placeholder/32/32" alt={comment.author} />  */}
            <img
              src={`/images/img${Math.floor(Math.random() * 12) + 1}.jpg`}
              alt={comment.author}
              className="w-full h-full object-cover rounded-full"
            />
          </Avatar>
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg max-w-[90%]">
            <div className="font-semibold text-xs">{comment.author}</div>
            <div className="text-sm">{comment.text}</div>
            <div className="text-xs text-gray-500 mt-1">{comment.time}</div>
          </div>
        </div>
      ))}

      <form onSubmit={handleSubmitComment} className="flex gap-2 mt-3">
        <Avatar className="w-8 h-8">
          {/* <img src="/api/placeholder/32/32" alt="Your avatar" /> */}
          <img
            src={`/images/img${Math.floor(Math.random() * 12) + 1}.jpg`}
            alt="Your avatar"
            className="w-full h-full object-cover rounded-full"
          />
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
