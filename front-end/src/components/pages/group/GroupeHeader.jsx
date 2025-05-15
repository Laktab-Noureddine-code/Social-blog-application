import { Link, useLocation, useParams} from "react-router-dom";

import GroupMembersIcons from "./GroupMembersIcons";

import { AiFillMessage } from "react-icons/ai";
import GroupLinks from "./GroupLinks";
import GroupCover from "./header/GroupCover";
import { getNumber } from "../../../helpers/helper";
import AddMember from "./models/AddMember";





const GroupHeader = ({ group }) => {
    const location = useLocation().pathname;
    const { groupeId } = useParams();   
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
                        <Link to={`/group/chat/${groupeId}`}>
                            <AiFillMessage className="text-gray-500 text-4xl" />
                        </Link>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4 border-t pt-4">
                    <GroupLinks groupeId={groupeId} location={location} />
                    <AddMember group={group}/>
                </div>
            </div>
        </div>
    );
};

export default GroupHeader;