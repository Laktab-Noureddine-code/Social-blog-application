import { useEffect } from 'react';
import { useParams, Outlet, useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import GroupHeader from '../components/GroupeHeader';
import { setCurrentGroup, setLoadingGroup } from '@/Redux/groupsSlice';
import api from '@/lib/api';

function Group() {
  const { groupeId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentGroup, loadingGroup, user } = useSelector(state => ({
    currentGroup: state.groups.currentGroup,
    loadingGroup: state.groups.loadingGroup,
    user: state.auth.user
  }));

  useEffect(() => {
    const fetchGroup = async () => {
      dispatch(setLoadingGroup(true));
      try {
        const response = await api.get(`/api/groups/${groupeId}`);
        dispatch(setCurrentGroup(response.data));
      } catch (error) {
        console.error('Error:', error.response?.data?.message || error.message);
      } finally {
        dispatch(setLoadingGroup(false));
      }
    };

    fetchGroup();
  }, [groupeId, dispatch]);

  if (loadingGroup || !currentGroup) {
    return (
      <div className="bg-white border rounded-lg overflow-hidden">
        {/* Cover Skeleton */}
        <Skeleton variant="rectangular" width="100%" height={240} className="bg-gray-200" />

        {/* Content Skeleton */}
        <div className="px-4 pt-4">
          <div className="flex items-center gap-4">
            <div className="flex justify-between w-full items-center">
              <div className="flex-1 -mt-2">
                <Skeleton variant="text" width="60%" height={40} className="bg-gray-200" />
                <Skeleton variant="text" width="40%" height={30} className="bg-gray-200" />
              </div>
              <Skeleton variant="circular" width={40} height={40} className="bg-gray-200" />
            </div>
          </div>

          {/* Links Skeleton */}
          <div className="flex justify-between items-center mt-4 border-t pt-4">
            <div className="flex gap-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} variant="rounded" width={80} height={36} className="bg-gray-200" />
              ))}
            </div>
            <Skeleton variant="rounded" width={120} height={36} className="bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  // Check visibility and membership
  const userMembership = currentGroup.members?.find(m => m.id === user?.id)?.pivot;
  const isMember = !!userMembership && userMembership.status === 'accepted';
  const isVisible = currentGroup.visibility === 'visible';

  // Check if trying to access restricted pages
  const isRestrictedPage = (
    location.pathname === `/groups/${groupeId}` || 
    location.pathname.includes(`/groups/${groupeId}/articles`)
  );

  // Redirect if not a member and trying to access restricted pages
  if (isRestrictedPage && !isMember) {
    return <Navigate to={`/groups/${groupeId}/about`} replace />;
  }

  // Check general access to the group
  if (!isVisible && !isMember) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl font-medium">You are not authorized to access this group</h1>
      </div>
    );
  }
  console.log('hello world')

  return (
    <div>
      <div className="bg-white border rounded-lg overflow-hidden">
        <GroupHeader group={currentGroup} />
      </div>
      <div className='w-full'>
        <div className='md:max-w-3xl mx-auto py-6'>
          <Outlet context={{ group: currentGroup }} />
        </div>
      </div>
    </div>
  );
}

export default Group;