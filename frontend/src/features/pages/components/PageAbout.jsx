import {
  Calendar,
  Briefcase,
  Users,
  Globe,
  MapPin,
  MoreHorizontal,
  Phone,
  Mail,
} from "lucide-react";
import { useSelector } from "react-redux";
import Text from "@/shared/helpers/Text";
import { formatDateToShort, formatPhoneNumber } from "@/shared/helpers/helper";
import ImagesAboitPage from "./ImagesAboitPage";
import VideosAboitPage from "./VideosAboitPage";
function PageAbout() {
  const state = useSelector(state => state.page)
  return (
    <div className="w-full sticky top-20 max-h-[80vh] overflow-y-auto">
      <div className=" bg-white border rounded-2xl overflow-hidden shadow-lg p-2">
        <div className="flex justify-between items-center py-2">
          <div className="font-bold">About {state.page.name}</div>
          <button>
            <MoreHorizontal size={18} className="text-gray-500" />
          </button>
        </div>
        <div className="border-b py-1" />
        <div className="text-gray-700 mt-2 max-h-[400px]">
          {state.page.description && (
            <p className="text-sm mb-4">
              <Text text={state.page.description} />
          </p>
          )}

          {state.page.location && (
            <div className="flex items-center mb-2 text-sm text-gray-600">
              <MapPin size={16} className="mr-2" />
              <span>{state.page.location}</span>
            </div>
          )}

          {state.page.website && (
            <div className="flex items-center mb-2 text-sm text-gray-600">
              <Globe size={16} className="mr-2" />
              <span>{state.page.website}</span>
            </div>
          )}

          {state.page.created_at && (
            <div className="flex items-center mb-2 text-sm text-gray-600">
              <Calendar size={16} className="mr-2" />
              <span>{formatDateToShort(state.page.created_at)}</span>
            </div>
          )}
          {state.page.phone && (
            <div className="flex items-center mb-2 text-sm text-gray-600">
              <Phone size={16} className="mr-2" />
              {/* <span>0612345678</span> */}
              <span>{formatPhoneNumber("+33123456")}</span>
            </div>
          )}
          {state.page.email && (
            <div className="flex items-center mb-2 text-sm text-gray-600">
              <Mail size={16} className="mr-2" />
              {/* <span>0612345678</span> */}
              <span>{state.page.email}</span>
            </div>
          )}

          <div className="flex items-center mb-2 text-sm text-gray-600">
            <Briefcase size={16} className="mr-2" />
            <span>Working at Sebu Studio</span>
          </div>

          <div className="flex items-center mb-2 text-sm text-gray-600">
            <Users size={16} className="mr-2" />
            <span>In relationship with Icut Gadis</span>
          </div>
        </div>
      </div>
      <ImagesAboitPage />
      <VideosAboitPage />
    </div>
  );
}

export default PageAbout;
