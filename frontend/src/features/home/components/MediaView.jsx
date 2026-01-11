import { ChevronLeft, ChevronRight, Share, ArrowBigLeftDash, ImageOff } from "lucide-react";
import { Button } from "@/shared/ui/button";
import LikeButton from "./ButtonLike";
import Video from "./Video";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import CommentsSectionViwe from "./CommentsSectionViwe";
import { HashLink } from "react-router-hash-link";
import { updateLikes } from "@/Redux/PostsSilce";
import HeaderPost from "@/features/posts/components/HeaderPost";
import SkeletonShowPost from "@/shared/components/skeletons/SkeletonShowPost";

function MediaView() {
  const { id, index } = useParams();
  const state = useSelector((state) => state);
  const [post, setPost] = useState(null);
  const [activeMedia, setActiveMedia] = useState(+index || 0);
  const dispatchEvent = useDispatch();
  const [totalMedias, setTotalMedias] = useState(0);
  const [loading, setLoading] = useState(true);
  const path = state.auth.path;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/post/${id}`);
        const data = response.data;
        setPost(data);
        setTotalMedias(data.medias?.length || 0);
        setActiveMedia(Math.min(+index, (data.medias?.length || 1) - 1));
      } catch (err) {
        console.error("Error fetching post:", err);
        // toast.error("Failed to load post");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, index]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const navigateToPrevMedia = () => {
    setActiveMedia((prev) => (prev === 0 ? totalMedias - 1 : prev - 1));
  };

  const navigateToNextMedia = () => {
    setActiveMedia((prev) => (prev === totalMedias - 1 ? 0 : prev + 1));
  };

  const toggleLike = (postId) => {
    const fetchData = async () => {
      try {
        const response = await api.post(`/api/likes/${postId}`, { id: postId });
        const res = response.data;
        dispatchEvent(updateLikes({ idPost: postId, response: res }));
        setPost((prev) => ({ ...prev, likes: res }));
      } catch (error) {
        console.error("Error toggling like:", error);
      }
    };
    fetchData();
  };

  if (loading) return <SkeletonShowPost />;

  if (!post) return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="text-white text-center">
        <p>Post not found</p>
        <Button onClick={() => navigate(-1)} className="mt-4">
            Go Back
        </Button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col md:flex-row">
      {/* Back Button */}
      {path && path.toString().includes("/feed") ? (
        <HashLink
          to={`/feed#post-${id}`}
          className="absolute top-4 left-4 text-white p-1 rounded-full z-20 hover:bg-gray-300"
        >
          <ArrowBigLeftDash className="h-8 w-8 text-gray-600" />
        </HashLink>
      ) : (
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-white p-1 rounded-full z-20 hover:bg-gray-300"
        >
          <ArrowBigLeftDash className="h-8 w-8 text-gray-600" />
        </button>
      )}

      {/* Main Media Section */}
      <div className="flex-1 flex items-center justify-center relative p-4 h-1/2 md:h-full">
        {totalMedias > 0 ? (
          <>
            {totalMedias > 1 && (
              <Button
                variant="ghost"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-1 rounded-full z-20"
                onClick={navigateToPrevMedia}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            )}

            {post.medias[activeMedia]?.type.includes("image") ? (
              <img
                src={post.medias[activeMedia].url}
                alt={`Post media ${activeMedia + 1}`}
                className="max-h-full max-w-full object-contain w-full"
              />
            ) : (
              <div className="w-full h-96 cursor-pointer flex justify-center items-center">
                <Video
                  videoUrl={post.medias[activeMedia].url}
                  showVideo={true}
                />
              </div>
            )}

            {totalMedias > 1 && (
              <Button
                variant="ghost"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-1 rounded-full z-20"
                onClick={navigateToNextMedia}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            )}

            {/* Media Indicator */}
            {totalMedias > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white z-20">
                {activeMedia + 1} / {totalMedias}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-white">
            <ImageOff className="h-16 w-16 mb-4" />
            <p className="text-xl">No media available</p>
          </div>
        )}
      </div>

      {/* Post Information Panel (only show if there's a post) */}
      {post && (
        <div className="bg-white dark:bg-gray-800 w-full md:w-96 flex flex-col h-1/2 md:h-full overflow-y-auto">
          {/* Author Info */}
          <div className="p-4 border-b">
            <HeaderPost post={post} />
            <p className="mt-3 text-sm">{post.content}</p>
          </div>

          {/* Action Buttons */}
          <div className="border-b">
            <div className="flex justify-between p-2">
              <LikeButton
                postId={id}
                isLiked={post.likes?.some(item => item.user_id === state.auth.user.id)}
                likes={post.likes || []}
                onLike={() => toggleLike(id)}
              />
              <Button variant="ghost" className="flex-1">
                <Share className="h-5 w-5 mr-2" /> Share
              </Button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="flex-1 w-full">
            <CommentsSectionViwe
              postId={id}
              SetPost={(comment) =>
                setPost((prev) => ({ ...prev, comment }))
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MediaView;