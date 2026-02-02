import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import GroupCard from "../components/GroupCard";
import { setGroups, setLoadingGroups } from '@/Redux/groupsSlice';
import { Link } from 'react-router-dom';
import api from '@/lib/api';

export default function Groups() {
    const dispatch = useDispatch();
    const [activeFilter, setActiveFilter] = useState('my_groups');
    const {
        groups,
        isLoading
    } = useSelector(state => ({
        groups: state.groups.groups,
        isLoading: state.groups.loadingGroups
    }));

    const fetchGroups = async (filter) => {
        try {
            dispatch(setLoadingGroups(true));

            const response = await api.get(`/api/groups?filter=${filter}`);
            dispatch(setGroups(response.data));
        } catch (error) {
            console.error('Error:', error.response?.data?.message || error.message);
        } finally {
            dispatch(setLoadingGroups(false));
        }
    };

    // Fetch groups when filter changes
    useEffect(() => {
        fetchGroups(activeFilter);
    }, [activeFilter]);

    const showSkeletons = isLoading;
    const isEmpty = !isLoading && groups.length === 0;

    return (
        <div className="px-3 py-4">
            {/* Filter buttons */}
            <div className="flex justify-between mb-6 space-x-2 items-center">
            <Link to="/groups/create"
                className="md:px-4 bg-blue-500 text-white font-medium px-2 py-1 text-sm md:text-md md:py-2 rounded-lg transition-colors "

            >
                Create Group
            </Link>
                <div className='flex justify-start  space-x-2'>
                    <button
                        onClick={() => setActiveFilter('my_groups')}
                        disabled={isLoading && activeFilter === 'my_groups'}
                        className={`md:px-4 px-2 py-1 text-sm md:text-md md:py-2 rounded-lg transition-colors ${activeFilter === 'my_groups'
                                ? 'bg-blue-500 text-white font-medium'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            } ${isLoading && activeFilter === 'my_groups' ? 'opacity-70' : ''
                            }`}
                    >
                        My Groups
                    </button>
                    <button
                        onClick={() => setActiveFilter('friends_groups')}
                        disabled={isLoading && activeFilter === 'friends_groups'}
                        className={`md:px-4 px-2 py-1 text-sm md:text-md md:py-2 rounded-lg transition-colors ${activeFilter === 'friends_groups'
                                ? 'bg-blue-500 text-white font-medium'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            } ${isLoading && activeFilter === 'friends_groups' ? 'opacity-70' : ''
                            }`}
                    >
                        Friends' Groups
                    
                    </button>
                    <button
                        onClick={() => setActiveFilter('not_joined')}
                        disabled={isLoading && activeFilter === 'not_joined'}
                        className={`md:px-4 px-2 py-1 text-sm md:text-md md:py-2 rounded-lg transition-colors ${activeFilter === 'not_joined'
                                ? 'bg-blue-500 text-white font-medium'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            } ${isLoading && activeFilter === 'not_joined' ? 'opacity-70' : ''
                            }`}
                    >
                        Available Groups
                    
                    </button>
                </div>
            </div>

            {/* Groups display */}
            <div className="flex justify-center">
                <div className="grid grid-cols-1 w-full lg:grid-cols-3 md:grid-cols-2 gap-4 md:min-w-100">
                    {showSkeletons ? (
                        Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={`skeleton-${index}`}
                                className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 w-full"
                            >
                                <Skeleton variant="rectangular" width="100%" height={150} />
                                <div className="p-4 space-y-2">
                                    <Skeleton variant="text" width="80%" height={24} />
                                    <Skeleton variant="text" width="60%" height={20} />
                                    <div className="flex space-x-2 mt-3">
                                        <Skeleton variant="circular" width={30} height={30} />
                                        <Skeleton variant="text" width="40%" height={20} />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : isEmpty ? (
                        <div className="col-span-full text-center py-12">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <h3 className="mt-2 text-lg font-medium text-gray-900">
                                {activeFilter === 'my_groups'
                                    ? "You haven't joined any groups"
                                    : activeFilter === 'friends_groups'
                                        ? "No friends' groups available"
                                        : "No groups available to join"}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {activeFilter === 'my_groups'
                                    ? "Join or create a group to get started"
                                    : "Come back later to discover new groups"}
                            </p>
                        </div>
                    ) : (
                        groups.map((group ,index) => (
                            <GroupCard
                                key={index}
                                group={group}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}