/* eslint-disable react/prop-types */
import { Button } from "@/shared/ui/button";
import {Heart} from "lucide-react";
function LikeButton({ isLiked, onLike, likes, animatingLike, postId }) {
  return (
    <Button
      variant="ghost"
      className={`flex-1 ${isLiked ? "text-red-500" : "text-gray-600"}`}
      onClick={onLike}
    >
      <Heart
        className={`h-5 w-5 mr-2 ${isLiked ? "fill-red-500" : ""}  ${
          postId && animatingLike && "scale-130"
        }`}
      />{" "}
      {isLiked}
      {isLiked ? "Liked" : "Like"} {likes ? `(${likes.length})` : ""}
    </Button>
  );
};
export default LikeButton;