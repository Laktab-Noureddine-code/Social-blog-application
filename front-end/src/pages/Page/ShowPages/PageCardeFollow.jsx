/* eslint-disable react/prop-types */


import { User } from "lucide-react"
import UnknownCoverPhoto from "../../../components/Accueil Page/components/UnknownCoverPhoto";
import { formatNumber } from "../../../helpers/helper";
import { removeFollowingPage } from "../../../Redux/PagesSlice";
import { useDispatch, useSelector } from "react-redux";

// const followPage = async () => {
//   try {
//     const response = await fetch(
//       `/api/follow/${post.page.id}/${state.auth.user.id}`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${state.auth.access_token}`,
//         },
//       }
//     );
//     if (!response.ok) throw new Error("Erreur lors du follow");
//     const data = await response.json();
//     dispatchEvent(addNewAbonnes(data));
//   } catch (error) {
//     console.error("Follow error:", error);
//   }
// };
import {  UserMinus } from "lucide-react";
import { Link } from "react-router-dom";
// import {  UserPlus } from "lucide-react";

export default function PageCardFollow({ page }) {
  const state = useSelector(state => state)
  const dispatchEvent = useDispatch()
  const unfollowPage = async () => {
    try {
      const response = await fetch(
        `/api/unfollow/${page.id}/${state.auth.user.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${state.auth.access_token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Erreur lors de l’unfollow");
      const data = await response.json();
      dispatchEvent(removeFollowingPage(data));
    } catch (error) {
      console.error("Unfollow error:", error);
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
          <Link to={`/page/${page.id}`} className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
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
            <Link to={`/page/${page.id}`}  className="text-lg font-bold hover:underline">{page.name}</Link >
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
          onClick={unfollowPage}
          className="group gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 w-full"
        >
          <div className="flex items-center gap-2 justify-center ">
            <UserMinus
              className="group-hover:scale-110 transition-transform"
              size={18}
            />
            <span>Se désabonner</span>
          </div>
        </button>
      </div>
    </div>
  );
}
