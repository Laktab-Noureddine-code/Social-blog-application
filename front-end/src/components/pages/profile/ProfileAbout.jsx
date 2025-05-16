import {
  Calendar,
  Briefcase,
  Users,
  Globe,
  MapPin,
  MoreHorizontal,
} from "lucide-react";
import Photos_Vidos from "./Photos_Vidos";
import AboutAmis from "./About_Amis";
function ProfileAbout() {
  return (
    <div className="w-full sticky top-20">
      <div className=" bg-white border rounded-2xl overflow-hidden shadow-lg p-2">
        <div className="flex justify-between items-center py-2">
          <div className="font-bold">About Me</div>
          <button>
            <MoreHorizontal size={18} className="text-gray-500" />
          </button>
        </div>
        <div className="border-b py-1" />
        <div className="text-gray-700 mt-2">
          <p className="text-sm mb-4">
            Making pixels and experiences in digital products for Sebandite
          </p>

          <div className="flex items-center mb-2 text-sm text-gray-600">
            <MapPin size={16} className="mr-2" />
            <span>Yogyakarta, ID</span>
          </div>

          <div className="flex items-center mb-2 text-sm text-gray-600">
            <Globe size={16} className="mr-2" />
            <span>dribbble.com/fawaid</span>
          </div>

          <div className="flex items-center mb-2 text-sm text-gray-600">
            <Calendar size={16} className="mr-2" />
            <span>Joined June 2022</span>
          </div>

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
      <Photos_Vidos />
      <AboutAmis />
    </div>
  );
}

export default ProfileAbout;
