/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {Heart} from "lucide-react";
function LikeButton ({ likes, isLiked, onLike }) {
  return (
    <Button
      variant="ghost"
      className={`flex-1 ${isLiked ? "text-red-500" : "text-gray-600"}`}
      onClick={onLike}
    >
      <Heart className={`h-5 w-5 mr-2 ${isLiked ? "fill-red-500" : ""}`} />
      {isLiked ? "Liked" : "Like"} {likes > 0 && `(${likes})`}
    </Button>
  );
};
export default LikeButton;