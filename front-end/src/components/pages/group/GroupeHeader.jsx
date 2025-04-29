import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import GroupMembersIcons from "./GroupMembersIcons";
import { getNumber } from "../../../helpers/helper";
import { AiFillMessage } from "react-icons/ai";

const GroupHeader = ({ group }) => {
    const { groupeId } = useParams()
    const location = useLocation().pathname
    return (
        <div className="bg-white border rounded-lg overflow-hidden ">
            <div className="h-48 md:h-90 lg:h-100">
                <img src={group.coverImage} className="h-full w-full object-cover " alt="groupe cover Image" loading="lazy" />
            </div>
            <div className="px-4 pt-4">
                <div>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20 border-4 border-white -mt-10">
                            <AvatarImage src={group.groupImage} className="w-full h-full object-cover" />
                        </Avatar>
                        <div className="flex justify-between w-full items-center">
                            <div className="flex-1 -mt-2">
                                <h1 className="text-2xl font-bold">{group.groupName}</h1>
                                <p className="text-gray-500">Groupe ({group.status}) • {getNumber(group.members)} members</p>
                            </div>
                            <div>
                                <Link to={`/group/${groupeId}/chat`}>
                                    <AiFillMessage className="text-gray-500 text-4xl" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 ml-4">
                        <GroupMembersIcons group={group} />
                    </div>
                </div>
                <div className="flex gap-4 mt-4 border-t pt-4">
                    <NavLink to={`/group/${groupeId}/about`} className={({ isActive }) =>
                        `font-semibold cursor-pointer hover:bg-gray-50 px-4 py-2  
                        ${isActive ? "border-blue-600 border-b-4 font-bold text-black" : "text-gray-600"}`}>
                        À propos
                    </NavLink>
                    <NavLink to={`/group/${groupeId}`} className={({ isActive }) =>
                        `font-semibold cursor-pointer hover:bg-gray-50 px-4 py-2  
                        ${isActive && location === `/group/${groupeId}` ? "border-blue-600 border-b-4 font-bold text-black" : "text-gray-600"}`}>
                        Discussion
                    </NavLink>
                    <NavLink to="members" className={({ isActive }) =>
                        `font-semibold cursor-pointer hover:bg-gray-50 px-4 py-2  
                        ${isActive ? "border-blue-600 border-b-4 font-bold text-black" : "text-gray-600"}`}>
                        Personnes
                    </NavLink>
                    <NavLink to="events" className={({ isActive }) =>
                        `font-semibold cursor-pointer hover:bg-gray-50 px-4 py-2  
                        ${isActive ? "border-blue-600 border-b-4 font-bold text-black" : "text-gray-600"}`}>
                        Events
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default GroupHeader;