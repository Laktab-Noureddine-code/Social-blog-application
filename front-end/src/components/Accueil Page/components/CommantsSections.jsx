
// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import { Button } from "@/components/ui/button";
// import { Avatar } from "@/components/ui/avatar";
// import { Input } from "@/components/ui/input";
// import { Send, X } from "lucide-react";
// import { useState, useEffect, useRef } from "react";
// import "../../../style/globale.css";
// import GetRelativeTime from "./GetRelativeTimes";
// import { useDispatch, useSelector } from "react-redux";

// function CommentsSection({ postId, toggleComments, SetPosts }) {
//   const dispatchEvent = useDispatch()
//   const [newComment, setNewComment] = useState("");
//   const [Comments, setComments] = useState([]);
//   const commentsEndRef = useRef(null);
//   const state = useSelector(state=>state)
//   useEffect(() => {
//     const fetchData = async () => {
//       const respons = await fetch(`/api/comment/${postId}`, {
//         method: "GET",
//         // body: JSON.stringify({ id: postId }),
//         headers: {
//           Authorization: `Bearer ${state.access_token}`,
//         },
//       });
//       const res = await respons.json();
//       setComments(res)
//     };
//     fetchData();
//   }, [postId]);
//   const handleSubmitComment = (e) => {
//     e.preventDefault();
//     const StorComment = async () => {
//       const respones = await fetch("/api/storComment", {
//         method: "POST",
//         body: JSON.stringify({ content: newComment, post_id: postId }),
//         headers: {
//           Authorization: `Bearer ${state.access_token}`,
//         },
//       }); 
//       const res = await respones.json();
//       setComments(prev => [...prev, res.comment])
//       dispatchEvent({
//         type: "update_comments",
//         payload: { idPost: postId, response: res.comments },
//       });
//       // SetPosts(res.comments);
//     }
//     StorComment();
//     setNewComment('')
//   };

//   // Scroll to the bottom of the comments list when a new comment is added
//   // useEffect(() => {
//   //   commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   // }, [comments]);

//   // Disable body scrolling when the comment section is open
//   // useEffect(() => {
//   //   if (comments.length > 0) {
//   //     document.body.style.overflow = "hidden"; // Disable scrolling
//   //   } else {
//   //     document.body.style.overflow = "auto"; // Enable scrolling
//   //   }
//   //   // Clean up the effect when the component unmounts
//   //   return () => {
//   //     document.body.style.overflow = "auto"; // Ensure scrolling is enabled when the component is unmounted
//   //   };
//   // }, [comments]);

//   return (
//     <div className="h-screen fixed bg-black/85 dark:bg-gray-800/8 w-full top-0 left-0 z-30 flex justify-center py-2 items-center">
//       <div className="bg-[#28242c] dark:bg-gray-50 w-full max-w-2xl mx-auto sm:px-0 py-5 max-h-[500px] rounded-md relative">
//         {/* Close Button */}
//         <div className="h-10 w-full bg-[#28242c] flex justify-end pr-5 border-b-1 border-white">
//           <button type="button" className="z-20" onClick={toggleComments}>
//             <X
//               size={30}
//               color="white"
//               className="bg-gray-600 rounded-full p-2 cursor-pointer"
//             />
//           </button>
//         </div>
//         {/* Comments List (Scrollable with transparent bg and custom scrollbar) */}
//         <div className="w-full overflow-y-auto max-h-[400px] pb-16 bg-transparent custom-scrollbar">
//           <div className="p-5 relative">
//             {Comments &&
//               Comments.length > 0 &&
//               Comments.map((comment, index) => (
//                 <div key={index} className="flex gap-2 mb-3">
//                   <Avatar className="w-8 h-8">
//                     {/* <img src="/api/placeholder/32/32" alt={comment.author} /> */}
//                     {comment.user.image_profile_url ? (
//                       <img
//                         src={comment.user.image_profile_url}
//                         alt={comment.user.name}
//                         className="w-full h-full object-cover rounded-full"
//                       />
//                     ) : (
//                       <svg
//                         viewBox="0 0 80 80"
//                         fill="none"
//                         className="w-full h-full"
//                       >
//                         <circle cx="40" cy="40" r="40" fill="#E5E7EB" />
//                         <path
//                           d="M40 40C45.5228 40 50 35.5228 50 30C50 24.4772 45.5228 20 40 20C34.4772 20 30 24.4772 30 30C30 35.5228 34.4772 40 40 40Z"
//                           fill="#9CA3AF"
//                         />
//                         <path
//                           d="M40 44C30.06 44 22 52.06 22 62C22 63.1046 22.8954 64 24 64H56C57.1046 64 58 63.1046 58 62C58 52.06 49.94 44 40 44Z"
//                           fill="#9CA3AF"
//                         />
//                         <path
//                           d="M56 30C56 35.5228 51.5228 40 46 40C40.4772 40 36 35.5228 36 30C36 24.4772 40.4772 20 46 20C51.5228 20 56 24.4772 56 30Z"
//                           fill="#6B7280"
//                         />
//                         <path
//                           d="M46 44C56.94 44 65 52.06 65 62C65 63.1046 64.1046 64 63 64H56C54.8954 64 54 63.1046 54 62C54 56.4772 50.5228 52 46 52C41.4772 52 38 56.4772 38 62C38 63.1046 37.1046 64 36 64H29C27.8954 64 27 63.1046 27 62C27 52.06 35.06 44 46 44Z"
//                           fill="#6B7280"
//                         />
//                       </svg>
//                     )}
//                   </Avatar>
//                   <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg max-w-[90%]">
//                     <div className="font-semibold text-xs">
//                       {comment.user.name}
//                     </div>
//                     <div className="text-sm">{comment.content}</div>
//                     <div className="text-xs text-gray-500 mt-1">
//                       {GetRelativeTime(comment.created_at)}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             {/* Scroll to bottom of the comment list */}
//             <div ref={commentsEndRef}></div>
//           </div>
//         </div>
//         {/* Fixed Comment Form */}
//         <form
//           onSubmit={handleSubmitComment}
//           className="flex gap-2 mt-3  bg-[#28242c] py-2 px-5"
//         >
//           <Avatar className="w-8 h-8">
//             {state.user.image_profile_url ? <img
//               src={state.user.image_profile_url}
//               alt="Your avatar"
//               className="w-full h-full object-cover rounded-full"
//             /> : <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
//               <circle cx="40" cy="40" r="40" fill="#E5E7EB" />
//               <path
//                 d="M40 40C45.5228 40 50 35.5228 50 30C50 24.4772 45.5228 20 40 20C34.4772 20 30 24.4772 30 30C30 35.5228 34.4772 40 40 40Z"
//                 fill="#9CA3AF"
//               />
//               <path
//                 d="M40 44C30.06 44 22 52.06 22 62C22 63.1046 22.8954 64 24 64H56C57.1046 64 58 63.1046 58 62C58 52.06 49.94 44 40 44Z"
//                 fill="#9CA3AF"
//               />
//               <path
//                 d="M56 30C56 35.5228 51.5228 40 46 40C40.4772 40 36 35.5228 36 30C36 24.4772 40.4772 20 46 20C51.5228 20 56 24.4772 56 30Z"
//                 fill="#6B7280"
//               />
//               <path
//                 d="M46 44C56.94 44 65 52.06 65 62C65 63.1046 64.1046 64 63 64H56C54.8954 64 54 63.1046 54 62C54 56.4772 50.5228 52 46 52C41.4772 52 38 56.4772 38 62C38 63.1046 37.1046 64 36 64H29C27.8954 64 27 63.1046 27 62C27 52.06 35.06 44 46 44Z"
//                 fill="#6B7280"
//               />
//             </svg>}
//           </Avatar>
//           <div className="flex-1 flex">
//             <Input
//               className="flex-1 rounded-full bg-gray-100 dark:bg-gray-700"
//               placeholder="Write a comment..."
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//             />
//             <Button
//               type="submit"
//               variant="ghost"
//               className="ml-2 p-2 text-white"
//             >
//               <Send className="h-4 w-4" />
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CommentsSection;
"use client";

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Send, X, MessageCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import "../../../style/globale.css";
import GetRelativeTime from "./GetRelativeTimes";
import { useDispatch, useSelector } from "react-redux";

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
        const respons = await fetch(`/api/comment/${postId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${state.access_token}`,
          },
        });
        const res = await respons.json();
        setComments(res);
      } catch (error) {
        console.error("Erreur lors du chargement des commentaires:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [postId, state.access_token]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const StorComment = async () => {
      try {
        const respones = await fetch("/api/storComment", {
          method: "POST",
          body: JSON.stringify({ content: newComment, post_id: postId }),
          headers: {
            Authorization: `Bearer ${state.access_token}`,
          },
        });
        const res = await respones.json();
        setComments((prev) => [...prev, res.comment]);
        dispatchEvent({
          type: "update_comments",
          payload: { idPost: postId, response: res.comments },
        });
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
                Commentaires
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
              ? "Chargement des commentaires..."
              : `${Comments.length} ${
                  Comments.length === 1 ? "commentaire" : "commentaires"
                }`}
          </p>
        </div>

        {/* Comments List */}
        <div className="h-[60vh] overflow-y-auto px-6 py-4">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full border-4 border-neutral-200 dark:border-neutral-700 border-t-neutral-900 dark:border-t-white animate-spin mb-4"></div>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                Chargement des commentaires...
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
              <p>Aucun commentaire pour le moment</p>
              <p className="text-sm mt-2">Soyez le premier à commenter</p>
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
              {state.user.image_profile_url ? (
                <img
                  src={state.user.image_profile_url || "/placeholder.svg"}
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
                    {state.user.name
                      ? state.user.name.charAt(0).toUpperCase()
                      : "U"}
                  </span>
                </div>
              )}
            </Avatar>
            <div className="flex-1 flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-full pr-2">
              <Input
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-neutral-900 dark:text-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
                placeholder="Écrire un commentaire..."
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
