import { useEffect, useState } from "react";
import { Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LikeButton from "../../Accueil Page/components/ButtonLike";
import CommentsSection from "../../Accueil Page/components/CommantsSections";
import MediaGallery from "../../Accueil Page/components/MediaGallery";
import { MessageSquare } from "lucide-react";
import TopPost from "./TopPost";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LikesSection from "../../Accueil Page/components/LikessSection";
import { updateLikes } from "../../../Redux/PostsSilce";
import HeaderPost from "./HeaderPost";
import { HiddenPost } from "./ActionsPublication/HidePost";



 function ContainerPosts() {
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
       const respons = await fetch(`/api/likes/${postId}`, {
         method: "POST",
         body: JSON.stringify({ id: postId }),
         headers: {
           Authorization: `Bearer ${state.auth.access_token}`,
         },
       });
       const res = await respons.json();

       dispatchEvent(updateLikes( { idPost: postId, response: res }) );
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
     <div className="w-full max-w-2xl max-md:mx-auto px-1 sm:px-2 overflow-x-hidden">
       <TopPost />
       {/* Posts feed */}
       {state.posts.posts &&
         state.posts.posts.length > 0 &&
         state.posts.posts.map((post) =>
          post.hidden_by_users && post.hidden_by_users.some(
             (item) => item.id === state.auth.user.id
           ) ? (
             <HiddenPost key={post.id} post={post} />
           ) : (
             <Card
               key={post.id}
               className="mb-4"
              //  className="mb-4 overflow-hidden"
               id={`post-${post.id}`}
             >
               <div className="p-4">
                 <HeaderPost post={post} />
                 <p className="my-3 text-sm">{post.text}</p>
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
                   access_token={state.access_token}
                   toggleSHowLikes={() => toggleSHowLikes(post.id)}
                 />
               )}
             </Card>
           )
         )}
     </div>
   );
 }

export default ContainerPosts;