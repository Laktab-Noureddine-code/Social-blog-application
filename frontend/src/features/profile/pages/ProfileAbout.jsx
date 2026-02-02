// // import {
// //   Calendar,
// //   Briefcase,
// //   Users,
// //   Globe,
// //   MapPin,
// //   MoreHorizontal,
// //   Phone,
// //   Mail,
// // } from "lucide-react";
// // import { useSelector } from "react-redux";
// // import Text from "@/shared/helpers/Text";
// // import { formatDateToShort, formatPhoneNumber } from "@/shared/helpers/helper";
// // // import ImagesAboitPage from "./ImagesAboitPage";
// // // import VideosAboitPage from "./VideosAboitPage";
// // import ImagesAboitProfile from "./ImagesAboitProfile";
// // import VideosPreviewProfile from "./VideosAboitPage";
// // function ProfileAbout() {
// //   const state = useSelector(state => state.profile)
// //   return (
// //     <div className="w-full sticky top-20 max-h-[80vh] overflow-y-auto">
// //       <div className=" bg-white border rounded-2xl overflow-hidden shadow-lg p-2">
// //         <div className="flex justify-between items-center py-2">
// //           <div className="font-bold">About {state.user.name}</div>
// //           <button>
// //             <MoreHorizontal size={18} className="text-gray-500" />
// //           </button>
// //         </div>
// //         <div className="border-b py-1" />
// //         <div className="text-gray-700 mt-2 max-h-[400px]">
// //           {state.user.description && (
// //             <p className="text-sm mb-4">
// //               <Text text={state.user.description} />
// //             </p>
// //           )}

// //           {state.user.location && (
// //             <div className="flex items-center mb-2 text-sm text-gray-600">
// //               <MapPin size={16} className="mr-2" />
// //               <span>{state.user.location}</span>
// //             </div>
// //           )}

// //           {state.user.website && (
// //             <div className="flex items-center mb-2 text-sm text-gray-600">
// //               <Globe size={16} className="mr-2" />
// //               <span>{state.user.website}</span>
// //             </div>
// //           )}

// //           {state.user.created_at && (
// //             <div className="flex items-center mb-2 text-sm text-gray-600">
// //               <Calendar size={16} className="mr-2" />
// //               <span>{formatDateToShort(state.user.created_at)}</span>
// //             </div>
// //           )}
// //           {state.user.phone && (
// //             <div className="flex items-center mb-2 text-sm text-gray-600">
// //               <Phone size={16} className="mr-2" />
// //               {/* <span>0612345678</span> */}
// //               <span>{formatPhoneNumber("+33123456")}</span>
// //             </div>
// //           )}
// //           {state.user.email && (
// //             <div className="flex items-center mb-2 text-sm text-gray-600">
// //               <Mail size={16} className="mr-2" />
// //               {/* <span>0612345678</span> */}
// //               <span>{state.user.email}</span>
// //             </div>
// //           )}

// //           <div className="flex items-center mb-2 text-sm text-gray-600">
// //             <Briefcase size={16} className="mr-2" />
// //             <span>Working at Sebu Studio</span>
// //           </div>

// //           <div className="flex items-center mb-2 text-sm text-gray-600">
// //             <Users size={16} className="mr-2" />
// //             <span>In relationship with Icut Gadis</span>
// //           </div>
// //         </div>
// //       </div>
// //       <ImagesAboitProfile />
// //       <VideosPreviewProfile />
// //     </div>
// //   );
// // }

// // export default ProfileAbout;


// import {
//   Calendar,
//   Briefcase,
//   Users,
//   Globe,
//   MapPin,
//   MoreHorizontal,
//   Phone,
//   Mail,
//   UserPlus,
// } from "lucide-react";
// import { useSelector } from "react-redux";
// import Text from "@/shared/helpers/Text";
// import { formatDateToShort, formatPhoneNumber } from "@/shared/helpers/helper";
// import ImagesAboitProfile from "./ImagesAboitProfile";
// import VideosPreviewProfile from "./VideosAboitPage";

// function ProfileAbout() {
//   const state = useSelector((state) => state.profile);
//   const user = state.user;

//   return (
//     <div className="w-full sticky top-20 max-h-[80vh] overflow-y-auto">
//       <div className="bg-white border rounded-2xl overflow-hidden shadow-lg p-2">
//         <div className="flex justify-between items-center py-2">
//           <div className="font-bold">About {user.name}</div>
//           <button>
//             <MoreHorizontal size={18} className="text-gray-500" />
//           </button>
//         </div>

//         <div className="border-b py-1" />

//         <div className="text-gray-700 mt-2 max-h-[400px]">
//           {user.description && (
//             <p className="text-sm mb-4">
//               <Text text={user.description} />
//             </p>
//           )}

//           {user.localisation && (
//             <div className="flex items-center mb-2 text-sm text-gray-600">
//               <MapPin size={16} className="mr-2" />
//               <span>{user.localisation}</span>
//             </div>
//           )}

//           {user.website && (
//             <div className="flex items-center mb-2 text-sm text-gray-600">
//               <Globe size={16} className="mr-2" />
//               <span>{user.website}</span>
//             </div>
//           )}

//           {user.date_naiss && (
//             <div className="flex items-center mb-2 text-sm text-gray-600">
//               <Calendar size={16} className="mr-2" />
//               <span>Born: {formatDateToShort(user.date_naiss)}</span>
//             </div>
//           )}
//           {user.createdAt && (
//             <div className="flex items-center mb-2 text-sm text-gray-600">
//               <UserPlus size={16} className="mr-2" /> {/* Different icon */}
//               <span>Joined: {formatDateToShort(user.createdAt)}</span>
//             </div>
//           )}

//           {user.telephone && (
//             <div className="flex items-center mb-2 text-sm text-gray-600">
//               <Phone size={16} className="mr-2" />
//               <span>{formatPhoneNumber(user.telephone)}</span>
//             </div>
//           )}

//           {user.email && (
//             <div className="flex items-center mb-2 text-sm text-gray-600">
//               <Mail size={16} className="mr-2" />
//               <span>{user.email}</span>
//             </div>
//           )}

//           {user.workplace && (
//             <div className="flex items-center mb-2 text-sm text-gray-600">
//               <Briefcase size={16} className="mr-2" />
//               <span>Working at {user.workplace}</span>
//             </div>
//           )}

//           {user.relationship_status && user.partner && (
//             <div className="flex items-center mb-2 text-sm text-gray-600">
//               <Users size={16} className="mr-2" />
//               <span>In relationship with {user.partner}</span>
//             </div>
//           )}
//         </div>
//       </div>

//       <ImagesAboitProfile />
//       <VideosPreviewProfile />
//     </div>
//   );
// }

// export default ProfileAbout;

import {
  Calendar,
  Briefcase,
  Users,
  Globe,
  MapPin,
  MoreHorizontal,
  Phone,
  Mail,
  UserPlus,
  User,
  Heart,
  Building,
} from "lucide-react";
import { useSelector } from "react-redux";
import Text from "@/shared/helpers/Text";
import { formatDateToShort, formatPhoneNumber } from "@/shared/helpers/helper";
import ImagesAboitProfile from "./ImagesAboitProfile";
import VideosPreviewProfile from "./VideosAboitPage";

function ProfileAbout() {
  const state = useSelector((state) => state.profile);
  const user = state.user;

  // Function to format relationship status for display
  const formatRelationshipStatus = (status) => {
    if (!status) return "";

    const statusMap = {
      single: "Single",
      in_relationship: "In a relationship",
      engaged: "Engaged",
      married: "Married",
      complicated: "It's complicated",
    };

    return statusMap[status] || status;
  };

  // Function to format gender for display
  const formatGender = (gender) => {
    if (!gender) return "";

    const genderMap = {
      male: "Male",
      female: "Female",
      other: "Other",
    };

    return genderMap[gender] || gender;
  };

  return (
    <div className="w-full sticky top-20 max-h-[80vh] overflow-y-auto">
      <div className="bg-white border rounded-2xl overflow-hidden shadow-lg p-4">
        <div className="flex justify-between items-center py-2">
          <div className="font-bold text-lg">About {user.name}</div>
          <button>
            <MoreHorizontal size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="border-b py-1 mb-3" />

        <div className="text-gray-700 space-y-3">
          {/* Bio/Description */}
          {user.description && (
            <div className="mb-4">
              <p className="text-sm">
                <Text text={user.description} />
              </p>
            </div>
          )}

          {/* Personal Information Section */}
          {(user.localisation ||
            user.gender ||
            user.date_naiss ||
            user.date_of_birth) && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Personal Information
              </h3>

              {/* Location */}
              {user.localisation && (
                <div className="flex items-center mb-2 text-sm text-gray-600">
                  <MapPin size={16} className="mr-2 flex-shrink-0" />
                  <span>{user.localisation}</span>
                </div>
              )}

              {/* Gender */}
              {user.gender && (
                <div className="flex items-center mb-2 text-sm text-gray-600">
                  <User size={16} className="mr-2 flex-shrink-0" />
                  <span>{formatGender(user.gender)}</span>
                </div>
              )}

              {/* Birth Date */}
              {(user.date_naiss || user.date_of_birth) && (
                <div className="flex items-center mb-2 text-sm text-gray-600">
                  <Calendar size={16} className="mr-2 flex-shrink-0" />
                  <span>
                    Born on:{" "}
                    {formatDateToShort(user.date_naiss || user.date_of_birth)}
                  </span>
                </div>
              )}

              {/* Join Date */}
              {user.createdAt && (
                <div className="flex items-center mb-2 text-sm text-gray-600">
                  <UserPlus size={16} className="mr-2 flex-shrink-0" />
                  <span>
                    Member since: {formatDateToShort(user.createdAt)}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Contact Information Section */}
          {(user.telephone || user.email || user.website) && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Contact Information
              </h3>

              {/* Phone */}
              {user.telephone && (
                <div className="flex items-center mb-2 text-sm text-gray-600">
                  <Phone size={16} className="mr-2 flex-shrink-0" />
                  <span>{formatPhoneNumber(user.telephone)}</span>
                </div>
              )}

              {/* Email */}
              {user.email && (
                <div className="flex items-center mb-2 text-sm text-gray-600">
                  <Mail size={16} className="mr-2 flex-shrink-0" />
                  <span>{user.email}</span>
                </div>
              )}

              {/* Website */}
              {user.website && (
                <div className="flex items-center mb-2 text-sm text-gray-600">
                  <Globe size={16} className="mr-2 flex-shrink-0" />
                  <a
                    href={
                      user.website.startsWith("http")
                        ? user.website
                        : `https://${user.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {user.website}
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Work Information Section */}
          {(user.workplace || user.job_title) && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Professional Information
              </h3>

              {/* Workplace */}
              {user.workplace && (
                <div className="flex items-center mb-2 text-sm text-gray-600">
                  <Building size={16} className="mr-2 flex-shrink-0" />
                  <span>{user.workplace}</span>
                </div>
              )}

              {/* Job Title */}
              {user.job_title && (
                <div className="flex items-center mb-2 text-sm text-gray-600">
                  <Briefcase size={16} className="mr-2 flex-shrink-0" />
                  <span>{user.job_title}</span>
                </div>
              )}
            </div>
          )}

          {/* Relationship Status Section */}
          {(user.relationship_status || user.partner) && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Relationship Status
              </h3>

              {/* Relationship Status */}
              {user.relationship_status && (
                <div className="flex items-center mb-2 text-sm text-gray-600">
                  <Heart size={16} className="mr-2 flex-shrink-0" />
                  <span>
                    {formatRelationshipStatus(user.relationship_status)}
                  </span>
                </div>
              )}

              {/* Partner */}
              {user.relationship_status &&
                user.partner &&
                user.relationship_status !== "single" && (
                  <div className="flex items-center mb-2 text-sm text-gray-600">
                    <Users size={16} className="mr-2 flex-shrink-0" />
                    <span>In a relationship with {user.partner}</span>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>

      <ImagesAboitProfile />
      <VideosPreviewProfile />
    </div>
  );
}

export default ProfileAbout;
