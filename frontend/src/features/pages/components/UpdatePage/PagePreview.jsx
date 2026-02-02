/* eslint-disable react/prop-types */
import { Avatar } from "@/shared/ui/avatar";
import { AvatarImage } from "@/shared/ui/avatar";
import { useSelector } from "react-redux";


function PagePreview({
  PageName,
  phone,
  location,
  Pagecouverture,
  Page_image_profile,
  description,
  category,
  website,
  email,
}) {
  const user = useSelector((state) => state.auth.user);
 
  return (
    <div className="w-full h-screen bg-[#f0f2f5] p-4 flex justify-center ">
      <div className="w-full max-w-[850px] max-h-[95vh] bg-white rounded-md shadow-2xl  overflow-hidden">
        {/* Group banner */}
        {Pagecouverture ? (
          <img
            src={Pagecouverture || "/placeholder.svg"}
            alt="Group cover"
            className="w-full max-h-[230px] object-cover"
          />
        ) : (
          <div className="w-full max-h-[300px] overflow-hidden">
            <svg
              viewBox="0 0 800 300"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <rect width="800" height="300" fill="#e5e5e5" />
              <g transform="translate(50, 50)" opacity="0.6">
                <path
                  d="M100,100 Q150,50 200,100 T300,100 T400,100 T500,100"
                  fill="none"
                  stroke="#a0a0a0"
                  strokeWidth="2"
                />
                <circle cx="100" cy="80" r="30" fill="#c0c0c0" />
                <circle cx="200" cy="90" r="25" fill="#d0d0d0" />
                <circle cx="300" cy="70" r="35" fill="#b0b0b0" />
                <circle cx="400" cy="85" r="28" fill="#c5c5c5" />
                <rect
                  x="150"
                  y="150"
                  width="200"
                  height="100"
                  rx="10"
                  fill="#b8b8b8"
                />
                <path
                  d="M50,200 C100,150 200,250 300,200"
                  fill="none"
                  stroke="#a0a0a0"
                  strokeWidth="3"
                />
                <path
                  d="M350,220 C400,170 450,270 500,220"
                  fill="none"
                  stroke="#a0a0a0"
                  strokeWidth="3"
                />
                <circle cx="120" cy="180" r="15" fill="#d8d8d8" />
                <circle cx="420" cy="190" r="18" fill="#d8d8d8" />
                <rect x="180" y="120" width="30" height="60" fill="#909090" />
                <rect x="380" y="130" width="25" height="50" fill="#909090" />
              </g>
            </svg>
          </div>
        )}
        {/* Group content */}
        <div className="px-6 pt-4 pb-6">
          {/* Group name & privacy */}
          <h2 className="text-2xl font-semibold text-gray-700">{}</h2>

          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-4 border-white -mt-10">
              {Page_image_profile ? (
                <AvatarImage
                  src={Page_image_profile || "/placeholder.svg"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
                  <circle cx="40" cy="40" r="40" fill="#E5E7EB" />
                  <path
                    d="M40 40C45.5228 40 50 35.5228 50 30C50 24.4772 45.5228 20 40 20C34.4772 20 30 24.4772 30 30C30 35.5228 34.4772 40 40 40Z"
                    fill="#9CA3AF"
                  />
                  <path
                    d="M40 44C30.06 44 22 52.06 22 62C22 63.1046 22.8954 64 24 64H56C57.1046 64 58 63.1046 58 62C58 52.06 49.94 44 40 44Z"
                    fill="#9CA3AF"
                  />
                  <path
                    d="M56 30C56 35.5228 51.5228 40 46 40C40.4772 40 36 35.5228 36 30C36 24.4772 40.4772 20 46 20C51.5228 20 56 24.4772 56 30Z"
                    fill="#6B7280"
                  />
                  <path
                    d="M46 44C56.94 44 65 52.06 65 62C65 63.1046 64.1046 64 63 64H56C54.8954 64 54 63.1046 54 62C54 56.4772 50.5228 52 46 52C41.4772 52 38 56.4772 38 62C38 63.1046 37.1046 64 36 64H29C27.8954 64 27 63.1046 27 62C27 52.06 35.06 44 46 44Z"
                    fill="#6B7280"
                  />
                </svg>
              )}
            </Avatar>
            <div className="flex justify-between w-full items-center">
              <div className="flex-1 -mt-2">
                <h1
                  className={`text-2xl font-bold ${
                    !PageName && "text-gray-400"
                  }`}
                >
                  {PageName ? PageName : user.name}
                </h1>
              </div>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="mt-4 border-b border-gray-300">
            <ul className="flex space-x-6 text-sm text-gray-600">
              <li
                className={`font-semibold cursor-pointer hover:bg-gray-50 px-4 py-2  `}
              >
                Discussion
              </li>
              <li
                className={`font-semibold cursor-pointer hover:bg-gray-50 px-4 py-2  `}
              >
                People
              </li>
              <li
                className={`font-semibold cursor-pointer hover:bg-gray-50 px-4 py-2  `}
              >
                Events
              </li>
            </ul>
          </div>

          {/* À propos block */}
          <div className="mt-6 border border-gray-200 rounded-lg p-4">
            <h1 className="text-bold text-2xl">Info</h1>

            {description && (
              <div className="mb-4 mt-2">
                <p className="text-gray-700">{description}</p>
              </div>
            )}

            {category && (
              <h3 className="font-semibold text-gray-800 mb-2 text-base">
                Category: <span className="font-normal">{category}</span>
              </h3>
            )}


            {email && (
              <h3 className="font-semibold text-gray-800 mb-2 text-base">
                Email : <span className="font-normal">{email}</span>
              </h3>
            )}
            {phone && (
              <h3 className="font-semibold text-gray-800 mb-2 text-base">
                Phone: <span className="font-normal">{phone}</span>
              </h3>
            )}

            {website && (
              <h3 className="font-semibold text-gray-800 mb-2 text-base">
                Website: <span className="font-normal">{website}</span>
              </h3>
            )}
            {location && (
              <h3 className="font-semibold text-gray-800 mb-2 text-base">
                Location: <span className="font-normal">{location}</span>
              </h3>
            )}

            {/* <h3 className="font-semibold text-gray-800 mb-2 text-base">
              Localisation :{" "}
              <span className={`font-normal ${!location && "text-gray-400"}`}>
                {location ? location : "Maroc"}
              </span>
            </h3> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PagePreview;
