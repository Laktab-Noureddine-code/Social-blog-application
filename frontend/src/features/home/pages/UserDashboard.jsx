// // /* eslint-disable react/prop-types */
// // import { Card, CardHeader, CardContent } from "@/shared/ui/card";
// // import { Avatar, AvatarImage, AvatarFallback } from "@/shared/ui/avatar";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useEffect } from "react";

// // const UserDashboard = ({ recentPages, groups, newFriends }) => {
// //   const state = useSelector(state => state);
// //   const dispatch = useDispatch();
// //   useEffect(() => {
// //     // dispatch(setIsLoading(true));
// //     const fetchData = async () => {
// //       if (!state.auth.access_token || !state.auth.user.id) return;
// //       try {
// //         const response = await fetch(
// //           `/api/dachboardUser/${state.auth.user.id}`,
// //           {
// //             headers: {
// //               Authorization: `Bearer ${state.auth.access_token}`,
// //             },
// //           }
// //         );

// //         if (!response.ok) {
// //           console.error("Unauthorized:", response.status);
// //           return;
// //         }

// //         const userData = await response.json();
// //         // if(response.ok) {
// //         // }
// //       } catch (err) {
// //         console.error("Error fetching user:", err);
// //       }
// //     };

// //     fetchData();
// //   }, [state.auth.access_token, dispatch, state.auth.user.id]);
// //   return (
// //     <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto px-4 w-full">
// //       {/* Left Column - Shows on 850px+ */}
// //       <div className="flex-1 flex flex-col gap-6 min-w-0">
// //         {/* Recent Pages Followed */}
// //         <Card className="rounded-2xl shadow-md">
// //           <CardHeader className="px-6 py-2 pb-2">
// //             <h3 className="text-lg font-semibold">Pages suivies</h3>
// //           </CardHeader>
// //           <CardContent className="px-6 py-2 pt-0 space-y-4">
// //             {recentPages.slice(0, 5).map((page) => (
// //               <div key={page.id} className="flex items-center gap-4">
// //                 <Avatar className="h-10 w-10">
// //                   <AvatarImage src={page.avatar} />
// //                   <AvatarFallback>{page.name.charAt(0)}</AvatarFallback>
// //                 </Avatar>
// //                 <span className="text-sm font-medium">{page.name}</span>
// //               </div>
// //             ))}
// //           </CardContent>
// //         </Card>

// //         {/* Groups You're In */}
// //         <Card className="rounded-2xl shadow-md">
// //           <CardHeader className="px-6 py-2 pb-2">
// //             <h3 className="text-lg font-semibold">Groupes</h3>
// //           </CardHeader>
// //           <CardContent className="px-6 py-2 pt-0 space-y-4">
// //             {groups.slice(0, 5).map((group) => (
// //               <div key={group.id} className="flex items-center gap-4">
// //                 <Avatar className="h-10 w-10">
// //                   <AvatarImage src={group.avatar} />
// //                   <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
// //                 </Avatar>
// //                 <span className="text-sm font-medium">{group.name}</span>
// //               </div>
// //             ))}
// //           </CardContent>
// //         </Card>
// //       </div>

// //       {/* Right Column - Shows only on 1300px+ */}
// //       <div className="hidden xl:block flex-1 min-w-0">
// //         <Card className="rounded-2xl shadow-md h-full">
// //           <CardHeader className="px-6 py-2 pb-2">
// //             <h3 className="text-lg font-semibold">Nouveaux amis</h3>
// //           </CardHeader>
// //           <CardContent className="px-6 py-2 pt-0 space-y-4">
// //             {newFriends.slice(0, 10).map((friend) => (
// //               <div key={friend.id} className="flex items-center gap-3">
// //                 <Avatar className="h-10 w-10">
// //                   <AvatarImage src={friend.avatar} />
// //                   <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
// //                 </Avatar>
// //                 <span className="text-sm font-medium">{friend.name}</span>
// //               </div>
// //             ))}
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // };

// // // Example usage:


// // export default UserDashboard;
































// // //<div className="flex-1 flex flex-col gap-6 min-w-0">
// //         {/* Recent Pages Followed */}
// //         <Card className="rounded-2xl shadow-md">
// //           <CardHeader className="px-6 py-2 pb-2">
// //             <h3 className="text-lg font-semibold">Pages suivies</h3>
// //           </CardHeader>
// //           <CardContent className="px-6 py-2 pt-0 space-y-4">
// //             {isLoading ? (
// //               <div className="text-center py-4">
// //                 {[1, 2, 3].map((e) => (
// //                   <SkeletonUserDashboard key={e} />
// //                 ))}
// //               </div>
// //             ) : dashboardData.recent_pages.length > 0 ? (
// //               dashboardData.recent_pages.map((page) => (
// //                 <div key={page.id} className="flex items-center gap-4">
// //                   <Avatar className="h-10 w-10">
// //                     <AvatarImage src={page.profile_image_url} />
// //                     <AvatarFallback>{page.name.charAt(0)}</AvatarFallback>
// //                   </Avatar>
// //                   <span className="text-sm font-medium">{page.name}</span>
// //                 </div>
// //               ))
// //             ) : (
// //               <div className="text-center py-4 text-gray-500">
// //                 Aucune page suivie
// //               </div>
// //             )}
// //           </CardContent>
// //         </Card>

// //         {/* Groups You're In */}
// //         <Card className="rounded-2xl shadow-md">
// //           <CardHeader className="px-6 py-2 pb-2">
// //             <h3 className="text-lg font-semibold">Groupes</h3>
// //           </CardHeader>
// //           <CardContent className="px-6 py-2 pt-0 space-y-4">
// //             {isLoading ? (
// //               <div className="text-center py-4">
// //                 {[1, 2, 3].map((e) => (
// //                   <SkeletonUserDashboard key={e} />
// //                 ))}
// //               </div>
// //             ) : dashboardData.recent_groups.length > 0 ? (
// //               dashboardData.recent_groups.map((group) => (
// //                 <div key={group.id} className="flex items-center gap-4">
// //                   <Avatar className="h-10 w-10">
// //                     <AvatarImage src={group.cover_image} />
// //                     <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
// //                   </Avatar>
// //                   <span className="text-sm font-medium">{group.name}</span>
// //                 </div>
// //               ))
// //             ) : (
// //               <div className="text-center py-4 text-gray-500">Aucun groupe</div>
// //             )}
// //           </CardContent>
// //         </Card>
// //       </div>







// /* eslint-disable react/prop-types */ 
import { Card, CardHeader, CardContent } from "@/shared/ui/card"; 
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/ui/avatar"; 
import { useSelector } from "react-redux"; 
import { useEffect, useState } from "react"; 
import SkeletonUserDashboard from "./SkeletonUserDashboeard";
import api from "@/lib/api";
 
const UserDashboard = () => { 
  const [dashboardData, setDashboardData] = useState({
    recent_pages: [],
    recent_groups: [],
    recent_friends: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, user } = useSelector(state => state.auth); 
  // const dispatch = useDispatch(); 

  useEffect(() => { 
    setIsLoading(true);
    const fetchData = async () => { 
      if (!isAuthenticated || !user?.id) return; 
      try { 
        const response = await api.get(`/api/user/dashboard-data/${user.id}`);
        setDashboardData(response.data);
      } catch (err) { 
        console.error("Error fetching data:", err); 
      } finally {
        setIsLoading(false);
      }
    }; 
 
    fetchData(); 
  }, [isAuthenticated, user?.id]); 

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto px-4 w-full">
      {/* Left Column - Shows on 850px+ */}
      

      {/* Right Column - Shows only on 1300px+ */}
      <div className="hidden md:block flex-1 min-w-0">
        <Card className="rounded-2xl shadow-md h-full">
          <CardHeader className="px-6 py-2 pb-2">
            <h3 className="text-lg font-semibold">Recent Friends</h3>
          </CardHeader>
          <CardContent className="px-6 py-2 pt-0 space-y-4">
            {isLoading ? (
              <div className="text-center py-4">
                {[1, 2, 3,4,5,6,7,8].map((e) => (
                  <SkeletonUserDashboard key={e} />
                ))}
              </div>
            ) : dashboardData.recent_friends.length > 0 ? (
              dashboardData.recent_friends.map((friend) => (
                <div key={friend.id} className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={friend.image_profile_url} />
                    <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{friend.name}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                No recent friends
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  ); 
}; 
 
export default UserDashboard; 