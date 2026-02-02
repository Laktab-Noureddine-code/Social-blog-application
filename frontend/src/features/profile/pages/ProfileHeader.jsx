// import { ImageUp, Settings } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useRef, useState } from "react";
// import UnknownCoverPhoto from "@/features/home/components/UnknownCoverPhoto";
// import Unknown from "@/features/home/components/Unknown";
// import { capitalizeEachWord } from "@/shared/helpers/helper";
// import CaseFriends from "@/components/pages/Publications/ActionsPublication/CaseFriends";
// import { ConfirmationModal } from "./ConfirmationModal";
// import { getUserProfile } from "@/Redux/ProfileSlice";

// function ProfileHeader() {
//   const state = useSelector((state) => state.profile);
//   const stateAuth = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   const coverInputRef = useRef(null);
//   const profileInputRef = useRef(null);

//   // Modal states
//   const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
//   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
//   const [pendingCoverUpload, setPendingCoverUpload] = useState(null);
//   const [pendingProfileUpload, setPendingProfileUpload] = useState(null);

//   // Separate loading states
//   const [isCoverUploading, setIsCoverUploading] = useState(false);
//   const [isProfileUploading, setIsProfileUploading] = useState(false);

//   const handleUpload = async (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Convert image to Base64
//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     reader.onload = () => {
//       const base64Image = reader.result.split(",")[1];
//       if (type === "cover") {
//         setPendingCoverUpload(base64Image);
//         setIsCoverModalOpen(true);
//       } else {
//         setPendingProfileUpload(base64Image);
//         setIsProfileModalOpen(true);
//       }
//     };

//     reader.onerror = () => {
//       alert("Erreur lors de la lecture du fichier");
//     };
//   };

//   const confirmCoverUpload = async () => {
//     if (!pendingCoverUpload) return;
//     setIsCoverUploading(true);

//     try {
//       const response = await fetch(`/api/user/cover/${state.user.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${stateAuth.access_token}`,
//         },
//         body: JSON.stringify({ image: pendingCoverUpload }),
//       });

//       const res = await response.json();

//       if (response.ok) {
//         dispatch(getUserProfile(res));
//       } else {
//         throw new Error(res.message || "Failed to update cover photo");
//       }
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setIsCoverUploading(false);
//       setIsCoverModalOpen(false);
//       setPendingCoverUpload(null);
//     }
//   };

//   const confirmProfileUpload = async () => {
//     if (!pendingProfileUpload) return;
//     setIsProfileUploading(true);

//     try {
//       const response = await fetch(`/api/user/profile-image/${state.user.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${stateAuth.access_token}`,
//         },
//         body: JSON.stringify({ image: pendingProfileUpload }),
//       });

//       const res = await response.json();

//       if (response.ok) {
//         dispatch(getUserProfile(res));
//       } else {
//         throw new Error(res.message || "Failed to update profile photo");
//       }
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setIsProfileUploading(false);
//       setIsProfileModalOpen(false);
//       setPendingProfileUpload(null);
//     }
//   };

//   return (
//     state.user.id && (
//       <>
//         <div className="bg-white border rounded-2xl overflow-hidden shadow-sm relative">
//           {/* Cover Image Section */}
//           <div className="h-37 md:h-48 lg:h-72 relative">
//             {state.user.couverture_url ? (
//               <img
//                 src={state.user.couverture_url}
//                 alt="Cover"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <UnknownCoverPhoto />
//             )}

//             <div className="absolute bottom-0 left-0 right-0 md:h-40 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

//             {stateAuth.user.id === state.user.id && (
//               <div className="absolute bottom-4 right-4 z-10">
//                 {/* Button container with proper sizing */}
//                 <label className="relative inline-flex">
//                   {/* Visible button - using label instead of button for better file input handling */}
//                   <div
//                     className={`flex items-center justify-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg shadow-xl hover:bg-gray-200 transition ${
//                       isCoverUploading
//                         ? "opacity-70 cursor-not-allowed"
//                         : "cursor-pointer"
//                     } max-w-[260px] `}
//                   >
//                     <ImageUp size={20} />
//                     <span className="hidden md:block">
//                       {isCoverUploading
//                         ? "Envoi en cours..."
//                         : "Modifier la couverture"}
//                     </span>
//                     <span className="block md:hidden">
//                       {isCoverUploading ? "..." : ""}
//                     </span>
//                   </div>

//                   {/* Hidden file input */}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     ref={coverInputRef}
//                     onChange={(e) =>
//                       !isCoverUploading && handleUpload(e, "cover")
//                     }
//                     className="absolute inset-0 w-full h-full opacity-0 overflow-hidden"
//                     style={{
//                       fontSize: "100px",
//                     }} /* Makes the input area large */
//                     disabled={isCoverUploading}
//                   />
//                 </label>
//               </div>
//             )}
//           </div>

//           {/* Profile Image Section */}
//           <div className="flex md:relative justify-between md:flex-row flex-col items-center gap-4 px-5 -mt-16 ">
//             <div className="relative w-[80%]">
//               <div className="relative">
//                 <div className="relative rounded-full border-4 bg-gray-900 border-gray-200 overflow-hidden md:h-35 md:w-35 h-28 w-28 cursor-pointer">
//                   {state.user.image_profile_url ? (
//                     <img
//                       src={state.user.image_profile_url}
//                       alt="Profile"
//                       className="w-full h-full object-cover rounded-full"
//                     />
//                   ) : (
//                     <Unknown />
//                   )}
//                 </div>
//                 {stateAuth.user.id === state.user.id && (
//                   <button
//                     onClick={() => profileInputRef.current.click()}
//                     className="flex items-center shadow-lg justify-center w-10 h-10 bg-white rounded-full cursor-pointer border absolute md:top-22 md:left-27 top-17 left-20"
//                     disabled={isProfileUploading}
//                   >
//                     <Settings color="black" size={20} />
//                   </button>
//                 )}
//                 <input
//                   type="file"
//                   accept="image/*"
//                   ref={profileInputRef}
//                   onChange={(e) => handleUpload(e, "profile")}
//                   className="hidden"
//                   disabled={isProfileUploading}
//                 />
//               </div>
//               <div className="md:absolute md:bottom-8 left-40 flex flex-col gap-3 top-15">
//                 <h1 className="text-xl md:text-xl lg:text-3xl font-bold text-gray-800 mt-1 w-full">
//                   {capitalizeEachWord(state.user.name)}
//                 </h1>
//                 <p className="md:ml-2 text-gray-400 font-mono text-sm p-0 relative top-[-18px]">
//                   {state.amis.length} Amis
//                 </p>
//               </div>
//             </div>
//             <div className="md:z-10 relative md:top-10">
//               <CaseFriends Id={state.user.id} />
//             </div>
//           </div>

//           {/* Navigation Section */}
//           <div className="flex flex-wrap md:-mt-10 justify-center md:justify-end gap-4 px-5 md:pt-10 py-4 border-b border-gray-200">
//             {["Publications", "Les Amis", "Les Photos", "Les Videos"].map(
//               (label, index) => {
//                 const paths = ["", "/amis", "/images", "/videos"];
//                 return (
//                   <div className="text-center" key={index}>
//                     <Link
//                       to={`/profile/${state.user.id}${paths[index]}`}
//                       className="text-gray-600 text-sm md:text-lg font-bold block hover:underline"
//                     >
//                       {label}
//                     </Link>
//                   </div>
//                 );
//               }
//             )}
//             {stateAuth.user.id === state.user.id && <div className="text-center">
//               <Link
//                 to={`/profile/${state.user.id}/update`}
//                 className="text-gray-600 text-sm md:text-lg font-bold block hover:underline"
//               >
//                 Edite
//               </Link>
//             </div>}
//           </div>
//         </div>

// <<<<<<< HEAD
//         {/* Cover Photo Confirmation Modal */}
//         <ConfirmationModal
//           isOpen={isCoverModalOpen}
//           onClose={() => {
//             setIsCoverModalOpen(false);
//             setPendingCoverUpload(null);
//           }}
//           onConfirm={confirmCoverUpload}
//           title="Modifier la photo de couverture"
//           message="Voulez-vous vraiment modifier cette photo de couverture ?"
//           confirmText={isCoverUploading ? "Envoi en cours..." : "Modifier"}
//           cancelText="Annuler"
//           isConfirming={isCoverUploading}
//         />

//         {/* Profile Photo Confirmation Modal */}
//         <ConfirmationModal
//           isOpen={isProfileModalOpen}
//           onClose={() => {
//             setIsProfileModalOpen(false);
//             setPendingProfileUpload(null);
//           }}
//           onConfirm={confirmProfileUpload}
//           title="Modifier la photo de profil"
//           message="Voulez-vous vraiment modifier cette photo de profil ?"
//           confirmText={isProfileUploading ? "Envoi en cours..." : "Modifier"}
//           cancelText="Annuler"
//           isConfirming={isProfileUploading}
//         />
//       </>
// =======
//         {/* Stats */}
//         <div className="flex flex-wrap md:-mt-10 justify-center md:justify-end gap-4 px-5 md:pt-10 py-4 border-b border-gray-200 ">
//           <div className="text-center">
//             <Link
//               to={`/profile/${state.user.id}`}
//               className="text-gray-600 text-sm md:text-lg font-bold block hover:underline"
//             >
//               Publications
//             </Link>
//           </div>
//           <div className="text-center">
//             <Link
//               to={`/profile/${state.user.id}/articles`}
//               className="text-gray-600 text-sm md:text-lg font-bold block hover:underline"
//             >
//               Articles
//             </Link>
//           </div>
//           <div className="text-center">
//             <Link
//               className="text-gray-600 text-sm md:text-lg font-bold block hover:underline"
//               to={`/profile/${state.user.id}/amis`}
//             >
//               Les Amis
//             </Link>
//           </div>
//           <div className="text-center">
//             <Link
//               to={`/profile/${state.user.id}/images`}
//               className="text-gray-600 text-sm md:text-lg font-bold block hover:underline"
//             >
//               Les Photos
//             </Link>
//           </div>
//           <div className="text-center">
//             <Link
//               to={`/profile/${state.user.id}/videos`}
//               className="text-gray-600 text-sm md:text-lg font-bold block hover:underline"
//             >
//               Les Videos
//             </Link>
//           </div>

//         </div>
//       </div>
// >>>>>>> 1fc7c82a87fac63603f53d9f7e30ac5ccac045dd
//     )
//   );
// }

// export default ProfileHeader;






import { ImageUp, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import UnknownCoverPhoto from "@/features/home/components/UnknownCoverPhoto";
import Unknown from "@/features/home/components/Unknown";
import { capitalizeEachWord } from "@/shared/helpers/helper";
import CaseFriends from "@/features/posts/components/actions/CaseFriends";
import { ConfirmationModal } from "./ConfirmationModal";
import { getUserProfile } from "@/Redux/ProfileSlice";
import api from "@/lib/api";

function ProfileHeader() {
  const state = useSelector((state) => state.profile);
  const stateAuth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const coverInputRef = useRef(null);
  const profileInputRef = useRef(null);

  // Modal states
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [pendingCoverUpload, setPendingCoverUpload] = useState(null);
  const [pendingProfileUpload, setPendingProfileUpload] = useState(null);

  // Separate loading states
  const [isCoverUploading, setIsCoverUploading] = useState(false);
  const [isProfileUploading, setIsProfileUploading] = useState(false);

  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64Image = reader.result.split(",")[1];
      if (type === "cover") {
        setPendingCoverUpload(base64Image);
        setIsCoverModalOpen(true);
      } else {
        setPendingProfileUpload(base64Image);
        setIsProfileModalOpen(true);
      }
    };

    reader.onerror = () => {
      alert("Error reading file");
    };
  };

  const confirmCoverUpload = async () => {
    if (!pendingCoverUpload) return;
    setIsCoverUploading(true);

    try {
      const response = await api.put(`/api/user/cover/${state.user.id}`, {
        image: pendingCoverUpload,
      });

      dispatch(getUserProfile(response.data));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update cover photo");
    } finally {
      setIsCoverUploading(false);
      setIsCoverModalOpen(false);
      setPendingCoverUpload(null);
    }
  };

  const confirmProfileUpload = async () => {
    if (!pendingProfileUpload) return;
    setIsProfileUploading(true);

    try {
      const response = await api.put(`/api/user/profile-image/${state.user.id}`, {
        image: pendingProfileUpload,
      });

      dispatch(getUserProfile(response.data));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update profile photo");
    } finally {
      setIsProfileUploading(false);
      setIsProfileModalOpen(false);
      setPendingProfileUpload(null);
    }
  };

  return (
    state.user.id && (
      <>
        <div className="bg-white border rounded-2xl overflow-hidden shadow-sm relative">
          {/* Cover Image Section */}
          <div className="h-37 md:h-48 lg:h-72 relative">
            {state.user.couverture_url ? (
              <img
                src={state.user.couverture_url}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <UnknownCoverPhoto />
            )}

            <div className="absolute bottom-0 left-0 right-0 md:h-40 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

            {stateAuth.user.id === state.user.id && (
              <div className="absolute bottom-4 right-4 z-10">
                <label className="relative inline-flex">
                  <div
                    className={`flex items-center justify-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg shadow-xl hover:bg-gray-200 transition ${isCoverUploading
                        ? "opacity-70 cursor-not-allowed"
                        : "cursor-pointer"
                      } max-w-[260px]`}
                  >
                    <ImageUp size={20} />
                    <span className="hidden md:block">
                      {isCoverUploading
                        ? "Uploading..."
                        : "Edit Cover"}
                    </span>
                    <span className="block md:hidden">
                      {isCoverUploading ? "..." : ""}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={coverInputRef}
                    onChange={(e) =>
                      !isCoverUploading && handleUpload(e, "cover")
                    }
                    className="absolute inset-0 w-full h-full opacity-0 overflow-hidden"
                    style={{ fontSize: "100px" }}
                    disabled={isCoverUploading}
                  />
                </label>
              </div>
            )}
          </div>

          {/* Profile Image Section */}
          <div className="flex md:relative justify-between md:flex-row flex-col items-center gap-4 px-5 -mt-16">
            <div className="relative w-[80%]">
              <div className="relative">
                <div className="relative rounded-full border-4 bg-gray-900 border-gray-200 overflow-hidden md:h-35 md:w-35 h-28 w-28 cursor-pointer">
                  {state.user.image_profile_url ? (
                    <img
                      src={state.user.image_profile_url}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <Unknown />
                  )}
                </div>
                {stateAuth.user.id === state.user.id && (
                  <button
                    onClick={() => profileInputRef.current.click()}
                    className="flex items-center shadow-lg justify-center w-10 h-10 bg-white rounded-full cursor-pointer border absolute md:top-22 md:left-27 top-17 left-20"
                    disabled={isProfileUploading}
                  >
                    <Settings color="black" size={20} />
                  </button>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={profileInputRef}
                  onChange={(e) => handleUpload(e, "profile")}
                  className="hidden"
                  disabled={isProfileUploading}
                />
              </div>
              <div className="md:absolute md:bottom-8 left-40 flex flex-col gap-3 top-15">
                <h1 className="text-xl md:text-xl lg:text-3xl font-bold text-gray-800 mt-1 w-full">
                  {capitalizeEachWord(state.user.name)}
                </h1>
                <p className="md:ml-2 text-gray-400 font-mono text-sm p-0 relative top-[-18px]">
                  {state.amis.length} Friends
                </p>
              </div>
            </div>
            <div className="md:z-10 relative md:top-10">
              <CaseFriends Id={state.user.id} />
            </div>
          </div>

          {/* Navigation Section */}
          <div className="flex flex-wrap md:-mt-10 justify-center md:justify-end gap-4 px-5 md:pt-10 py-4 border-b border-gray-200">
            {[
              { label: "Posts", path: "" },
              { label: "Articles", path: "/articles" },
              { label: "Friends", path: "/amis" },
              { label: "Photos", path: "/images" },
              { label: "Videos", path: "/videos" },
            ].map(({ label, path }, index) => (
              <div className="text-center" key={index}>
                <Link
                  to={`/profile/${state.user.id}${path}`}
                  className="text-gray-600 text-sm md:text-lg font-bold block hover:underline"
                >
                  {label}
                </Link>
              </div>
            ))}
            {stateAuth.user.id === state.user.id && (
              <div className="text-center">
                <Link
                  to={`/profile/${state.user.id}/update`}
                  className="text-gray-600 text-sm md:text-lg font-bold block hover:underline"
                >
                  Edite
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Cover Photo Confirmation Modal */}
        <ConfirmationModal
          isOpen={isCoverModalOpen}
          onClose={() => {
            setIsCoverModalOpen(false);
            setPendingCoverUpload(null);
          }}
          onConfirm={confirmCoverUpload}
          title="Edit Cover Photo"
          message="Are you sure you want to change this cover photo?"
          confirmText={isCoverUploading ? "Uploading..." : "Update"}
          cancelText="Cancel"
          isConfirming={isCoverUploading}
        />

        {/* Profile Photo Confirmation Modal */}
        <ConfirmationModal
          isOpen={isProfileModalOpen}
          onClose={() => {
            setIsProfileModalOpen(false);
            setPendingProfileUpload(null);
          }}
          onConfirm={confirmProfileUpload}
          title="Edit Profile Photo"
          message="Are you sure you want to change this profile photo?"
          confirmText={isProfileUploading ? "Uploading..." : "Update"}
          cancelText="Cancel"
          isConfirming={isProfileUploading}
        />
      </>
    )
  );
}

export default ProfileHeader;
