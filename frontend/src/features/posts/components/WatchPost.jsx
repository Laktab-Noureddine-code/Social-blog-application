/* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */

import { MoreHorizontal, Share } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Avatar } from "@/shared/ui/avatar";
import { Separator } from "@/shared/ui/separator";
import LikeButton from "@/features/home/components/ButtonLike";
import CommentButton from "@/features/home/components/CommentButton";
import CommentsSection from "@/features/home/components/CommantsSections";
import MediaGallery from "@/features/home/components/MediaGallery";
import MediaViewer from "@/features/home/components/MediaViwe";
import { PostsList } from "../../../data/videosdata";
import { MapPin, SmilePlus, Link2, Images } from "lucide-react";
import { useState } from "react";
function WatchPost() {
  const [posts, setPosts] = useState(PostsList);

  const [activePost, setActivePost] = useState(null); // To track the active post

  const [newPostText, setNewPostText] = useState("");

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

  return (
    <div className="w-full max-w-2xl max-md:mx-auto px-2 sm:px-0">
      {/* Post creation area */}
      <Card className="mb-4 p-4">
        <form className="flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-8 h-8">
              <img
                src="/images/img2.jpg"
                alt="Your profile"
                className="w-full h-full object-cover rounded-full"
              />
            </Avatar>
            <input
              type="text"
              placeholder="What's on your mind?"
              className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none"
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                type="button"
                className="text-gray-500"
              >
                <Images className="h-5 w-5 mr-2" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                type="button"
                className="text-gray-500"
              >
                <Link2 className="h-5 w-5 mr-2" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                type="button"
                className="text-gray-500 hidden sm:flex"
              >
                <MapPin className="h-5 w-5 mr-2" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                type="button"
                className="text-gray-500 hidden sm:flex"
              >
                <SmilePlus className="h-5 w-5 mr-2" />
              </Button>
            </div>
            <Button
              size="sm"
              type="submit"
              className="bg-blue-500 text-white rounded-full px-4"
            >
              Post
            </Button>
          </div>
        </form>
      </Card>

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
            <MediaGallery media={post.media} />

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
      {activePost && <MediaViewer post={activePost} posts={posts} />}
    </div>
  );
}

export default WatchPost;
