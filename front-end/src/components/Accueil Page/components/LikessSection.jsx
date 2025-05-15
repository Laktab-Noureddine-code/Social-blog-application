// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// // import { Button } from "@/components/ui/button";
// import { Avatar } from "@/components/ui/avatar";
// import { X } from "lucide-react";
// import { useState, useEffect, useRef, act } from "react";
// import "../../../style/globale.css";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   refuserInvitation,
//   accepterInvitation,
//   envoyerInvitation,
//   annulerInvitation,
//   AnnulerAmis,
// } from "./InviationActions";

// function LikesSection({ postId, toggleSHowLikes, SetPosts }) {
//   const [UersLikes, setUersLikes] = useState([]);
//   const state = useSelector((state) => state);
//   const dispatchEvent = useDispatch();
//   useEffect(() => {
//     const fetchData = async () => {
//       const respons = await fetch(`/api/likes/users/${postId}`, {
//         method: "GET",
//         // body: JSON.stringify({ id: postId }),
//         headers: {
//           Authorization: `Bearer ${state.access_token}`,
//         },
//       });
//       const res = await respons.json();
//       setUersLikes(res);
//       SetPosts(res);
//     };
//     fetchData();
//   }, [postId, state.access_token]);



//   return (
//     <div className="h-screen fixed bg-black/85 dark:bg-gray-800/8 w-full top-0 left-0 z-30 flex justify-center py-2 items-center">
//       <div className="bg-[#28242c] dark:bg-gray-50 w-full max-w-2xl mx-auto sm:px-0 py-5 max-h-[500px] rounded-md relative">
//         {/* Close Button */}
//         <div className="h-10 w-full bg-[#28242c] flex justify-end pr-5 border-b-1 border-white">
//           <button type="button" className="z-20" onClick={toggleSHowLikes}>
//             <X
//               size={30}
//               color="white"
//               className="bg-gray-600 rounded-full p-2 cursor-pointer"
//             />
//           </button>
//         </div>
//         {/* Comments List (Scrollable with transparent bg and custom scrollbar) */}
//         <div className="w-full overflow-y-auto max-h-[400px] pb-16 bg-transparent custom-scrollbar">
//           <div className="p-5 relative">
//             {UersLikes &&
//               UersLikes.length > 0 &&
//               UersLikes.map((like, index) => (
//                 <div key={index} className="flex gap-2 mb-3 items-center">
//                   <Avatar className="w-8 h-8">
//                     {like.user.image_profile_url ? (
//                       <img
//                         src={like.user.image_profile_url}
//                         alt={like.user.name}
//                         className="w-full h-full object-cover rounded-full"
//                       />
//                     ) : (
//                       <svg
//                         viewBox="0 0 80 80"
//                         fill="none"
//                         className="w-full h-full"
//                       >
//                         <circle cx="40" cy="40" r="40" fill="#E5E7EB" />
//                         <path
//                           d="M40 40C45.5228 40 50 35.5228 50 30C50 24.4772 45.5228 20 40 20C34.4772 20 30 24.4772 30 30C30 35.5228 34.4772 40 40 40Z"
//                           fill="#9CA3AF"
//                         />
//                         <path
//                           d="M40 44C30.06 44 22 52.06 22 62C22 63.1046 22.8954 64 24 64H56C57.1046 64 58 63.1046 58 62C58 52.06 49.94 44 40 44Z"
//                           fill="#9CA3AF"
//                         />
//                         <path
//                           d="M56 30C56 35.5228 51.5228 40 46 40C40.4772 40 36 35.5228 36 30C36 24.4772 40.4772 20 46 20C51.5228 20 56 24.4772 56 30Z"
//                           fill="#6B7280"
//                         />
//                         <path
//                           d="M46 44C56.94 44 65 52.06 65 62C65 63.1046 64.1046 64 63 64H56C54.8954 64 54 63.1046 54 62C54 56.4772 50.5228 52 46 52C41.4772 52 38 56.4772 38 62C38 63.1046 37.1046 64 36 64H29C27.8954 64 27 63.1046 27 62C27 52.06 35.06 44 46 44Z"
//                           fill="#6B7280"
//                         />
//                       </svg>
//                     )}
//                   </Avatar>
//                   <div className="p-2 rounded-lg w-[90%] flex justify-between items-center">
//                     <div className="font-semibold text-xs text-white">
//                       {like.user.name}
//                     </div>
//                     <div className="text-sm">
//                       {state.friends.some((fr) => fr.id === like.user.id) ? (
//                         // Cas 1: Déjà amis
//                         <button
//                           className="rounded-md text-white font-bold p-2 border-2 border-gray-700"
//                           onClick={() =>
//                             AnnulerAmis(
//                               like.user.id,
//                               state.access_token,
//                               dispatchEvent
//                             )
//                           }
//                         >
//                           Annuler
//                         </button>
//                       ) : state.invitationsEnvoyees.some(
//                           (inv) => inv.id === like.user.id
//                         ) ? (
//                         // Cas 2: J’ai envoyé une invitation
//                         <button
//                           className="rounded-md text-yellow-600 font-bold p-2 border-2 border-yellow-600"
//                           onClick={() =>
//                             annulerInvitation(
//                               like.user.id,
//                               state.access_token,
//                               dispatchEvent
//                             )
//                           }
//                         >
//                           {"Annuler l'invitation"}
//                         </button>
//                       ) : state.invitationsRecues.some(
//                           (inv) => inv.id === like.user.id
//                         ) ? (
//                         // Cas 3: Il m’a invité
//                         <>
//                           <button
//                             className="rounded-md text-green-600 font-bold p-2 border-2 border-green-600"
//                             onClick={() =>
//                               refuserInvitation(
//                                 like.user.id,
//                                 state.access_token
//                               )
//                             }
//                           >
//                             Refuser
//                           </button>
//                           <button
//                             className="rounded-md text-green-600 font-bold p-2 border-2 border-green-600"
//                             onClick={() =>
//                               accepterInvitation(
//                                 like.user.id,
//                                 state.access_token,
//                                 dispatchEvent
//                               )
//                             }
//                           >
//                             Accepter
//                           </button>
//                         </>
//                       ) : (
//                         like.user.id !== state.user.id ? (
//                           // Cas 4: Aucun lien
//                           <button
//                             className="rounded-md bg-gray-700 text-white font-bold p-2"
//                             onClick={() =>
//                               envoyerInvitation(
//                                 like.user.id,
//                                 state.access_token,
//                                 dispatchEvent
//                               )
//                             }
//                           >
//                             Ajouter Ami
//                           </button>
//                               ) :
//                                 ''
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LikesSection;

// "use client";

// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import { Avatar } from "@/components/ui/avatar";
// import { X } from "lucide-react";
// import { useState, useEffect } from "react";
// import "../../../style/globale.css";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   refuserInvitation,
//   accepterInvitation,
//   envoyerInvitation,
//   annulerInvitation,
//   AnnulerAmis,
// } from "./InviationActions";

// function LikesSection({ postId, toggleSHowLikes, SetPosts }) {
//   const [UersLikes, setUersLikes] = useState([]);
//   const state = useSelector((state) => state);
//   const dispatchEvent = useDispatch();

//   useEffect(() => {
//     const fetchData = async () => {
//       const respons = await fetch(`/api/likes/users/${postId}`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${state.access_token}`,
//         },
//       });
//       const res = await respons.json();
//       setUersLikes(res);
//       SetPosts(res);
//     };
//     fetchData();
//   }, [postId, state.access_token, SetPosts]);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
//       <div className="w-full max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden">
//         {/* Header with close button */}
//         <div className="relative px-6 pt-6 pb-4">
//           <button
//             type="button"
//             onClick={toggleSHowLikes}
//             className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
//           >
//             <X size={20} />
//           </button>
//           <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//             Likes
//           </h3>
//           <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//             {UersLikes.length}{" "}
//             {UersLikes.length === 1 ? "personne a aimé" : "personnes ont aimé"}{" "}
//             ce post
//           </p>
//         </div>

//         {/* Divider */}
//         <div className="h-px bg-gray-200 dark:bg-zinc-800"></div>

//         {/* User List */}
//         <div className="max-h-[60vh] overflow-y-auto px-6 py-4">
//           {UersLikes && UersLikes.length > 0 ? (
//             <ul className="space-y-4">
//               {UersLikes.map((like, index) => (
//                 <li key={index} className="flex items-center justify-between">
//                   {/* User Info */}
//                   <div className="flex items-center space-x-3">
//                     <Avatar className="h-10 w-10 flex-shrink-0">
//                       {like.user.image_profile_url ? (
//                         <img
//                           src={
//                             like.user.image_profile_url || "/placeholder.svg"
//                           }
//                           alt={like.user.name}
//                           className="h-full w-full rounded-full object-cover"
//                         />
//                       ) : (
//                         <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-full">
//                           <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
//                             {like.user.name.charAt(0).toUpperCase()}
//                           </span>
//                         </div>
//                       )}
//                     </Avatar>
//                     <span className="text-sm font-medium text-gray-900 dark:text-white">
//                       {like.user.name}
//                     </span>
//                   </div>

//                   {/* Action Buttons */}
//                   <div>
//                     {state.friends.some((fr) => fr.id === like.user.id) ? (
//                       // Already friends
//                       <button
//                         onClick={() =>
//                           AnnulerAmis(
//                             like.user.id,
//                             state.access_token,
//                             dispatchEvent
//                           )
//                         }
//                         className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//                       >
//                         Annuler
//                       </button>
//                     ) : state.invitationsEnvoyees.some(
//                         (inv) => inv.id === like.user.id
//                       ) ? (
//                       // Invitation sent
//                       <button
//                         onClick={() =>
//                           annulerInvitation(
//                             like.user.id,
//                             state.access_token,
//                             dispatchEvent
//                           )
//                         }
//                         className="text-xs font-medium text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400"
//                       >
//                         Annuler l'invitation
//                       </button>
//                     ) : state.invitationsRecues.some(
//                         (inv) => inv.id === like.user.id
//                       ) ? (
//                       // Invitation received
//                       <div className="flex space-x-3">
//                         <button
//                           onClick={() =>
//                             refuserInvitation(like.user.id, state.access_token)
//                           }
//                           className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//                         >
//                           Refuser
//                         </button>
//                         <button
//                           onClick={() =>
//                             accepterInvitation(
//                               like.user.id,
//                               state.access_token,
//                               dispatchEvent
//                             )
//                           }
//                           className="text-xs font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-400"
//                         >
//                           Accepter
//                         </button>
//                       </div>
//                     ) : (
//                       like.user.id !== state.user.id && (
//                         // No relation
//                         <button
//                           onClick={() =>
//                             envoyerInvitation(
//                               like.user.id,
//                               state.access_token,
//                               dispatchEvent
//                             )
//                           }
//                           className="rounded-full bg-gray-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-700"
//                         >
//                           Ajouter
//                         </button>
//                       )
//                     )}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <div className="py-8 text-center text-gray-500 dark:text-gray-400">
//               <p>Aucun like pour le moment</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LikesSection;



"use client";

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { Avatar } from "@/components/ui/avatar";
// import { X, UserPlus, UserMinus, Clock, Check, XIcon } from "lucide-react";
// import { useState, useEffect } from "react";
// import "../../../style/globale.css";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   refuserInvitation,
//   accepterInvitation,
//   envoyerInvitation,
//   annulerInvitation,
//   AnnulerAmis,
// } from "./InviationActions";

// function LikesSection({ postId, toggleSHowLikes, SetPosts }) {
//   const [UersLikes, setUersLikes] = useState([]);
//   const state = useSelector((state) => state);
//   const dispatchEvent = useDispatch();

//   useEffect(() => {
//     const fetchData = async () => {
//       const respons = await fetch(`/api/likes/users/${postId}`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${state.access_token}`,
//         },
//       });
//       const res = await respons.json();
//       setUersLikes(res);
//       SetPosts(res);
//     };
//     fetchData();
//   }, [postId, state.access_token, SetPosts]);

//   return (
//     UersLikes   ?
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/30 backdrop-blur-sm"
//         onClick={toggleSHowLikes}
//       ></div>

//       <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden">
//         {/* Header */}
//         <div className="px-6 pt-6 pb-4">
//           <div className="flex items-center justify-between mb-2">
//             <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
//               Likes
//             </h3>
//             <button
//               type="button"
//               onClick={toggleSHowLikes}
//               className="rounded-full p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-200 dark:hover:bg-neutral-800"
//             >
//               <X size={18} />
//             </button>
//           </div>
//           <p className="text-sm text-neutral-500 dark:text-neutral-400">
//             {UersLikes.length}{" "}
//             {UersLikes.length === 1 ? "personne a aimé" : "personnes ont aimé"}{" "}
//             ce post
//           </p>
//         </div>

//         {/* User List */}
//         <div className="max-h-[60vh] overflow-y-auto">
//           {UersLikes && UersLikes.length > 0 ? (
//             <ul>
//               {UersLikes.map((like, index) => (
//                 <li
//                   key={index}
//                   className="px-6 py-3 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors duration-150"
//                 >
//                   {/* User Info */}
//                   <div className="flex items-center space-x-3">
//                     <Avatar className="h-10 w-10 flex-shrink-0">
//                       {like.user.image_profile_url ? (
//                         <img
//                           src={
//                             like.user.image_profile_url || "/placeholder.svg"
//                           }
//                           alt={like.user.name}
//                           className="h-full w-full rounded-full object-cover"
//                         />
//                       ) : (
//                         <div className="h-full w-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-700 rounded-full">
//                           <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
//                             {like.user.name.charAt(0).toUpperCase()}
//                           </span>
//                         </div>
//                       )}
//                     </Avatar>
//                     <span className="text-sm font-medium text-neutral-900 dark:text-white">
//                       {like.user.name}
//                     </span>
//                   </div>

//                   {/* Action Buttons with Icons */}
//                   {state.friends.some((fr) => fr.id === like.user.id) ? (
//                     // Already friends
//                     <button
//                       onClick={() =>
//                         AnnulerAmis(
//                           like.user.id,
//                           state.access_token,
//                           dispatchEvent
//                         )
//                       }
//                       className="flex items-center space-x-1 text-xs font-medium text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
//                     >
//                       <UserMinus size={14} />
//                       <span>Annuler</span>
//                     </button>
//                   ) : state.invitationsEnvoyees.some(
//                       (inv) => inv.id === like.user.id
//                     ) ? (
//                     // Invitation sent
//                     <button
//                       onClick={() =>
//                         annulerInvitation(
//                           like.user.id,
//                           state.access_token,
//                           dispatchEvent
//                         )
//                       }
//                       className="flex items-center space-x-1 text-xs font-medium text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
//                     >
//                       <Clock size={14} />
//                       <span>En attente</span>
//                     </button>
//                   ) : state.invitationsRecues.some(
//                       (inv) => inv.id === like.user.id
//                     ) ? (
//                     // Invitation received
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() =>
//                           refuserInvitation(like.user.id, state.access_token)
//                         }
//                         className="flex items-center justify-center p-1.5 rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hover:bg-neutral-800"
//                       >
//                         <XIcon size={14} />
//                       </button>
//                       <button
//                         onClick={() =>
//                           accepterInvitation(
//                             like.user.id,
//                             state.access_token,
//                             dispatchEvent
//                           )
//                         }
//                         className="flex items-center justify-center p-1.5 rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hover:bg-neutral-800"
//                       >
//                         <Check size={14} />
//                       </button>
//                     </div>
//                   ) : (
//                     like.user.id !== state.user.id && (
//                       // No relation
//                       <button
//                         onClick={() =>
//                           envoyerInvitation(
//                             like.user.id,
//                             state.access_token,
//                             dispatchEvent
//                           )
//                         }
//                         className="flex items-center space-x-1 rounded-full bg-neutral-900 dark:bg-white px-3 py-1.5 text-xs font-medium text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200"
//                       >
//                         <UserPlus size={14} />
//                         <span>Ajouter</span>
//                       </button>
//                     )
//                   )}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//               ""
//             // <div className="py-12 text-center text-neutral-500 dark:text-neutral-400">
//             //   <p>Aucun like pour le moment</p>
//             // </div>
//           )}
//         </div>
//       </div>
//       </div> :
//       'attendr'
//   );
// }

// export default LikesSection;













import { Avatar } from "@/components/ui/avatar";
import { X, UserPlus, UserMinus, Clock, Check, XIcon } from "lucide-react";
import { useState, useEffect } from "react";
import "../../../style/globale.css";
import { useDispatch, useSelector } from "react-redux";
import {
  refuserInvitation,
  accepterInvitation,
  envoyerInvitation,
  annulerInvitation,
  AnnulerAmis,
} from "./InviationActions";

function LikesSection({ postId, toggleSHowLikes, }) {
  const [UersLikes, setUersLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const state = useSelector((state) => state);
  const dispatchEvent = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const respons = await fetch(`/api/likes/users/${postId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${state.access_token}`,
          },
        });
        const res = await respons.json();
        console.log("Likes data:", res);
        setUersLikes(res);
      } catch (error) {
        console.error("Erreur lors du chargement des likes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
     console.log("Fetching likes for postId:", postId);
  }, [postId, state.access_token]);
  
  // console.log(UersLikes);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={toggleSHowLikes}
      ></div>

      <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              Likes
            </h3>
            <button
              type="button"
              onClick={toggleSHowLikes}
              className="rounded-full p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-200 dark:hover:bg-neutral-800"
            >
              <X size={18} />
            </button>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {isLoading
              ? "Chargement..."
              : `${UersLikes.length} ${
                  UersLikes.length === 1
                    ? "personne a aimé"
                    : "personnes ont aimé"
                } ce post`}
          </p>
        </div>

        {/* User List */}
        <div className="h-[60vh] overflow-y-auto">
          {isLoading ? (
            // Indicateur de chargement intégré
            <div className="py-12 flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full border-4 border-neutral-200 dark:border-neutral-700 border-t-neutral-900 dark:border-t-white animate-spin mb-4"></div>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                Chargement des likes...
              </p>
            </div>
          ) : UersLikes && UersLikes.length > 0 ? (
            <ul>
              {UersLikes.map((like, index) => (
                <li
                  key={index}
                  className="px-6 py-3 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors duration-150"
                >
                  {/* User Info */}
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      {like.user.image_profile_url ? (
                        <img
                          src={
                            like.user.image_profile_url || "/placeholder.svg"
                          }
                          alt={like.user.name}
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-700 rounded-full">
                          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                            {like.user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </Avatar>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">
                      {like.user.name}
                    </span>
                  </div>

                  {/* Action Buttons with Icons */}
                  {state.friends.some((fr) => fr.id === like.user.id) ? (
                    // Already friends
                    <button
                      onClick={() =>
                        AnnulerAmis(
                          like.user.id,
                          state.access_token,
                          dispatchEvent
                        )
                      }
                      className="flex items-center space-x-1 text-xs font-medium text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                    >
                      <UserMinus size={14} />
                      <span>Annuler</span>
                    </button>
                  ) : state.invitationsEnvoyees.some(
                      (inv) => inv.id === like.user.id
                    ) ? (
                    // Invitation sent
                    <button
                      onClick={() =>
                        annulerInvitation(
                          like.user.id,
                          state.access_token,
                          dispatchEvent
                        )
                      }
                      className="flex items-center space-x-1 text-xs font-medium text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                    >
                      <Clock size={14} />
                      <span>En attente</span>
                    </button>
                  ) : state.invitationsRecues.some(
                      (inv) => inv.id === like.user.id
                    ) ? (
                    // Invitation received
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          refuserInvitation(like.user.id, state.access_token)
                        }
                        className="flex items-center justify-center p-1.5 rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hover:bg-neutral-800"
                      >
                        <XIcon size={14} />
                      </button>
                      <button
                        onClick={() =>
                          accepterInvitation(
                            like.user.id,
                            state.access_token,
                            dispatchEvent
                          )
                        }
                        className="flex items-center justify-center p-1.5 rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hover:bg-neutral-800"
                      >
                        <Check size={14} />
                      </button>
                    </div>
                  ) : (
                    like.user.id !== state.user.id && (
                      // No relation
                      <button
                        onClick={() =>
                          envoyerInvitation(
                            like.user.id,
                            state.access_token,
                            dispatchEvent
                          )
                        }
                        className="flex items-center space-x-1 rounded-full bg-neutral-900 dark:bg-white px-3 py-1.5 text-xs font-medium text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200"
                      >
                        <UserPlus size={14} />
                        <span>Ajouter</span>
                      </button>
                    )
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-12 text-center text-neutral-500 dark:text-neutral-400">
              <p>Aucun like pour le moment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LikesSection;
