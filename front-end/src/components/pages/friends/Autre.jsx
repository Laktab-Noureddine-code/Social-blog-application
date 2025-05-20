// // import { useEffect, useState } from "react"
// // import { Button } from "@/components/ui/button"
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// // import { UserPlus, Search } from "lucide-react"
// // import { Input } from "@/components/ui/input"
// // import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // import { GetAuthers } from "../../utils/invitationActions"
// // import { useDispatch, useSelector } from "react-redux"

// // // Mock data - in a real app, this would come from an API
// // const mockUsers = [
// //   {
// //     id: 1,
// //     name: "Pierre Durand",
// //     avatar: "/placeholder.svg?height=40&width=40",
// //     mutualFriends: 3,
// //     location: "Paris",
// //   },
// //   {
// //     id: 2,
// //     name: "Léa Martin",
// //     avatar: "/placeholder.svg?height=40&width=40",
// //     mutualFriends: 1,
// //     location: "Lyon",
// //   },
// //   {
// //     id: 3,
// //     name: "Hugo Blanc",
// //     avatar: "/placeholder.svg?height=40&width=40",
// //     mutualFriends: 0,
// //     location: "Marseille",
// //   },
// //   {
// //     id: 4,
// //     name: "Chloé Rousseau",
// //     avatar: "/placeholder.svg?height=40&width=40",
// //     mutualFriends: 5,
// //     location: "Bordeaux",
// //   },
// //   {
// //     id: 5,
// //     name: "Maxime Girard",
// //     avatar: "/placeholder.svg?height=40&width=40",
// //     mutualFriends: 2,
// //     location: "Lille",
// //   },
// //   {
// //     id: 6,
// //     name: "Sarah Dubois",
// //     avatar: "/placeholder.svg?height=40&width=40",
// //     mutualFriends: 4,
// //     location: "Toulouse",
// //   },
// // ]

// // export default function AutresPage() {
// //     const [users, setUsers] = useState(mockUsers)
// //     const access_token = useSelector(state => state.auth.access_token)
// //     const state = useSelector(state => state.amis)
// //     const authers = useSelector(state => state.amis.authers)
// //     console.log(state);
// //     const dispatchEvent = useDispatch()
// //   const [searchQuery, setSearchQuery] = useState("")
// //   const [invitedIds, setInvitedIds] = useState([])
// //     const [activeTab, setActiveTab] = useState("tous")
    
// //     useEffect(() => {
// //       GetAuthers(access_token, dispatchEvent);
// //       setUsers(authers);
// //     }, [dispatchEvent, access_token]);

// //   const filteredUsers = users
// //     .filter((user) => user.user.name.toLowerCase().includes(searchQuery.toLowerCase()))
// //     .filter((user) => {
// //       if (activeTab === "tous") return true
// //       if (activeTab === "amis-communs") return user.mutualFriends > 0
// //       return true
// //     })
// //     .sort((a, b) => {
// //       if (activeTab === "amis-communs") {
// //         return b.mutualFriends - a.mutualFriends
// //       }
// //       return 0
// //     })

// //   const sendInvite = (id) => {
// //     setInvitedIds([...invitedIds, id])
// //     // In a real app, this would call an API to send the invitation
// //   }
// //     useEffect(() => {
// //         GetAuthers(access_token,dispatchEvent);
// //   })
// //   return (
// //     <div className="space-y-6">
// //       <div>
// //         <h1 className="text-3xl font-bold">Autres Utilisateurs</h1>
// //         <p className="text-muted-foreground">Découvrez de nouvelles personnes à ajouter</p>
// //       </div>

// //       <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
// //         <Tabs defaultValue="tous" className="w-full md:w-auto" onValueChange={setActiveTab}>
// //           <TabsList>
// //             <TabsTrigger value="tous">Tous</TabsTrigger>
// //             <TabsTrigger value="amis-communs">Amis communs</TabsTrigger>
// //           </TabsList>
// //         </Tabs>

// //         <div className="relative w-full md:w-64">
// //           <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
// //           <Input
// //             placeholder="Rechercher des utilisateurs..."
// //             className="pl-8"
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //           />
// //         </div>
// //       </div>

// //       {filteredUsers.length > 0 ? (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //           {filteredUsers.map((user) => (
// //             <div key={user.id} className="border rounded-lg p-4 flex flex-col hover:bg-muted/50 transition-colors">
// //               <div className="flex items-center gap-3 mb-3">
// //                 <Avatar className="h-12 w-12">
// //                   <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
// //                   <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
// //                 </Avatar>
// //                 <div>
// //                   <p className="font-medium">{user.name}</p>
// //                   <p className="text-sm text-muted-foreground">{user.location}</p>
// //                 </div>
// //               </div>

// //               <div className="mt-auto flex items-center justify-between">
// //                 {user.mutualFriends > 0 && (
// //                   <p className="text-sm text-muted-foreground">
// //                     {user.mutualFriends} ami{user.mutualFriends > 1 ? "s" : ""} en commun
// //                   </p>
// //                 )}
// //                 <Button
// //                   variant={invitedIds.includes(user.id) ? "outline" : "default"}
// //                   size="sm"
// //                   className="ml-auto"
// //                   disabled={invitedIds.includes(user.id)}
// //                   onClick={() => sendInvite(user.id)}
// //                 >
// //                   {invitedIds.includes(user.id) ? (
// //                     "Invité"
// //                   ) : (
// //                     <>
// //                       <UserPlus className="h-4 w-4 mr-2" />
// //                       Inviter
// //                     </>
// //                   )}
// //                 </Button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       ) : (
// //         <div className="text-center py-12 border rounded-lg bg-muted/20">
// //           <p className="text-muted-foreground">
// //             {searchQuery ? "Aucun utilisateur ne correspond à votre recherche." : "Aucun utilisateur disponible."}
// //           </p>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }


// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { UserPlus, Search } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { envoyerInvitation, GetAuthers } from "../../utils/invitationActions";
// import { useDispatch, useSelector } from "react-redux";
// import { removeAuhter } from "../../../Redux/AmisSicie";

// export default function AutresPage() {
// const [page, setPage] = useState(1);
//   const [users, setUsers] = useState([]);
//   const access_token = useSelector((state) => state.auth.access_token);
//   const authers = useSelector((state) => state.amis.authers);
//   const dispatchEvent = useDispatch();

//   const [searchQuery, setSearchQuery] = useState("");
//   const [invitedIds, setInvitedIds] = useState([]);
//   const [activeTab, setActiveTab] = useState("tous");

//   // Fetch authors once
// //   useEffect(() => {
// //     GetAuthers(access_token, dispatchEvent);
//     //   }, [dispatchEvent, access_token]);


//     useEffect(() => {
//       GetAuthers(access_token, dispatchEvent, page);
//     }, [page, access_token, dispatchEvent]);



//     // useEffect(() => {
//     //   GetAuthers(access_token, dispatchEvent, page);
//     // }, [page]);


//     // Ajout du scroll listener
//     useEffect(() => {
//       const handleScroll = () => {
//         if (
//           window.innerHeight + window.scrollY >=
//           document.body.offsetHeight - 100
//         ) {
//           setPage((prevPage) => prevPage + 1);
//         }
//       };
//       window.addEventListener("scroll", handleScroll);
//       return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//   // Convert authors into UI-friendly format
//   useEffect(() => {
//     const formatted = authers.map((item) => ({
//       id: item.user.id,
//       name: item.user.name,
//       avatar: item.user.image_profile_url,
//       location: item.user.localisation ?? "",
//       mutualFriends: item.mutual_friends_count,
//     }));
//     setUsers(formatted);
//   }, [authers]);

//   // Filter and sort users
//   const filteredUsers = users
//     .filter((user) =>
//       user.name.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .filter((user) => {
//       if (activeTab === "tous") return true;
//       if (activeTab === "amis-communs") return user.mutualFriends > 0;
//       return true;
//     })
//     .sort((a, b) => {
//       if (activeTab === "amis-communs") {
//         return b.mutualFriends - a.mutualFriends;
//       }
//       return 0;
//     });

//   const sendInvite = (id) => {
//     setInvitedIds([...invitedIds, id]);
//     // Add API call here later
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Autres Utilisateurs</h1>
//         <p className="text-muted-foreground">
//           Découvrez de nouvelles personnes à ajouter
//         </p>
//       </div>

//       <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
//         <Tabs
//           defaultValue="tous"
//           className="w-full md:w-auto"
//           onValueChange={setActiveTab}
//         >
//           <TabsList>
//             <TabsTrigger value="tous">Tous</TabsTrigger>
//             <TabsTrigger value="amis-communs">Amis communs</TabsTrigger>
//           </TabsList>
//         </Tabs>

//         <div className="relative w-full md:w-64">
//           <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Rechercher des utilisateurs..."
//             className="pl-8"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//       </div>

//       {filteredUsers.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredUsers.map((user) => (
//             <div
//               key={user.id}
//               className="border rounded-lg p-4 flex flex-col hover:bg-muted/50 transition-colors"
//             >
//               <div className="flex items-center gap-3 mb-3">
//                 <Avatar className="h-12 w-12">
//                   <AvatarImage
//                     src={user.avatar || "/placeholder.svg"}
//                     alt={user.name}
//                   />
//                   <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="font-medium">{user.name}</p>
//                   <p className="text-sm text-muted-foreground">
//                     {user.location}
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-auto flex items-center justify-between">
//                 {user.mutualFriends > 0 && (
//                   <p className="text-sm text-muted-foreground">
//                     {user.mutualFriends} ami{user.mutualFriends > 1 ? "s" : ""}{" "}
//                     en commun
//                   </p>
//                 )}
//                 <Button
//                   variant={invitedIds.includes(user.id) ? "outline" : "default"}
//                   size="sm"
//                   className="ml-auto"
//                   disabled={invitedIds.includes(user.id)}
//                           onClick={() => {
//                               envoyerInvitation(user.id, access_token, dispatchEvent)
//                               dispatchEvent(removeAuhter(user.id));
//                           }}
//                 >
//                   {invitedIds.includes(user.id) ? (
//                     "Invité"
//                   ) : (
//                     <>
//                       <UserPlus className="h-4 w-4 mr-2" />
//                       Inviter
//                     </>
//                   )}
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-12 border rounded-lg bg-muted/20">
//           <p className="text-muted-foreground">
//             {searchQuery
//               ? "Aucun utilisateur ne correspond à votre recherche."
//               : "Aucun utilisateur disponible."}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }









































// import { useEffect, useState, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { UserPlus, Search } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { envoyerInvitation, GetAuthers } from "../../utils/invitationActions";
// import { useDispatch, useSelector } from "react-redux";
// import { removeAuhter } from "../../../Redux/AmisSicie";

// export default function AutresPage() {
//   const access_token = useSelector((state) => state.auth.access_token);
//   const dispatchEvent = useDispatch();

//   const [users, setUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [invitedIds, setInvitedIds] = useState([]);
//   const [activeTab, setActiveTab] = useState("tous");
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const isLoadingRef = useRef(false);

//   const fetchAuthers = async (pageNum = 1) => {
//     if (isLoadingRef.current || !hasMore) return;

//     isLoadingRef.current = true;
//     const response = await GetAuthers(access_token, dispatchEvent, pageNum);
//     if (response && response.length > 0) {
//       const formatted = response.map((item) => ({
//         id: item.user.id,
//         name: item.user.name,
//         avatar: item.user.image_profile_url,
//         location: item.user.localisation ?? "",
//         mutualFriends: item.mutual_friends_count,
//       }));
//       setUsers((prev) => [...prev, ...formatted]);

//       if (response.length < 30) {
//         setHasMore(false);
//       }
//     } else {
//       setHasMore(false);
//     }
//     isLoadingRef.current = false;
//   };

//   useEffect(() => {
//     fetchAuthers(page);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [page]);

//   const handleScroll = () => {
//     const scrollTop = document.documentElement.scrollTop;
//     const scrollHeight = document.documentElement.scrollHeight;
//     const clientHeight = window.innerHeight;

//     if (scrollTop + clientHeight >= scrollHeight - 100) {
//       setPage((prev) => prev + 1);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const filteredUsers = users
//     .filter((user) =>
//       user.name.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .filter((user) => {
//       if (activeTab === "tous") return true;
//       if (activeTab === "amis-communs") return user.mutualFriends > 0;
//       return true;
//     })
//     .sort((a, b) => {
//       if (activeTab === "amis-communs") {
//         return b.mutualFriends - a.mutualFriends;
//       }
//       return 0;
//     });

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Autres Utilisateurs</h1>
//         <p className="text-muted-foreground">
//           Découvrez de nouvelles personnes à ajouter
//         </p>
//       </div>

//       <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
//         <Tabs
//           defaultValue="tous"
//           className="w-full md:w-auto"
//           onValueChange={setActiveTab}
//         >
//           <TabsList>
//             <TabsTrigger value="tous">Tous</TabsTrigger>
//             <TabsTrigger value="amis-communs">Amis communs</TabsTrigger>
//           </TabsList>
//         </Tabs>

//         <div className="relative w-full md:w-64">
//           <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Rechercher des utilisateurs..."
//             className="pl-8"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//       </div>

//       {filteredUsers.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredUsers.map((user) => (
//             <div
//               key={user.id}
//               className="border rounded-lg p-4 flex flex-col hover:bg-muted/50 transition-colors"
//             >
//               <div className="flex items-center gap-3 mb-3">
//                 <Avatar className="h-12 w-12">
//                   <AvatarImage
//                     src={user.avatar || "/placeholder.svg"}
//                     alt={user.name}
//                   />
//                   <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="font-medium">{user.name}</p>
//                   <p className="text-sm text-muted-foreground">
//                     {user.location}
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-auto flex items-center justify-between">
//                 {user.mutualFriends > 0 && (
//                   <p className="text-sm text-muted-foreground">
//                     {user.mutualFriends} ami
//                     {user.mutualFriends > 1 ? "s" : ""} en commun
//                   </p>
//                 )}
//                 <Button
//                   variant={invitedIds.includes(user.id) ? "outline" : "default"}
//                   size="sm"
//                   className="ml-auto"
//                   disabled={invitedIds.includes(user.id)}
//                   onClick={() => {
//                     envoyerInvitation(user.id, access_token, dispatchEvent);
//                     dispatchEvent(removeAuhter(user.id));
//                     setInvitedIds([...invitedIds, user.id]);
//                   }}
//                 >
//                   {invitedIds.includes(user.id) ? (
//                     "Invité"
//                   ) : (
//                     <>
//                       <UserPlus className="h-4 w-4 mr-2" />
//                       Inviter
//                     </>
//                   )}
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-12 border rounded-lg bg-muted/20">
//           <p className="text-muted-foreground">
//             {searchQuery
//               ? "Aucun utilisateur ne correspond à votre recherche."
//               : "Aucun utilisateur disponible."}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { envoyerInvitation, GetAuthers } from "../../utils/invitationActions";
import { useDispatch, useSelector } from "react-redux";
import { removeAuhter, updateUserauthers } from "../../../Redux/AmisSicie";

export default function AutresPage() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const access_token = useSelector((state) => state.auth.access_token);
  const authers = useSelector((state) => state.amis.authers);
  const dispatchEvent = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [invitedIds, setInvitedIds] = useState([]);
  const [activeTab, setActiveTab] = useState("tous");

  // Reset authors when component mounts
  useEffect(() => {
    dispatchEvent(updateUserauthers([]));
  }, []);

  // Fetch authors when page changes
  useEffect(() => {
    if (!loading) {
      setLoading(true);
      GetAuthers(access_token, dispatchEvent, page).finally(() =>
        setLoading(false)
      );
    }
  }, [page, access_token, dispatchEvent]);

  // Scroll to load next page if bottom reached
  useEffect(() => {
    const handleScroll = () => {
      if (loading) return;
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  // Format and deduplicate authors
  useEffect(() => {
    const formatted = authers.map((item) => ({
      id: item.user.id,
      name: item.user.name,
      avatar: item.user.image_profile_url,
      location: item.user.localisation ?? "",
      mutualFriends: item.mutual_friends_count,
      uniqueKey: `${item.user.id}-${item.user.name}`, // safer unique key
    }));

    const uniqueUsers = formatted.filter(
      (user, index, self) => index === self.findIndex((u) => u.id === user.id)
    );

    setUsers(uniqueUsers);
  }, [authers]);

  // Filter and sort users
  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((user) => {
      if (activeTab === "tous") return true;
      if (activeTab === "amis-communs") return user.mutualFriends > 0;
      return true;
    })
    .sort((a, b) => {
      if (activeTab === "amis-communs") {
        return b.mutualFriends - a.mutualFriends;
      }
      return 0;
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Autres Utilisateurs</h1>
        <p className="text-muted-foreground">
          Découvrez de nouvelles personnes à ajouter
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <Tabs
          defaultValue="tous"
          className="w-full md:w-auto"
          onValueChange={setActiveTab}
        >
          <TabsList>
            <TabsTrigger value="tous">Tous</TabsTrigger>
            <TabsTrigger value="amis-communs">Amis communs</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des utilisateurs..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <div
              key={user.uniqueKey}
              className="border rounded-lg p-4 flex flex-col hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                  />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {user.location}
                  </p>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between">
                {user.mutualFriends > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {user.mutualFriends} ami
                    {user.mutualFriends > 1 ? "s" : ""} en commun
                  </p>
                )}
                <Button
                  variant={invitedIds.includes(user.id) ? "outline" : "default"}
                  size="sm"
                  className="ml-auto"
                  disabled={invitedIds.includes(user.id)}
                  onClick={() => {
                    envoyerInvitation(user.id, access_token, dispatchEvent);
                    dispatchEvent(removeAuhter(user.id));
                    setInvitedIds([...invitedIds, user.id]);
                  }}
                >
                  {invitedIds.includes(user.id) ? (
                    "Invité"
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Inviter
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">
            {searchQuery
              ? "Aucun utilisateur ne correspond à votre recherche."
              : "Aucun utilisateur disponible."}
          </p>
        </div>
      )}
    </div>
  );
}
