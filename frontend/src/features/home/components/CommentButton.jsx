/* eslint-disable react/prop-types */
import { Button } from "@/shared/ui/button";
import { MessageSquare } from "lucide-react";
function CommentButton ({ comments, showComments, onToggleComments }) {
  return (
    <Button
      variant="ghost"
      className={`flex-1 ${showComments ? "text-blue-500" : "text-gray-600"}`}
      onClick={onToggleComments}
    >
      <MessageSquare className="h-5 w-5 mr-2" />
      Comment {comments > 0 && `(${comments})`}
    </Button>
  );
};
export default CommentButton;