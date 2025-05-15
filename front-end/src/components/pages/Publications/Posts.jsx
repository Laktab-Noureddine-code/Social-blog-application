import { useEffect, useState } from "react";
import { MoreHorizontal, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import LikeButton from "../../Accueil Page/components/ButtonLike";
import CommentsSection from "../../Accueil Page/components/CommantsSections";
import MediaGallery from "../../Accueil Page/components/MediaGallery";
import { MessageSquare } from "lucide-react";
import TopPost from "./TopPost";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import GetRelativeTime from "../../Accueil Page/components/GetRelativeTimes";
import LikesSection from "../../Accueil Page/components/LikessSection";
import Unknown from "../../Accueil Page/components/Unknown";
import { Link } from "react-router-dom";
import { NewPosts, updateLikes, uploadPosts } from "../../../Redux/PostsSilce";



export default function Posts() {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatchEvent = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [CommentsIdPost, setCommentsIdPost] = useState(null);
  const [LikessIdPost, setLikessIdPost] = useState([]);
  // const [animatingLike, setanimatingLike] = useState(false);
  const [animatingLikes, setAnimatingLikes] = useState({});
  // const F = useLocation()
  
  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("/api/posts", {
            headers: {
              Authorization: `Bearer ${state.access_token}`,
            },
          });

          if (!response.ok) {
            console.error("Unauthorized:", response.status);
            return;
          }

          const PostData = await response.json();
          dispatchEvent(uploadPosts(PostData))
          dispatchEvent(NewPosts(false));

        } catch (err) {
          console.error("Error fetching user:", err);
        }
      };
      fetchData();
    
  }, [state.access_token, dispatchEvent]);
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
          Authorization: `Bearer ${state.access_token}`,
        },
      });
      const res = await respons.json();

      dispatchEvent(updateLikes({ idPost: postId, response: res }));
    };
    fetchData();
    //  setanimatingLike(true);
    //  setTimeout(() => setanimatingLike(false), 500);
    setAnimatingLikes((prev) => ({ ...prev, [postId]: true }));
    setTimeout(() => {
      setAnimatingLikes((prev) => ({ ...prev, [postId]: false }));
    }, 500);
  };
  const toggleSHowLikes = (postId) => {
    setShowLikes((prev) => !prev);
    setLikessIdPost(postId);
  };
  const handleShare = (title,id) => {
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
    <div className="w-full max-w-2xl max-md:mx-auto px-1 sm:px-2 ">
      <TopPost />
      {/* Posts feed */}
      {state.posts &&
        state.posts.length > 0 &&
        state.posts.map((post) => (
          <Card
            key={post.id}
            className="mb-4 overflow-hidden"
            id={`post-${post.id}`}
          >
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-2">
                  <Avatar className="w-10 h-10">
                    <Link
                      to={`/profile/${post.user.id}`}
                      className="w-full h-full"
                    >
                      {post.user.image_profile_url ? (
                        <img
                          src={post.user.image_profile_url}
                          alt="Your profile"
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <Unknown />
                      )}
                    </Link>
                  </Avatar>
                  <div>
                    <div className="font-medium">{post.user.name}</div>
                    <div className="text-xs text-gray-500">
                      {GetRelativeTime(post.created_at)}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full h-8 w-8 p-0"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

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
                // animatingLike={animatingLike}
                animatingLike={!!animatingLikes[post.id]}
                isLiked={
                  post.likes.length > 0
                    ? post.likes.some((item) => item.user_id === state.user.id)
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
                toggleComments={() => toggleComments()}
              />
            )}
            {showLikes && (
              <LikesSection
                postId={LikessIdPost}
                toggleSHowLikes={() => toggleSHowLikes(false)}
              />
            )}
          </Card>
        ))}
    </div>
  );
}
