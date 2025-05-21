
// const dispatcheEvent = useDispatch();
// useEffect(() => {
//   const fetchData = async () => {
//     const responce = await fetch("/api/pages/other-pages", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${state.auth.access_token}`,
//       },
//     });
//     const rest = await responce.json();
//     console.log("hello hhhhyy", rest);
//     // if (responce.ok) {
//     //   dispatcheEvent(getAdminPages(rest.admin_pages));
//     //   dispatcheEvent(getMyPages(rest.my_pages));
//     //   dispatcheEvent(getFollowingPages(rest.following_pages));
//     // }
//   };
//   fetchData();
// }, [state.auth.access_token]);

// import { useState } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";
// import { PageCardFollow } from "./PageCardeFollow copy";
// import { useSelector } from "react-redux";


// export default function PageListFollow() {
//   const following_pages = useSelector((state) => state.page.following_pages);
//   const [isExpanded, setIsExpanded] = useState(false);

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div className="w-full">
//       {/* Mobile view with toggle */}
//       <div className="lg:hidden">
//         <button
//           onClick={toggleExpand}
//           className="w-full flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4"
//         >
//           <span className="font-medium">Pages ({following_pages.length})</span>
//           {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//         </button>

//         {isExpanded && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//             {following_pages.map((page) => (
//               <PageCardFollow key={page.id} page={page} />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Desktop view - always visible */}
//       <div className="hidden lg:block">
//         <h2 className="text-xl font-bold mb-4">Pages</h2>
//         <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
//           {following_pages.map((page) => (
//             <PageCardFollow key={page.id} page={page} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }





import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOthersPages } from "../../../Redux/PagesSlice";
import MyLoader from "../../../components/loader/Loader";
import PageCardUnFollow from './PageCardeUnfollow'

export default function PageListFollow() {
  const state = useSelector((state) => state)
  const [loading,setLoading] = useState(true)
    // const;
  const dispatcheEvent = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const responce = await fetch("/api/pages/other-pages", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.auth.access_token}`,
        },
      });
      const rest = await responce.json();
      console.log('this is rest',rest)
      if (responce.ok) {
        setLoading(false)
        dispatcheEvent(getOthersPages(rest));
      }
    };
    if (state.auth.access_token) fetchData();
  }, [state.auth.access_token]);
  // console.log(state.pages.others_pages);

  return !loading ? (
    <div className="w-full p-4">
      <h2 className="text-xl font-bold mb-4">Pages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {state.pages.others_pages.map((page) => (
          // <  />
          <PageCardUnFollow key={page.id} page={page} />
        ))}
      </div>

    </div>
  ) : (
    <MyLoader />
  );
}
