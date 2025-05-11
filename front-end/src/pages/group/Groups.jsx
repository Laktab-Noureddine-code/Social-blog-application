import { useSelector } from "react-redux";
import GroupCard from "./GroupCard";
export default function Groups() {
    const { groups } = useSelector(state => state.groups);
    return (
        <div className="px-3">
            <div className="flex justify-center">
                <div className="grid grid-cols-1 w-full lg:grid-cols-3 md:grid-cols-2  gap-4 md:min-w-100">
                    {groups.map((group) => (
                        <GroupCard key={group.id} group={group} />
                    ))}
                </div>
            </div>
        </div>
    );
}
