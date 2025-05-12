import { useSelector } from "react-redux";
import GroupCard from "./GroupCard";
import { useOutletContext } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';

export default function Groups() {
    const { groups } = useSelector(state => state.groups);
    const { loading = false } = useOutletContext() || {};

    // Si loading → on affiche les Skeletons même si groups est vide
    const showSkeletons = loading || groups.length === 0;

    return (
        <div className="px-3">
            <div className="flex justify-center">
                <div className="grid grid-cols-1 w-full lg:grid-cols-3 md:grid-cols-2 gap-4 md:min-w-100">
                    {showSkeletons
                        ? Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 w-full"
                            >
                                <Skeleton variant="rectangular" width="100%" height={100} />
                                <div className="flex flex-col items-center py-6 px-4">
                                    <Skeleton variant="circular" width={80} height={80} className="-mt-10 border-3 border-white bg-white"/>
                                    <Skeleton variant="text" width="60%" height={24} style={{ marginTop: 8 }} />
                                    <Skeleton variant="text" width="40%" height={20} />
                                </div>
                            </div>
                        ))
                        : groups.map((group) => (
                            <GroupCard key={group.id} group={group} loading={false} />
                        ))}
                </div>
            </div>
        </div>
    );
}
