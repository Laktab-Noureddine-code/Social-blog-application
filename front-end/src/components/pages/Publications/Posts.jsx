// /* eslint-disable react/prop-types */
import { useState } from "react";
import { MoreHorizontal, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import LikeButton from "../../Accueil Page/components/ButtonLike";
import CommentButton from "../../Accueil Page/components/CommentButton";
import CommentsSection from "../../Accueil Page/components/CommantsSections";
import MediaGallery from "../../Accueil Page/components/MediaGallery";
import MediaViewer from "../../Accueil Page/components/MediaViwe";
import { PostsList } from "../../../data/data-post";
import { MapPin, SmilePlus, Link2, Images } from "lucide-react";
import TopPost from "./TopPost";
// import { TopPost } from "./TopPost";

export default function Posts() {
  const [posts, setPosts] = useState(PostsList);

  const [activePost, setActivePost] = useState(null); // To track the active post

  const [newPostText, setNewPostText] = useState("");
  const [activeImage, setActiveImage] = useState(null);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPostText.trim() === "") return;

    // Add new post logic would go here
    setNewPostText("");
  };

  const toggleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newLikedState = !post.likedByMe;
          return {
            ...post,
            likedByMe: newLikedState,
            likes: newLikedState ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      })
    );
  };

  const toggleComments = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            showComments: !post.showComments,
          };
        }
        return post;
      })
    );
  };
  const openMediaViewer = (postId, imageIndex) => {
    const post = posts.find((p) => p.id === postId); // Find the post by ID
    if (post) {
      setActivePost(post); // Set the active post
      setActiveImage({ imageIndex }); // Set the active image index
    }
  };

  // Close the image viewer
  const closeMediaViewer = () => {
    setActiveImage(null);
    setActivePost(null);
  };

  // Navigate to the previous image in the viewer
  const navigateToPrevImage = () => {
    if (activePost) {
      setActiveImage((prevState) => {
        const newIndex =
          prevState.imageIndex === 0
            ? activePost.media.length - 1
            : prevState.imageIndex - 1;
        return { imageIndex: newIndex };
      });
    }
  };

  // Navigate to the next image in the viewer
  const navigateToNextImage = () => {
    if (activePost) {
      setActiveImage((prevState) => {
        const newIndex =
          prevState.imageIndex === activePost.media.length - 1
            ? 0
            : prevState.imageIndex + 1;
        return { imageIndex: newIndex };
      });
    }
  };

  return (
    <div className="w-full max-w-2xl max-md:mx-auto px-1 sm:px-2 ">
     <TopPost />
      {/* Posts feed */}
      {posts.map((post) => (
        <Card key={post.id} className="mb-4 overflow-hidden">
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-2">
                <Avatar className="w-10 h-10">
                  <img
                    src={`/images/img${Math.floor(Math.random() * 12) + 1}.jpg`}
                    alt={post.author}
                    className="w-full h-full object-cover rounded-full"
                  />
                </Avatar>
                <div>
                  <div className="font-medium">
                    {post.author} {post.mood && `is ${post.mood}`}
                  </div>
                  <div className="text-xs text-gray-500">{post.timestamp}</div>
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

            <p className="my-3 text-sm">{post.content}</p>
            <MediaGallery
              media={post.media}
              onClick={(imageIndex) => openMediaViewer(post.id, imageIndex)}
            />

            <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
              <div>
                Liked <span className="font-medium">{post.likes}</span>
              </div>
              <div>
                {post.comments} comments • {post.shares} shares
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between p-2">
            <LikeButton
              likes={post.likes}
              isLiked={post.likedByMe}
              onLike={() => toggleLike(post.id)}
            />
            <CommentButton
              comments={post.comments}
              showComments={post.showComments}
              onToggleComments={() => toggleComments(post.id)}
            />
            <Button variant="ghost" className="flex-1 text-gray-600">
              <Share className="h-5 w-5 mr-2" /> Share
            </Button>
          </div>

          {post.showComments && (
            <CommentsSection
              postId={post.id}
              comments={post.commentsList}
              toggleComments={() => toggleComments(post.id)}
            />
          )}
        </Card>
      ))}

      {/* Affichage en plein écran des images */}
      {activeImage && activePost && (
        // <MediaViewer
        //   post={activePost}
        //   currentImageIndex={activeImage.imageIndex}
        //   onClose={closeMediaViewer}
        //   onPrev={navigateToPrevImage}
        //   onNext={navigateToNextImage}
        // />
        <MediaViewer
          post={activePost}
          currentImageIndex={activeImage.imageIndex}
          onClose={closeMediaViewer}
          onPrev={navigateToPrevImage}
          onNext={navigateToNextImage}
          posts={posts}
        />
      )}
    </div>
  );
}
