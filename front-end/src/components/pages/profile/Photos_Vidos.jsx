/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Photos_Vidos({ medias, setShowAllMedais, showAllMedais }) {
  const location = useLocation();
  const isImagesPage = location.pathname.includes("/images");
    const isVideosPage = location.pathname.includes("/videos");
    const state = useSelector(state => state.profile)
    const {id} = useParams()

  return (
    <div>
      <div className=" my-4 pb-4 bg-white border rounded-2xl overflow-hidden p-2 shadow-lg">
        <div>
          <div className="py-2 px-2">
            <div className="flex justify-between items-center">
              <div className="font-bold">Photos and Videos</div>
              <Link
                to={
                  isImagesPage || isVideosPage
                    ? `/profile/${id}`
                    : `/profile/${id}/images`
                }
                className="text-blue-500 text-sm cursor-pointer"
                onClick={setShowAllMedais}Pr
              >
                {isImagesPage || isVideosPage ? "Voir moin" : "Voir tous"}
              </Link>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {state.medias.map((item, index) => {
                const isImage = item.type.toString().includes("image");
                const isVideo = item.type.toString().includes("video");

                if (isImagesPage && isImage) {
                  return (
                    <img
                      key={index}
                      src={item.url}
                      alt={`Image ${index + 1}`}
                      className="rounded-lg shadow object-cover grid-cols-1"
                    />
                  );
                }

                if (isVideosPage && isVideo) {
                  return (
                    <video
                      key={index}
                      src={item.url}
                      controls
                      className="rounded-lg shadow object-cover grid-cols-1"
                    />
                  );
                }
                // Default view (not in /images or /videos) — show first 6 images
                if (!isImagesPage && !isVideosPage && isImage && index < 3) {
                  return (
                    <img
                      key={index}
                      src={item.url}
                      alt={Image[index + 1]}
                      className="rounded-lg shadow object-cover w-30 h-30"
                    />
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Photos_Vidos;
