





import { useState } from "react";
import { Share, MessageSquare } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import LikeButton from "@/features/home/components/ButtonLike";
import CommentsSection from "@/features/home/components/CommantsSections";
import MediaGallery from "@/features/home/components/MediaGallery";
import TopPost from "./TopPost";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LikesSection from "@/features/home/components/LikessSection";
import { updateLikes } from "@/Redux/PostsSilce";
import HeaderPost from "./HeaderPost";
import { HiddenPost } from "./actions/HidePost";
import SkeletonPost from "@/shared/components/skeletons/SkeletonPost";
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollToTop from "../../../Router/ScrolToTp";
import Text from "@/shared/helpers/Text";
import api from "@/lib/api";

export default function ContainerPosts({
  posts,
  loadMorePosts,
  hasMore,
  loading,
}) {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [commentsPostId, setCommentsPostId] = useState(null);
  const [showLikes, setShowLikes] = useState(false);
  const [likesPostId, setLikesPostId] = useState(null);
  const [animatingLikes, setAnimatingLikes] = useState({});
  // console.log()

  const toggleLike = async (postId) => {
    console.log(postId);
    try {
      const response = await api.post(`/api/likes/${postId}`, { id: postId });
      dispatch(updateLikes({ idPost: postId, response: response.data }));

      setAnimatingLikes((prev) => ({ ...prev, [postId]: true }));
      setTimeout(() => {
        setAnimatingLikes((prev) => ({ ...prev, [postId]: false }));
      }, 500);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const toggleComments = (postId) => {
    setShowComments((prev) => !prev);
    setCommentsPostId(postId);
  };

  const toggleShowLikes = (postId) => {
    setShowLikes((prev) => !prev);
    setLikesPostId(postId);
  };

  const handleShare = (title, id) => {
    if (navigator.share) {
      navigator.share({ title, url: `http://localhost:5173/post/${id}/0` });
    } else {
      navigator.clipboard
        .writeText(window.location.origin + `/post/${id}`)
        .then(() => alert("Link copied to clipboard!"))
        .catch(console.error);
    }
  };

  return (
    <div className="w-full max-w-2xl max-md:mx-auto px-1 sm:px-2 overflow-x-hidden">
      <ScrollToTop />
      <TopPost />

      {loading && state.posts.posts.length === 0 ? (
        <SkeletonPost />
      ) : (
        <InfiniteScroll
          dataLength={posts.length}
          next={loadMorePosts}
          hasMore={hasMore}
          loader={<SkeletonPost />}
          endMessage={
            <p className="text-center text-sm py-4 text-gray-500">
              There's always more to see.
            </p>
          }
          scrollThreshold={0.8}
        >
          {state.posts.posts.map((post) =>
            post.hidden_by_users?.some(
              (item) => item.id === state.auth.user.id
            ) ? (
              <HiddenPost key={post.id} post={post} />
            ) : (
              <Card key={post.id} className="mb-4" id={`post-${post.id}`}>
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
                    loading={loading}
                  />

                  <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                    <div>
                      <button
                        className="hover:underline cursor-pointer"
                        onClick={() => toggleShowLikes(post.id)}
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
                    isLiked={post.likes?.some(
                      (item) => item.user_id === state.auth.user.id
                    )}
                  />

                  <Button
                    variant="ghost"
                    className={`flex-1 ${
                      showComments && commentsPostId === post.id
                        ? "text-blue-500"
                        : "text-gray-600"
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

                {showComments && commentsPostId === post.id && (
                  <CommentsSection
                    postId={post.id}
                    toggleComments={() => setShowComments(false)}
                  />
                )}

                {showLikes && likesPostId === post.id && (
                  <LikesSection
                    postId={post.id}
                    toggleSHowLikes={() => setShowLikes(false)}
                  />
                )}
              </Card>
            )
          )}
        </InfiniteScroll>
      )}
    </div>
  );
}
