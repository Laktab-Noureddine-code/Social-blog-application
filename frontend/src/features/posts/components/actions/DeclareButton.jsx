/* eslint-disable react/prop-types */
// import { useState } from "react";
// import { Flag, AlertTriangle } from "lucide-react";

// export default function DeclareButton() {
//   const [declared, setDeclared] = useState(false);
//   const [isHovering, setIsHovering] = useState(false);

//   const handleClick = () => {
//     setDeclared(!declared);
//   };

//   return (
//     <button
//       onClick={handleClick}
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}
//       className={`
//         relative overflow-hidden px-4 py-2.5 rounded-md font-medium text-sm
//         transition-all duration-300 ease-out w-full
//         ${
//           declared
//             ? "bg-amber-50 text-amber-600 border border-amber-200"
//             : "bg-white text-gray-700 border border-gray-200 hover:border-amber-300 hover:bg-amber-50/50"
//         }
//       `}
//     >
//       <div className="flex items-center gap-2">
//         <span
//           className={`transition-transform duration-300 ${
//             isHovering && !declared ? "rotate-12" : "rotate-0"
//           }`}
//         >
//           {declared ? <AlertTriangle size={18} /> : <Flag size={18} />}
//         </span>
//         <span>{declared ? "Reported" : "Declare"}</span>
//       </div>

//       {declared && (
//         <div
//           className="absolute inset-0 bg-amber-100 -z-10 origin-left"
//           style={{
//             animation: "expandWidth 0.5s ease-out forwards",
//           }}
//         ></div>
//       )}

//       <style>{`
//         @keyframes expandWidth {
//           from {
//             transform: scaleX(0);
//           }
//           to {
//             transform: scaleX(1);
//           }
//         }
//       `}</style>
//       <p className="text-xs text-gray-500">See fewer posts like this.</p>
//     </button>
//   );
// }

import { useEffect, useState } from "react";
import { Flag, AlertTriangle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeRapport } from "@/Redux/PostsSilce";
import api from "@/lib/api";

export default function DeclareButton({ post, setShow }) {
  const [declared, setDeclared] = useState(false);
  const state = useSelector((state) => state.auth);
  const [isHovering, setIsHovering] = useState(false);
  const dispatchEvent = useDispatch();

  useEffect(() => {
    const isDeclared = post.reports?.some((ele) => ele.id === state.user.id);
    setDeclared(isDeclared);
    // console.log(isDeclared);
  }, [post, state.user.id, dispatchEvent]);

  const handleUndeclare = async () => {
    try {
      const response = await api.delete(`/api/declare/${post.id}`);
      setDeclared(false);
      dispatchEvent(removeRapport({ idPost: post.id, response: response.data }));
    } catch (error) {
      console.error("Error undeclaring post:", error);
    }
  };

  const baseStyle = `
    relative overflow-hidden px-4 py-2.5 rounded-md font-medium text-sm
    transition-all duration-300 ease-out w-full
  `;

  const activeStyle = "bg-amber-50 text-amber-600 border border-amber-200";
  const defaultStyle =
    "bg-white text-gray-700 border border-gray-200 hover:border-amber-300 hover:bg-amber-50/50";

  const iconStyle = `transition-transform duration-300 ${
    isHovering && !declared ? "rotate-12" : "rotate-0"
  }`;

  return (
    <div className="space-y-2">
      {!declared ? (
        <button
          onClick={() => {
            setShow(true);
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={`${baseStyle} ${defaultStyle}`}
        >
          <div className="flex items-center gap-2">
            <span className={iconStyle}>
              <Flag size={18} />
            </span>
            <span>Report</span>
          </div>
          <p className="text-xs text-gray-500">
            See fewer posts like this.
          </p>
        </button>
      ) : (
        <button
          onClick={handleUndeclare}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={`${baseStyle} ${activeStyle}`}
        >
          <div className="flex items-center gap-2">
            <span className={iconStyle}>
              <AlertTriangle size={18} />
            </span>
            <span>Cancel Report</span>
          </div>
          <div
            className="absolute inset-0 bg-amber-100 -z-10 origin-left"
            style={{
              animation: "expandWidth 0.5s ease-out forwards",
            }}
          ></div>
          <p className="text-xs text-gray-500">Report sent.</p>
        </button>
      )}

      <style>{`
        @keyframes expandWidth {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
}
