import { Ellipsis } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { groupProfile } from "../../helpers/helper"

function GroupCard({ group }) {
    console.log(group)
    const [opened, setOpened] = useState(null)
    return (
        <div>
            <div className="bg-white shadow-lg border border-gray-300 rounded-lg p-4 w-full ">
                <div className="flex items-center space-x-4">
                    <img
                        src={groupProfile(group.profile_image)}
                        alt="Group.img"
                        className="w-14 h-14 object-cover rounded-full"
                    />
                    <div className="flex-1">
                        <h2 className="text-sm font-semibold truncate">{group.name}</h2>
                    </div>
                </div>
                <div className="flex items-center gap-3 mt-4">
                    <button className="w-full text-blue-700 font-semibold bg-blue-100 hover:bg-blue-200 text-sm p-1 rounded">
                        <Link to={`/groups/${group.id}`}>Afficher le groupe</Link>
                    </button>
                    <button className="text-gray-600 cursor-pointer bg-gray-100 hover:bg-gray-200 text-sm p-1 rounded">
                        <Ellipsis />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default GroupCard
