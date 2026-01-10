/* eslint-disable react/prop-types */

import { User } from "lucide-react";
import UnknownCoverPhoto from "@/features/home/components/UnknownCoverPhoto";
import { formatNumber } from "@/shared/helpers/helper";
import { getNewFollowingPage, removeOthersPage } from "@/Redux/PagesSlice";
import { useDispatch, useSelector } from "react-redux";
import api from "@/lib/api";


// import { UserMinus } from "lucide-react";
import { Link } from "react-router-dom";
import {  UserPlus } from "lucide-react";


export default function PageCardUnFollow ({ page }) {
  const user = useSelector((state) => state.auth.user);
  const dispatcheEvent = useDispatch();
  const followPage = async () => {
    try {
      const response = await api.post(`/api/follow/${page.id}/${user.id}`);
      dispatcheEvent(getNewFollowingPage(response.data));
      dispatcheEvent(removeOthersPage(response.data));
    } catch (error) {
      console.error("Follow error:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
      {/* Cover image - hidden on small screens */}
      <div className="relative h-48 w-full hidden sm:block overflow-hidden">
        {page.cover_image_url ? (
          <img
            src={page.cover_image_url || "/placeholder.svg"}
            alt={`${page.name} cover`}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-200">
            <UnknownCoverPhoto />
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-3">
          {/* Profile image - shown on all screens */}
          <Link
            to={`/page/${page.id}`}
            className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0"
          >
            {page.profile_image_url ? (
              <img
                src={page.profile_image_url || "/placeholder.svg"}
                alt={page.name}
                className="object-cover"
              />
            ) : (
              <Link className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <User className="h-8 w-8 text-gray-400" />
              </Link>
            )}
          </Link>

          <div>
            <Link
              to={`/page/${page.id}`}
              className="text-lg font-bold hover:underline"
            >
              {page.name}
            </Link>
            {page.category && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {page.category}
              </p>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
          {formatNumber(+page.followers_count)} Abonnes
        </p>

        <button
          onClick={followPage}
          className="group gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 w-full"
        >
          <div className="flex items-center gap-2 justify-center">
            <UserPlus
              className="group-hover:scale-110 transition-transform"
              size={18}
            />
            <span>S’abonner</span>
          </div>
        </button>
      </div>
    </div>
  );
}
