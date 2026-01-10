import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Ellipsis } from "lucide-react";
import Unknown from "@/features/home/components/Unknown";

function AboutAmis() {
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
              <div className="font-bold">Les Amis</div>
              <Link
                to={`/profile/${id}/amis`}
                className="text-blue-500 text-sm cursor-pointer"
              >
                {isImagesPage || isVideosPage ? "Voir moin" : "Voir tous"}
              </Link>
            </div>

            <div className="flex">
              {state.amis.map(
                (amie, index, array) =>
                  index <= 20 && (
                    <Link
                      to={`/profile/${amie.id}`}
                      key={index}
                      className="w-10 h-10 -ml-4  flex items-center relative justify-center border-3 border-white rounded-full bg-gray-300 overflow-hidden"
                    >
                      {amie.image_profile_url ? (
                        <img
                          src={amie.image_profile_url}
                          loading="lazy"
                          className={`${
                            array.length === index + 1 && "grayscale-50"
                          } w-full h-full object-cover ransition hover:grayscale-75`}
                        />
                      ) : (
                        <Unknown />
                      )}
                    </Link>
                  )
              )}
              <Link
                to={`/profile/${id}/amis`}
                // className="absolute text-[300px] text-white"
                className="w-10 h-10 -ml-4  flex items-center relative justify-center border-3 border-white rounded-full bg-gray-300 overflow-hidden"
              >
                <Ellipsis className="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutAmis;




