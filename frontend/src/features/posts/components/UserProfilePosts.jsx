/* eslint-disable react/prop-types */
// import { useState } from "react";
// import { MoreHorizontal, Share } from "lucide-react";
// import { Button } from "@/shared/ui/button";
// import { Card } from "@/shared/ui/card";
// import { Avatar } from "@/shared/ui/avatar";
// import { Separator } from "@/shared/ui/separator";
// import LikeButton from "@/features/home/components/ButtonLike";
// import CommentsSection from "@/features/home/components/CommantsSections";
// import MediaGallery from "@/features/home/components/MediaGallery";
// import { MessageSquare } from "lucide-react";
// import TopPost from "./TopPost";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import GetRelativeTime from "@/features/home/components/GetRelativeTimes";
// import LikesSection from "@/features/home/components/LikessSection";
// import { updateLikes } from "@/Redux/PostsSilce";



// export default function UserProfilePosts() {
//   const state = useSelector((state) => state);
//   const navigate = useNavigate();
//   const dispatchEvent = useDispatch();
//   const [showComments, setShowComments] = useState(false);
//   const [showLikes, setShowLikes] = useState(false);
//   const [CommentsIdPost, setCommentsIdPost] = useState(null);
//   const [LikessIdPost, setLikessIdPost] = useState([]);
//   const [animatingLikes, setAnimatingLikes] = useState({});
  
//   const toggleComments = (postId) => {
//     setShowComments((prev) => !prev);
//     setCommentsIdPost(postId);
//   };
//   const toggleLike = (postId) => {
//     const fetchData = async () => {
//       const respons = await fetch(`/api/likes/${postId}`, {
//         method: "POST",
//         body: JSON.stringify({ id: postId }),
//         headers: {
//           Authorization: `Bearer ${state.auth.access_token}`,
//         },
//       });
//       const res = await respons.json();

//       dispatchEvent(updateLikes({ idPost: postId, response: res }));
//     };
//     fetchData();
//     //  setanimatingLike(true);
//     //  setTimeout(() => setanimatingLike(false), 500);
//     setAnimatingLikes((prev) => ({ ...prev, [postId]: true }));
//     setTimeout(() => {
//       setAnimatingLikes((prev) => ({ ...prev, [postId]: false }));
//     }, 500);
//   };
//   const toggleSHowLikes = (postId) => {
//     setShowLikes((prev) => !prev);
//     setLikessIdPost(postId);
//   };
//   const handleShare = (title, id) => {
//     if (navigator.share) {
//       navigator
//         .share({
//           title: title,
//           url: `http://localhost:5173/post/${id}/0`,
//         })
//         .catch(console.error);
//     } else {
//       navigator.clipboard
//         .writeText(window.location.origin + `/blog/${id}`)
//         .then(() => alert("Link copied to clipboard!"))
//         .catch(console.error);
//     }
//   };

//   return (
//     <div className="w-full max-w-2xl max-md:mx-auto px-1 sm:px-2 ">
//       <TopPost type="user" />
//       {/* Posts feed */}
//       {state.posts.posts &&
//         state.posts.posts.length > 0 &&
//         state.posts.posts.map((post) => (
//           <Card
//             key={post.id}
//             className="mb-4 overflow-hidden"
//             id={`post-${post.id}`}
//           >
//             <div className="p-4">
//               <div className="flex justify-between items-start">
//                 <div className="flex gap-2">
//                   {/* <Avatar className="w-10 h-10">
//                     {post.user.image_profile_url ? (
//                       <img
//                         src={post.user.image_profile_url}
//                         alt="Your profile"
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
//                   </Avatar> */}
//                   <div>
//                     <div className="font-medium">{post.user.name}</div>
//                     <div className="text-xs text-gray-500">
//                       {GetRelativeTime(post.created_at)}
//                     </div>
//                   </div>
//                 </div>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="rounded-full h-8 w-8 p-0"
//                 >
//                   <MoreHorizontal className="h-4 w-4" />
//                 </Button>
//               </div>

//               <p className="my-3 text-sm">{post.text}</p>
//               <MediaGallery
//                 media={post.medias}
//                 onClick={(imageIndex) => {
//                   navigate(`/post/${post.id}/${imageIndex}`, {
//                     state: { fromPostId: post.id },
//                   });
//                 }}
//               />

//               <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
//                 <div>
//                   <button
//                     className="hover:underline cursor-pointer"
//                     onClick={() => toggleSHowLikes(post.id)}
//                   >
//                     Liked{" "}
//                     <span className="font-medium">{post.likes.length}</span>
//                   </button>
//                 </div>
//                 <div>
//                   <button
//                     className="hover:underline cursor-pointer"
//                     onClick={() => toggleComments(post.id)}
//                   >
//                     {post.comments.length} comments
//                   </button>{" "}
//                   • {post.shares} shares
//                 </div>
//               </div>
//             </div>

//             <Separator />

//             <div className="flex justify-between p-2">
//               <LikeButton
//                 onLike={() => toggleLike(post.id)}
//                 postId={post.id}
//                 // animatingLike={animatingLike}
//                 animatingLike={!!animatingLikes[post.id]}
//                 isLiked={
//                   post.likes.length > 0
//                     ? post.likes.some(
//                         (item) => item.user_id === state.auth.user.id
//                       )
//                     : false
//                 }
//               />
//               <Button
//                 variant="ghost"
//                 className={`flex-1 ${
//                   showComments ? "text-blue-500" : "text-gray-600"
//                 }`}
//                 onClick={() => toggleComments(post.id)}
//               >
//                 <MessageSquare className="h-5 w-5 mr-2" />
//                 Comment{" "}
//                 {post.comments.length > 0 && `(${post.comments.length})`}
//               </Button>
//               <Button
//                 variant="ghost"
//                 className="flex-1 text-gray-600"
//                 onClick={() => handleShare(post.text, post.id)}
//               >
//                 <Share className="h-5 w-5 mr-2" /> Share
//               </Button>
//             </div>

//             {showComments && (
//               <CommentsSection
//                 postId={CommentsIdPost}
//                 toggleComments={() => toggleComments()}
//               />
//             )}
//             {showLikes && (
//               <LikesSection
//                 postId={LikessIdPost}
//                 access_token={state.auth.access_token}
//                 toggleSHowLikes={() => toggleSHowLikes()}
//               />
//             )}
//           </Card>
//         ))}
//     </div>
//   );
// }



import { useState } from "react";
import { Share } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import LikeButton from "@/features/home/components/ButtonLike";
import CommentsSection from "@/features/home/components/CommantsSections";
import MediaGallery from "@/features/home/components/MediaGallery";
import { MessageSquare } from "lucide-react";
import TopPost from "./TopPost";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LikesSection from "@/features/home/components/LikessSection";
import { updateLikes } from "@/Redux/PostsSilce";
import HeaderPost from "./HeaderPost";
import Text from "@/shared/helpers/Text";
import api from "@/lib/api";



 function UserProfilePosts({id}) {
   const state = useSelector((state) => state);
   const navigate = useNavigate();
   const dispatchEvent = useDispatch();
   const [showComments, setShowComments] = useState(false);
   const [showLikes, setShowLikes] = useState(false);
   const [CommentsIdPost, setCommentsIdPost] = useState(null);
   const [LikessIdPost, setLikessIdPost] = useState([]);
   const [animatingLikes, setAnimatingLikes] = useState({});
   const toggleComments = (postId) => {
     setShowComments((prev) => !prev);
     setCommentsIdPost(postId);
   };
   const toggleLike = (postId) => {
     const fetchData = async () => {
       try {
         const response = await api.post(`/api/likes/${postId}`, { id: postId });
         dispatchEvent(updateLikes({ idPost: postId, response: response.data }));
       } catch (error) {
         console.error("Error toggling like:", error);
       }
     };
     fetchData();
     setAnimatingLikes((prev) => ({ ...prev, [postId]: true }));
     setTimeout(() => {
       setAnimatingLikes((prev) => ({ ...prev, [postId]: false }));
     }, 500);
   };
   const toggleSHowLikes = (postId) => {
       setShowLikes((prev) => !prev);
       if (postId !== null) setLikessIdPost(postId);
    //  setShowLikes((prev) => !prev);
    //  setLikessIdPost(postId);
   };
   const handleShare = (title, id) => {
     if (navigator.share) {
       navigator
         .share({
           title: title,
           url: `http://localhost:5173/post/${id}/0`,
         })
         .catch(console.error);
     } else {
       navigator.clipboard
         .writeText(window.location.origin + `/blog/${id}`)
         .then(() => alert("Link copied to clipboard!"))
         .catch(console.error);
     }
   };

   return (
     <div
       className="w-full max-w-2xl max-md:mx-auto px-1 sm:px-2 "
       //  style={{ overflowX: "hidden" }}
     >
       {state.profile.user.id === state.auth.user.id && <TopPost />}

       {/* Posts feed */}
       {state.posts.posts &&
         state.posts.posts.length > 0 &&
         state.posts.posts.map((post) => (
           <Card key={post.id} className="mb-4 " id={`post-${post.id}`}>
             <div className="p-4">
               <HeaderPost post={post} />
               <Text text={post.text} />
               {/* <p className="my-3 text-sm">{post.text}</p> */}
               <MediaGallery
                 media={post.medias}
                 onClick={(imageIndex) => {
                   navigate(`/post/${post.id}/${imageIndex}`, {
                     state: { fromPostId: post.id },
                   });
                 }}
               />
               <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                 <div>
                   <button
                     className="hover:underline cursor-pointer"
                     onClick={() => toggleSHowLikes(post.id)}
                   >
                     Liked{" "}
                     <span className="font-medium">{post.likes.length}</span>
                   </button>
                 </div>
                 <div>
                   <button
                     className="hover:underline cursor-pointer"
                     onClick={() => toggleComments(post.id)}
                   >
                     {post.comments.length} comments
                   </button>{" "}
                   • {post.shares} shares
                 </div>
               </div>
             </div>

             <Separator />

             <div className="flex justify-between p-2">
               <LikeButton
                 onLike={() => toggleLike(post.id)}
                 postId={post.id}
                 animatingLike={!!animatingLikes[post.id]}
                 isLiked={
                   post.likes.length > 0
                     ? post.likes.some(
                         (item) => item.user_id === state.auth.user.id
                       )
                     : false
                 }
               />
               <Button
                 variant="ghost"
                 className={`flex-1 ${
                   showComments ? "text-blue-500" : "text-gray-600"
                 }`}
                 onClick={() => toggleComments(post.id)}
               >
                 <MessageSquare className="h-5 w-5 mr-2" />
                 Comment{" "}
                 {post.comments.length > 0 && `(${post.comments.length})`}
               </Button>
               <Button
                 variant="ghost"
                 className="flex-1 text-gray-600"
                 onClick={() => handleShare(post.text, post.id)}
               >
                 <Share className="h-5 w-5 mr-2" /> Share
               </Button>
             </div>

             {showComments && (
               <CommentsSection
                 postId={CommentsIdPost}
                 toggleComments={toggleComments}
               />
             )}
             {showLikes && (
               <LikesSection
                 postId={LikessIdPost}
                 toggleSHowLikes={() => toggleSHowLikes(post.id)}
               />
             )}
           </Card>
         ))}
     </div>
   );
 }

export default UserProfilePosts;
