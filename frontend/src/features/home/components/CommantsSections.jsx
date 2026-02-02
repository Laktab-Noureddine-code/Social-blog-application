/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "@/shared/ui/button";
import { Avatar } from "@/shared/ui/avatar";
import { Input } from "@/shared/ui/input";
import { Send, X, MessageCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import "../../../style/globale.css";
import GetRelativeTime from "./GetRelativeTimes";
import { useDispatch, useSelector } from "react-redux";
import { updateComments } from "@/Redux/PostsSilce";
import api from "@/lib/api";

function CommentsSection({ postId, toggleComments, SetPosts }) {
  const dispatchEvent = useDispatch();
  const [newComment, setNewComment] = useState("");
  const [Comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const commentsEndRef = useRef(null);
  const state = useSelector((state) => state);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(`/api/comment/${postId}`);
        setComments(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement des commentaires:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [postId]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const StorComment = async () => {
      try {
        const res = await api.post("/api/storComment", { content: newComment, post_id: postId });
        setComments((prev) => [...prev, res.data.comment]);
        dispatchEvent(updateComments({ idPost: postId, response: res.data.comments }));
      } catch (error) {
        console.error("Erreur lors de l'envoi du commentaire:", error);
      }
    };
    StorComment();
    setNewComment("");

    // Scroll to bottom after adding comment
    setTimeout(() => {
      commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={toggleComments}
      ></div>

      <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                Comments
              </h3>
            </div>
            <button
              type="button"
              onClick={toggleComments}
              className="rounded-full p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {isLoading
              ? "Loading comments..."
              : `${Comments.length} ${
                  Comments.length === 1 ? "comment" : "comments"
                }`}
          </p>
        </div>

        {/* Comments List */}
        <div className="h-[60vh] overflow-y-auto px-6 py-4">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full border-4 border-neutral-200 dark:border-neutral-700 border-t-neutral-900 dark:border-t-white animate-spin mb-4"></div>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                Loading comments...
              </p>
            </div>
          ) : Comments && Comments.length > 0 ? (
            <div className="space-y-4">
              {Comments.map((comment, index) => (
                <div key={index} className="flex gap-3">
                  <Avatar className="h-9 w-9 flex-shrink-0 mt-1">
                    {comment.user.image_profile_url ? (
                      <img
                        src={
                          comment.user.image_profile_url || "/placeholder.svg"
                        }
                        alt={comment.user.name}
                        className="h-full w-full rounded-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/placeholder.svg?height=36&width=36";
                        }}
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-700 rounded-full">
                        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                          {comment.user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-2xl rounded-tl-none">
                      <div className="font-medium text-sm text-neutral-900 dark:text-white mb-1">
                        {comment.user.name}
                      </div>
                      <div className="text-neutral-700 dark:text-neutral-300 text-sm whitespace-pre-wrap break-words">
                        {comment.content}
                      </div>
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-500 mt-1 ml-2">
                      {GetRelativeTime(comment.created_at)}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={commentsEndRef}></div>
            </div>
          ) : (
            <div className="py-12 text-center text-neutral-500 dark:text-neutral-400">
              <p>No comments yet</p>
              <p className="text-sm mt-2">Be the first to comment</p>
            </div>
          )}
        </div>

        {/* Comment Form */}
        <div className="border-t border-gray-100 dark:border-neutral-800 px-6 py-4">
          <form
            onSubmit={handleSubmitComment}
            className="flex items-center gap-3"
          >
            <Avatar className="h-9 w-9 flex-shrink-0">
              {state.auth.user.image_profile_url ? (
                <img
                  src={state.auth.user.image_profile_url || "/placeholder.svg"}
                  alt="Votre avatar"
                  className="h-full w-full rounded-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.svg?height=36&width=36";
                  }}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-700 rounded-full">
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                    {state.auth.user.name
                      ? state.auth.user.name.charAt(0).toUpperCase()
                      : "U"}
                  </span>
                </div>
              )}
            </Avatar>
            <div className="flex-1 flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-full pr-2">
              <Input
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-neutral-900 dark:text-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:hover:bg-neutral-700"
                disabled={!newComment.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommentsSection;
