// /* eslint-disable react/prop-types */
import { ChevronLeft, ChevronRight, Share, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
// import CommentsSectionViwe from "../components/CommentsSectionViwe";
import LikeButton from "./ButtonLike";
// import CommentButton from "./CommentButton";
// import CommentsSection from "./CommantsSections";
import Video from "./Video";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CommentsSectionViwe from "./CommentsSectionViwe";
import GetRelativeTime from "./GetRelativeTimes";
import { HashLink } from "react-router-hash-link";
import { updateLikes } from "../../../Redux/PostsSilce";
function MediaView() {
  const { id,index } = useParams();
    const state = useSelector((state) => state);
    const [post, setPost] = useState(null);
     const [activeMedia, setActiveMedia] = useState(null);
  const [mediaIndex, setMediaIndex] = useState(+index);
  const dispatchEvent = useDispatch()
  const [totalMedias, setTotalMedias] = useState();
    useEffect(() => {
      setMediaIndex(+index);
      setActiveMedia({ mediaIndex });
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/post/${id}`, {
            method: "get",
            //   body: { id: id },
            headers: {
              Authorization: `Bearer ${state.access_token}`,
            },
          });
          const data = await response.json();
          setPost(data);
          setTotalMedias(data.medias.length);
        } catch (err) {
          console.error("Error fetching post:", err);
        }
      };
      fetchData();
    }, [id, state.access_token, mediaIndex, index]);
  useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
          document.body.style.overflow = "auto";
        };
  }, []);
    // const totalMedias = post.post_medias.length;

    const navigateToPrevImage = () => {
      if (post) {
        setActiveMedia((prevState) => {
          const newIndex =
            prevState.mediaIndex === 0
              ? post.medias.length - 1
              : prevState.mediaIndex - 1;
          return { mediaIndex: newIndex };
        });
      }
    };

    // Navigate to the next image in the viewer
    const navigateToNextImage = () => {
      if (post) {
        setActiveMedia((prevState) => {
          const newIndex =
            prevState.mediaIndex === post.medias.length - 1
              ? 0
              : prevState.mediaIndex + 1;
          return { mediaIndex: newIndex };
        });
      }
    };
//   const toggleComments = (idPost) => {
//     const Post = posts.find((p) => p.id === idPost);
//     Post.showComments = !Post.showComments;
  //   };
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
      setPost((prev) => { return { ...prev, likes: res } }  );
    };
    fetchData();
    // setShowLikes((prev) => !prev);
  };
  // const toggleSHowLikes = (postId) => {
  //   setShowLikes((prev) => !prev);
  //   setLikessIdPost(postId);
  // };
  // useEffect(() => {
  // }, [post]);
  return (
    post && (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col md:flex-row">
        {/* Close Button */}
        {/* <Link
          to="/accueil"
          variant="ghost"
          className="absolute top-4 right-4 text-white p-1 rounded-full z-20 hover:bg-gray-300"
        >
          <X className="h-8 w-8 text-gray-600" />
        </Link> */}
        {/* <button
          className="absolute top-4 right-4 text-white p-1 rounded-full z-20 hover:bg-gray-300"
          onClick={() =>
            navigate(`/accueil/#post-${id}`)
          }
        >
          Go Back
        </button> */}
        <HashLink
          // smooth
          to={`/accueil#post-${id}`}
          className="absolute top-4 right-4 text-white p-1 rounded-full z-20 hover:bg-gray-300"
        >
          <X className="h-8 w-8 text-gray-600" />
        </HashLink>

        {/* Main Image/Video Section */}
        <div className="flex-1 flex items-center justify-center relative p-4 h-1/2 md:h-full">
          {totalMedias > 1 && (
            <Button
              variant="ghost"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-1 rounded-full z-20"
              onClick={navigateToPrevImage}
            >
              <ChevronLeft className="h-8 w-8 " />
            </Button>
          )}

          {post.medias[activeMedia.mediaIndex].type
            .toString()
            .includes("image") ? (
            <img
              src={post.medias[activeMedia.mediaIndex].url}
              alt={`Post image ${activeMedia.mediaIndex + 1}`}
              className="max-h-full max-w-full object-contain w-full"
            />
          ) : (
            <div className="w-full h-96 cursor-pointer flex justify-center items-center">
              <Video
                videoUrl={post.medias[activeMedia.mediaIndex].url}
                showVideo={true}
              />
            </div>
          )}

          {totalMedias > 1 && (
            <Button
              variant="ghost"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-1 rounded-full z-20"
              onClick={navigateToNextImage}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          )}

          {/* Image Indicator */}
          {totalMedias > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white z-20">
              {activeMedia.mediaIndex + 1} / {totalMedias}
            </div>
          )}
        </div>

        {/* Post Information Panel */}
        <div className="bg-white dark:bg-gray-800 w-full md:w-96 flex flex-col h-1/2 md:h-full overflow-y-auto">
          {/* Author Info */}
          <div className="p-4 border-b">
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10">
                {post.user.image_profile_url ? (
                  <img
                    src={post.user.image_profile_url}
                    alt={post.user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <svg
                    viewBox="0 0 80 80"
                    fill="none"
                    className="w-full h-full"
                  >
                    <circle cx="40" cy="40" r="40" fill="#E5E7EB" />
                    <path
                      d="M40 40C45.5228 40 50 35.5228 50 30C50 24.4772 45.5228 20 40 20C34.4772 20 30 24.4772 30 30C30 35.5228 34.4772 40 40 40Z"
                      fill="#9CA3AF"
                    />
                    <path
                      d="M40 44C30.06 44 22 52.06 22 62C22 63.1046 22.8954 64 24 64H56C57.1046 64 58 63.1046 58 62C58 52.06 49.94 44 40 44Z"
                      fill="#9CA3AF"
                    />
                    <path
                      d="M56 30C56 35.5228 51.5228 40 46 40C40.4772 40 36 35.5228 36 30C36 24.4772 40.4772 20 46 20C51.5228 20 56 24.4772 56 30Z"
                      fill="#6B7280"
                    />
                    <path
                      d="M46 44C56.94 44 65 52.06 65 62C65 63.1046 64.1046 64 63 64H56C54.8954 64 54 63.1046 54 62C54 56.4772 50.5228 52 46 52C41.4772 52 38 56.4772 38 62C38 63.1046 37.1046 64 36 64H29C27.8954 64 27 63.1046 27 62C27 52.06 35.06 44 46 44Z"
                      fill="#6B7280"
                    />
                  </svg>
                )}
              </Avatar>
              <div>
                <div className="font-medium">{post.user.name}</div>
                <div className="text-xs text-gray-500">
                  {GetRelativeTime(post.created_at)}
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm">{post.content}</p>
          </div>

          {/* Action Buttons */}
          <div className="border-b">
            <div className="flex justify-between p-2">
              <LikeButton
                postId={id}
                isLiked={
                  post.likes.length > 0
                    ? post.likes.some((item) => item.user_id === state.user.id)
                    : false
                }
                likes={post.likes}
                onLike={() => {
                  toggleLike(id);
                }}
              />
              {/* <CommentButton
              comments={post.comments}
              showComments={post.showComments}
              onToggleComments={() => {
                toggleComments(post.id);
              }}
            /> */}
              {post.showComments &&
                //   <CommentsSection
                //     postId={post.id}
                //     comments={post.commentsList}
                //     toggleComments={() => toggleComments(post.id)}
                //   />
                "this is comment section"}
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
          <div className="flex-1 transform-translate-y-1/2 w-full">
            <CommentsSectionViwe
              postId={id}
              SetPost={(comment) =>
                setPost((prev) => {
                  return { ...prev, comment: comment };
                })
              }
            />
            {/* absolute top-[23%] max-md:  */}
          </div>
        </div>
      </div>
    )
  );
}

export default MediaView;
