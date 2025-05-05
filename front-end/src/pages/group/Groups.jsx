import { groups } from "../../data/group"
import GroupCard from "./GroupCard"

function Groups() {
    return (
        <div className="px-3">
            <h1 className="text-lg text-center font-bold">Tous les groupes dont vous êtes membre ({groups.length})</h1>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 w-full lg:grid-cols-2 gap-4 md:min-w-100">
                    {groups.map((group, index) => <GroupCard key={index} group={group} />)}
                </div>
            </div>
        </div>
    )
}

export default Groups
