/* eslint-disable react/prop-types */
import { ChevronLeft, ChevronRight, Share, X } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Avatar } from "@/shared/ui/avatar";
import CommentsSectionViwe from "../components/CommentsSectionViwe";
import LikeButton from "./ButtonLike";
import { useEffect } from "react";
import CommentButton from "./CommentButton";
import CommentsSection from "./CommantsSections";
import Video from "./Video";

function MediaViwe({
  post,
  currentImageIndex,
  onClose,
  onPrev,
  onNext,
  posts,
}) {
  const totalImages = post.media.length;
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const toggleComments = (idPost) => {
    const Post = posts.find((p) => p.id === idPost);
    Post.showComments = !Post.showComments;
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col md:flex-row">
      {/* Close Button */}
      <Button
        variant="ghost"
        className="absolute top-4 right-4 text-white p-1 rounded-full z-20 hover:bg-gray-300"
        onClick={onClose}
      >
        <X className="h-8 w-8 text-gray-600" />
      </Button>

      {/* Main Image/Video Section */}
      <div className="flex-1 flex items-center justify-center relative p-4 h-1/2 md:h-full">
        {totalImages > 1 && (
          <Button
            variant="ghost"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-1 rounded-full z-20"
            onClick={onPrev}
          >
            <ChevronLeft className="h-8 w-8 " />
          </Button>
        )}

        {post.media[currentImageIndex].type === "image" ? (
          <img
            src={post.media[currentImageIndex].url}
            alt={`Post image ${currentImageIndex + 1}`}
            className="max-h-full max-w-full object-contain w-full"
          />
        ) : (
          <div className="w-full h-96 cursor-pointer flex justify-center items-center">
            <Video
              videoUrl={post.media[currentImageIndex].url}
              showVideo={true}
            />
          </div>
        )}

        {totalImages > 1 && (
          <Button
            variant="ghost"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-1 rounded-full z-20"
            onClick={onNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        )}

        {/* Image Indicator */}
        {totalImages > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white z-20">
            {currentImageIndex + 1} / {totalImages}
          </div>
        )}
      </div>

      {/* Post Information Panel */}
      <div className="bg-white dark:bg-gray-800 w-full md:w-96 flex flex-col h-1/2 md:h-full overflow-y-auto">
        {/* Author Info */}
        <div className="p-4 border-b">
          <div className="flex items-start gap-3">
            <Avatar className="w-10 h-10">
              <img src="/api/placeholder/40/40" alt={post.author} />
            </Avatar>
            <div>
              <div className="font-medium">
                {post.author} {post.mood && `is ${post.mood}`}
              </div>
              <div className="text-xs text-gray-500">{post.timestamp}</div>
            </div>
          </div>
          <p className="mt-3 text-sm">{post.content}</p>
        </div>

        {/* Thumbnail Navigation */}
        {totalImages > 1 && (
          <div className="p-2 flex gap-2 overflow-x-auto border-b">
            {post.media.map((mediaItem, idx) => (
              <div
                key={idx}
                className={`w-16 h-16 flex-shrink-0 cursor-pointer ${
                  idx === currentImageIndex ? "ring-2 ring-blue-500" : ""
                }`}
                // onClick={() => onClick(idx)} // Logic for selecting a different image/video
              >
                {mediaItem.type === "image" ? (
                  <img
                    src={mediaItem.url}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <video
                    src={mediaItem.url}
                    className="w-full h-full object-cover rounded-md"
                    muted
                    loop
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="border-b">
          <div className="flex justify-between p-2">
            <LikeButton
              likes={post.likes}
              isLiked={post.likedByMe}
              onLike={() => {
                /* Logic for liking the post */
              }}
            />
            <CommentButton
              comments={post.comments}
              showComments={post.showComments}
              onToggleComments={() => {
                toggleComments(post.id);
              }}
            />
            {post.showComments && (
              <CommentsSection
                postId={post.id}
                comments={post.commentsList}
                toggleComments={() => toggleComments(post.id)}
              />
            )}
            {/* <Button
              variant="ghost"
              className="flex-1"

            >
              <MessageSquare className="h-5 w-5 mr-2" /> Comment
            </Button> */}
            <Button variant="ghost" className="flex-1">
              <Share className="h-5 w-5 mr-2" /> Share
            </Button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="flex-1 overflow-y-auto absolute top-[40%] max-md:hidden transform-translate-y-1/2 w-full">
          <CommentsSectionViwe postId={post.id} comments={post.commentsList} />
        </div>
      </div>
    </div>
  );
}

export default MediaViwe;
