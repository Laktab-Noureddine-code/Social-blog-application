import { Outlet } from "react-router-dom"
import NavigationFriends from "@/features/friends/components/NavigationFriend"

function Friends() {
  return (
    <div className="relative">
      <div className="sticky top-13 z-10 bg-white border-b border-gray-200">
        <NavigationFriends />
      </div>
      <div className="px-3 md:px-1">
        <Outlet />
      </div>
    </div>
  );
}

export default Friends;
