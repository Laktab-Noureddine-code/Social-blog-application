import { useEffect, useState } from "react";
import { MoreHorizontal, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import LikeButton from "../../Accueil Page/components/ButtonLike";
// import CommentButton from "../../Accueil Page/components/CommentButton";
import CommentsSection from "../../Accueil Page/components/CommantsSections";
import MediaGallery from "../../Accueil Page/components/MediaGallery";
import { MessageSquare } from "lucide-react";
import TopPost from "./TopPost";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GetRelativeTime from "../../Accueil Page/components/GetRelativeTimes";
import LikesSection from "../../Accueil Page/components/LikessSection";

export default function Posts() {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatchEvent = useDispatch();
  const [posts, setPosts] = useState([]);
  const [showComments,setShowComments] = useState(false)
  const [showLikes,setShowLikes] = useState(false)
  const [CommentsIdPost, setCommentsIdPost] = useState(null);
  const [LikessIdPost, setLikessIdPost] = useState([]);
  


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
        // dispatchEvent({ type: "upload_posts", payload: PostData });
        setPosts(PostData);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchData();
  }, [state.access_token, dispatchEvent]);
  // console.log(posts);
  
  const toggleComments = (postId) => {
    setShowComments(prev=>!prev)
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
      setPosts(prev => prev.map(post => {
        return post.id === postId ? { ...post, likes: res } : post;
      }))
    };
    fetchData();
    // setShowLikes((prev) => !prev);
  };
  const toggleSHowLikes = (postId) => {
     setShowLikes((prev) => !prev);
     setLikessIdPost(postId);
  };
  useEffect(() => {
    console.log("this is posts",posts);
  },[posts])


  return (
    <div className="w-full max-w-2xl max-md:mx-auto px-1 sm:px-2 ">
      <TopPost />
      {/* Posts feed */}
      {posts &&
        posts.length > 0 &&
        posts.map((post) => (
          <Card key={post.id} className="mb-4 overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-2">
                  <Avatar className="w-10 h-10">
                    <img
                      src={`/images/img${
                        Math.floor(Math.random() * 12) + 1
                      }.jpg`}
                      alt={post.user.name}
                      className="w-full h-full object-cover rounded-full"
                    />
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
                  navigate(`/post/${post.id}/${imageIndex}`);
                  // console.log("hello");
                }}
              />

              <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                <div>
                  <button
                    className="hover:underline cursor-pointer"
                    onClick={() => toggleSHowLikes(post.id)}
                  >
                    Liked{' '}
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
                isLiked={
                  post.likes.length > 0
                    ? post.likes.some((item) => item.user_id === state.user.id)
                    : false
                }
                className={``}
              />
              {/* <CommentButton
              comments={post.comments}
              showComments={post.showComments}
              onToggleComments={() => toggleComments(post.id)}
            /> */}
              <Button
                variant="ghost"
                className={`flex-1 ${
                  showComments ? "text-blue-500" : "text-gray-600"
                }`}
                onClick={() => toggleComments(post.id)}
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                {/* Comment {comments > 0 && `(${comments})`} */}
              </Button>
              <Button variant="ghost" className="flex-1 text-gray-600">
                <Share className="h-5 w-5 mr-2" /> Share
              </Button>
            </div>

            {showComments && (
              <CommentsSection
                postId={CommentsIdPost}
                access_token={state.access_token}
                toggleComments={() => toggleComments()}
                SetPosts={(res) => {
                  setPosts((prev) =>
                    prev.map((Post) => {
                      return Post.id === CommentsIdPost
                        ? { ...Post, comments: res }
                        : Post;
                    })
                  );
                }}
              />
            )}
            {showLikes && (
              <LikesSection
                postId={LikessIdPost}
                access_token={state.access_token}
                toggleSHowLikes={() => toggleSHowLikes()}
                SetPosts={(res) => {
                  setPosts((prev) =>
                    prev.map((Post) => {
                      return Post.id === LikessIdPost
                        ? { ...Post, likes: res }
                        : Post;
                    })
                  );
                }}
              />
            )}
          </Card>
        ))}
    </div>
  );
}
