/* eslint-disable react/prop-types */
import { Link, useLocation, useParams} from "react-router-dom";

import GroupMembersIcons from "./GroupMembersIcons";

import GroupLinks from "./GroupLinks";
import GroupCover from "./header/GroupCover";
import { getNumber } from "../../../helpers/helper";
import AddMember from "./models/AddMember";

// icons
import { MdGroupAdd } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { MembersSettings } from "./models/memberships/MembersSettings ";




const GroupHeader = ({ group }) => {
    const location = useLocation().pathname;
    const { groupeId } = useParams();   
    console.log(group)
    return (
        <div className="bg-white border rounded-lg overflow-hidden">
            <GroupCover group={group}/>
            <div className="px-4 pt-4">
                <div className="flex items-center gap-4">
                    <div className="flex justify-between w-full items-center">
                        <div className="flex-1 -mt-2">
                            <h1 className="text-2xl font-bold">{group.name}</h1>
                            <p className="text-gray-500">Groupe ({group.confidentiality}) • {getNumber(group.members)} membres</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <MembersSettings group={group}/>
                            <Link to={`/group/chat/${groupeId}`} className="flex items-center justify-center border border-gray-400 hover:bg-gray-100 rounded-full p-2">
                                <IoChatbubblesOutline size={27} />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-4 border-t pt-4">
                    <GroupLinks groupeId={groupeId} location={location} />
                </div>
            </div>
        </div>
    );
};

export default GroupHeader;