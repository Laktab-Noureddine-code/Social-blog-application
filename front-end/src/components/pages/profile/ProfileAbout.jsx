import { Calendar, Briefcase, Users, Globe, MapPin, MoreHorizontal } from "lucide-react";
const images = [
    "https://images.unsplash.com/photo-1607746882042-944635dfe10e", // person
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131", // dog
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d", // sunset
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb", // nature
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e", // woman portrait
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330", // man portrait
];
function ProfileAbout() {
    return (
        <div className="lg:w-[35%] w-full sticky">
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
            <div className=" my-4 pb-4 bg-white border rounded-2xl overflow-hidden p-2 shadow-lg">
                <div>
                    <div className="py-2 px-2">
                        <div className="flex justify-between items-center">
                            <div className="font-bold">Photos and Videos</div>
                            <button className="text-blue-500 text-sm cursor-pointer">Voir tous</button>
                        </div>

                        <div className="mt-3 grid grid-cols-3 gap-2">
                            {images.map((src, index) => (
                                <img
                                    key={index}
                                    src={`${src}?auto=format&fit=crop&w=300&q=80`}
                                    alt={`Image ${index + 1}`}
                                    className="rounded-lg shadow object-cover w-30 h-30"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileAbout
