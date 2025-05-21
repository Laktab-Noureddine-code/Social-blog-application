/* eslint-disable react/prop-types */

import GetRelativeTime from "../../Accueil Page/components/GetRelativeTimes";
import Unknown from "../../Accueil Page/components/Unknown";

import { Avatar } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

import MenuBublication from "./MenuPublication";
import { capitalizeEachWord } from "../../../helpers/helper";

function HeaderPost({ post }) {
  const renderHeader = () => {
    if (post.type == "user" && post.user) {
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
            <div className="font-medium">
              {capitalizeEachWord(post.user.name)}
              {/* {post.user.name} */}
            </div>
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
            <div className="font-medium">{post.page.name}</div>
            <div className="text-xs text-gray-500">
              {GetRelativeTime(post.created_at)}
            </div>
          </div>
        </div>
      );
    } else if (post.type === "group" && post.group) {
      return (
        <div className="flex gap-2">
          <Avatar className="w-10 h-10">
            <Link to={`/group/${post.group.id}`} className="w-full h-full">
              {post.group.cover_url ? (
                <img
                  src={post.group.cover_url}
                  alt="Group cover"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <Unknown />
              )}
            </Link>
          </Avatar>
          <div>
            <div className="font-medium">{post.group.name}</div>
            <div className="text-xs text-gray-500">
              {GetRelativeTime(post.created_at)}
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
