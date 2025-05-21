import { useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import GroupHeader from '../../components/pages/group/GroupeHeader';
import { setCurrentGroup, setLoadingGroup } from '../../Redux/groupsSlice';

function Group() {
  const { groupeId } = useParams();
  const dispatch = useDispatch();
  const { currentGroup, loadingGroup, token, user } = useSelector(state => ({
    currentGroup: state.groups.currentGroup,
    loadingGroup: state.groups.loadingGroup,
    token: state.auth.access_token,
    user: state.auth.user
  }));

  useEffect(() => {
    const fetchGroup = async () => {
      dispatch(setLoadingGroup(true));
      try {
        const response = await fetch(`/api/groups/${groupeId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Failed to fetch group');

        const data = await response.json();
        dispatch(setCurrentGroup(data));
      } catch (error) {
        console.error('Error:', error);
      } finally {
        dispatch(setLoadingGroup(false));
      }
    };

    fetchGroup();
  }, [groupeId, dispatch, token]);

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
  const isMember = currentGroup.members?.some(m => m.id === user?.id);
  const isVisible = currentGroup.visibility === 'visible';

  if (!isVisible && !isMember) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl font-medium">Vous n'êtes pas autorisé à accéder à ce groupe</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white border rounded-lg overflow-hidden">
        <GroupHeader group={currentGroup} />
      </div>
      <div className='w-full bg-[#e3e5e8]'>
        <div className='md:max-w-3xl mx-auto py-6'>
          <Outlet context={{ group: currentGroup }} />
        </div>
      </div>
    </div>
  );
}

export default Group;