import { useSelector } from "react-redux";
import GroupCard from "./GroupCard";
export default function Groups() {
    const { groups } = useSelector(state => state.groups);

    if (groups.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[80vh]">
                <h1 className="text-xl font-medium">Aucun groupe trouvé.</h1>
            </div>
        );
    }

    return (
        <div className="px-3">
            <h1 className="text-lg text-center font-bold">
                Tous les groupes dont vous êtes membre ({groups.length})
            </h1>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 w-full lg:grid-cols-2 gap-4 md:min-w-100">
                    {groups.map((group) => (
                        <GroupCard key={group.id} group={group} />
                    ))}
                </div>
            </div>
        </div>
    );
}
