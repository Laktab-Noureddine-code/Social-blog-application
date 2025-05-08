
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Send, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import "../../../style/globale.css";
import GetRelativeTime from "./GetRelativeTimes";

function CommentsSection({ postId, toggleComments, access_token,SetPosts }) {
  const [newComment, setNewComment] = useState("");
  const [Comments, setComments] = useState([]);
  const commentsEndRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      const respons = await fetch(`/api/comment/${postId}`, {
        method: "GET",
        // body: JSON.stringify({ id: postId }),
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const res = await respons.json();
      setComments(res)
    };
    fetchData();
  }, [postId]);
  const handleSubmitComment = (e) => {
    e.preventDefault();
    const StorComment = async () => {
      const respones = await fetch("/api/storComment", {
        method: "POST",
        body: JSON.stringify({ content: newComment, post_id: postId }),
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }); 
      const res = await respones.json();
      setComments(prev => [...prev, res.comment])
      SetPosts(res.comments);
    }
    StorComment();
    setNewComment('')
  };

  // Scroll to the bottom of the comments list when a new comment is added
  // useEffect(() => {
  //   commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [comments]);

  // Disable body scrolling when the comment section is open
  // useEffect(() => {
  //   if (comments.length > 0) {
  //     document.body.style.overflow = "hidden"; // Disable scrolling
  //   } else {
  //     document.body.style.overflow = "auto"; // Enable scrolling
  //   }
  //   // Clean up the effect when the component unmounts
  //   return () => {
  //     document.body.style.overflow = "auto"; // Ensure scrolling is enabled when the component is unmounted
  //   };
  // }, [comments]);

  return (
    <div className="h-screen fixed bg-black/85 dark:bg-gray-800/8 w-full top-0 left-0 z-30 flex justify-center py-2 items-center">
      <div className="bg-[#28242c] dark:bg-gray-50 w-full max-w-2xl mx-auto sm:px-0 py-5 max-h-[500px] rounded-md relative">
        {/* Close Button */}
        <div className="h-10 w-full bg-[#28242c] flex justify-end pr-5 border-b-1 border-white">
          <button type="button" className="z-20" onClick={toggleComments}>
            <X
              size={30}
              color="white"
              className="bg-gray-600 rounded-full p-2 cursor-pointer"
            />
          </button>
        </div>
        {/* Comments List (Scrollable with transparent bg and custom scrollbar) */}
        <div className="w-full overflow-y-auto max-h-[400px] pb-16 bg-transparent custom-scrollbar">
          <div className="p-5 relative">
            {Comments &&
              Comments.length > 0 &&
              Comments.map((comment, index) => (
                <div key={index} className="flex gap-2 mb-3">
                  <Avatar className="w-8 h-8">
                    {/* <img src="/api/placeholder/32/32" alt={comment.author} /> */}
                    <img
                      src={`/images/img${
                        Math.floor(Math.random() * 12) + 1
                      }.jpg`}
                      alt={comment.user.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </Avatar>
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg max-w-[90%]">
                    <div className="font-semibold text-xs">
                      {comment.user.name}
                    </div>
                    <div className="text-sm">{comment.content}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {GetRelativeTime(comment.created_at)}
                    </div>
                  </div>
                </div>
              ))}
            {/* Scroll to bottom of the comment list */}
            <div ref={commentsEndRef}></div>
          </div>
        </div>
        {/* Fixed Comment Form */}
        <form
          onSubmit={handleSubmitComment}
          className="flex gap-2 mt-3  bg-[#28242c] py-2 px-5"
        >
          <Avatar className="w-8 h-8">
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
            <Button
              type="submit"
              variant="ghost"
              className="ml-2 p-2 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommentsSection;
