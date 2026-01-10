/* eslint-disable react/prop-types */

import GetRelativeTime from "@/features/home/components/GetRelativeTimes";
import Unknown from "@/features/home/components/Unknown";

import { Avatar } from "@/shared/ui/avatar";
import { Link } from "react-router-dom";

import MenuBublication from "./MenuPublication";
import { capitalizeEachWord } from "@/shared/helpers/helper";
import { useSelector } from "react-redux";

function HeaderPost({ post }) {
  const state = useSelector((state) => state);
  //  const userMembership = state.groups.currentGroup.members?.find(
  //    (m) => m.id === state.auth.user?.id
  // )?.pivot;
  // console.log("userMembership", userMembership);
  // const isAdmin = userMembership?.role === "admin";
  console.log('this ',state)
  const renderHeader = () => {
    if (post.type === "user" && post.user) {
      return (
        <div className="flex gap-2">
          <Avatar className="w-10 h-10">
            <Link to={`/profile/${post.user.id}`} className="w-full h-full">
              {post.user.image_profile_url ? (
                <img
                  src={post.user.image_profile_url}
                  alt="User profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <Unknown />
              )}
            </Link>
          </Avatar>
          <div>
            <Link to={`/profile/${post.user.id}`} className="font-medium hover:underline">
              {capitalizeEachWord(post.user.name)}
              {/* {post.user.name} */}
            </Link>
            <div className="text-xs text-gray-500">
              {GetRelativeTime(post.created_at)}
            </div>
          </div>
        </div>
      );
    } else if (post.type === "page" && post.page) {
      return (
        <div className="flex gap-2">
          <Avatar className="w-10 h-10">
            <Link to={`/page/${post.page.id}`} className="w-full h-full">
              {post.page.profile_image_url ? (
                <img
                  src={post.page.profile_image_url}
                  alt="Page logo"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <Unknown />
              )}
            </Link>
          </Avatar>
          <div>
            <Link
              to={`/profile/${post.page.id}`}
              className="font-medium hover:underline"
            >
              {capitalizeEachWord(post.page.name)}
            </Link>
            <div className="text-xs text-gray-500">
              {GetRelativeTime(post.created_at)}
            </div>
          </div>
        </div>
      );
    } else if (post.type === "group" && post.group) {
      return (
        <div className="flex items-center gap-3 w-full">
          {/* Left side - Images (profile and cover) */}
          <div className="relative">
            {/* Cover image in background */}
            <div className="w-12 h-12 rounded-lg overflow-hidden">
              <Link to={`/group/${post.group.id}`}>
                <img
                  src={
                    post.group?.cover_image ||
                    "/placeholder.svg?height=56&width=56"
                  }
                  alt="Group cover"
                  className="w-full h-full object-cover"
                />
              </Link>
            </div>

            {/* Profile image in foreground */}
            <div className="absolute top-4 left-4 w-10 h-10 rounded-full overflow-hidden border-2 border-white">
              <Link to={`/profile/${post.user.id}`} className="w-full h-full">
                {post.user.image_profile_url ? (
                  <img
                    src={post.user.image_profile_url || "/placeholder.svg"}
                    alt="User profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Unknown />
                )}
              </Link>
            </div>
          </div>

          {/* Right side - Text content */}
          <div className="flex flex-col">
            {/* Group name (larger) */}
            <Link
              to={`/group/${post.group?.id || "#"}`}
              className="text-lg font-medium"
            >
              {post.group?.name}
            </Link>

            {/* Username (smaller) with dot separator */}
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <span>•</span>
              <Link
                to={`/profile/${post.user.name}`}
                className="hover:underline"
              >
                {capitalizeEachWord(post.user.name)}
              </Link>
              <span className="text-[8px] text-white bg-blue-400 px-[2px] py-[2px]">
                {'Administrateur'}
              </span>
              <span className="text-xs text-gray-500">
                {GetRelativeTime(post.created_at)}
              </span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="text-sm text-muted-foreground">Auteur inconnu</div>
      );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-start">
        {renderHeader()}
        <MenuBublication post={post} />
      </div>
    </div>
  );
}

export default HeaderPost;
