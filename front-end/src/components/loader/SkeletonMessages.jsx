import { Skeleton } from '@mui/material';


const SkeletonMessages = () => {
    return (
        <div className="flex flex-col gap-6">
            {/* Message from friend */}
            <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-[0_8px_8px_8px] px-2 py-1 max-w-xs shadow-md">
                    <Skeleton className="h-2 w-32 mb-2" />
                    <Skeleton className="h-2 w-24" />
                </div>
            </div>
            {/* Message from me */}
            <div className="flex justify-end">
                <div className="bg-[#424dc4] text-white rounded-[8px_0_8px_8px] px-2 py-1 max-w-xs shadow-md">
                    <Skeleton className="h-2 w-40 mb-2 bg-white/30" />
                    <Skeleton className="h-2 w-20 bg-white/30" />
                </div>
            </div>

            {/* Message from friend */}
            <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-[0_8px_8px_8px] px-2 py-1 max-w-xs shadow-md">
                    <Skeleton className="h-2 w-28 mb-2" />
                    <Skeleton className="h-2 w-32" />
                </div>
            </div>

            {/* Message from me */}
            <div className="flex justify-end">
                <div className="bg-[#424dc4] text-white rounded-[8px_0_8px_8px] px-2 py-1 max-w-xs shadow-md">
                    <Skeleton className="h-2 w-36 mb-2 bg-white/30" />
                    <Skeleton className="h-2 w-16 bg-white/30" />
                </div>
            </div>
        </div>
    );
};

export default SkeletonMessages;
