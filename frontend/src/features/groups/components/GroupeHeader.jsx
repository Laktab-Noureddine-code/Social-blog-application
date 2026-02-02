/* eslint-disable react/prop-types */
import { Link, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import GroupMembersIcons from "./GroupMembersIcons";
import GroupLinks from "./GroupLinks";
import GroupCover from "./header/GroupCover";
import { getNumber } from "@/shared/helpers/helper";
import { IoChatbubblesOutline } from "react-icons/io5";
import { MembersSettings } from "./models/memberships/MembersSettings ";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setCurrentGroup, updateGroup } from "@/Redux/groupsSlice";
import api from "@/lib/api";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const GroupHeader = ({ group }) => {
    const location = useLocation().pathname;
    const { groupeId } = useParams();
    const groupMembers = getNumber(group.members.filter(member => member.pivot.status === "accepted"))
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.auth.user);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    // Check user membership status
    const userMembership = group.members.find(m => m.id === currentUser?.id)?.pivot;
    const isMember = !!userMembership;
    const isPending = userMembership?.status === 'pending';
    const isInvited = userMembership?.status === 'invited';
    const isPublic = group.confidentiality === "public";
    const isCreator = group.created_by === currentUser?.id;
    const isAdmin = userMembership?.role === 'admin';

    useEffect(() => {
        dispatch(setCurrentGroup(group))
    }, [dispatch, group])

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleShare = () => {
        const link = `${window.location.origin}/groups/${group.id}`;
        navigator.clipboard.writeText(link).then(() => {
            alert('Link copied to clipboard!');
        });
        handleMenuClose();
    };

    const handleAcceptInvitation = async () => {
        setIsLoading(true);
        try {
            const res = await api.post(`/api/groups/${group.id}/accept-invitation`);

            const data = res.data;

            // Update the user's membership status in the group
            const updatedMembers = group.members.map(member => {
                if (member.id === currentUser.id) {
                    return {
                        ...member,
                        pivot: {
                            ...member.pivot,
                            status: 'accepted',
                            joined_at: new Date().toISOString()
                        }
                    };
                }
                return member;
            });

            dispatch(updateGroup({
                groupId: group.id,
                updatedData: {
                    members: updatedMembers
                }
            }));
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    const handleJoin = async () => {
        setIsLoading(true);
        try {
            const res = await api.post(`/api/groups/${group.id}/join`);

            const data = res.data;

            // Create a new member object with the current user
            const newMember = {
                id: currentUser.id,
                name: currentUser.name,
                email: currentUser.email,
                avatar: currentUser.avatar,
                pivot: {
                    role: 'member',
                    status: data.status, // Use the status returned from the API
                    joined_at: data.status === 'accepted' ? new Date().toISOString() : null
                }
            };

            // Update the group with the new member
            dispatch(updateGroup({
                groupId: group.id,
                updatedData: {
                    members: [...(group.members || []), newMember]
                }
            }));
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLeave = async () => {
        setIsLoading(true);
        try {
            await api.delete(`/api/groups/${group.id}/leave`);

            // Update the group by removing the current user from members
            const updatedMembers = group.members?.filter(member => member.id !== currentUser.id) || [];

            dispatch(updateGroup({
                groupId: group.id,
                updatedData: {
                    members: updatedMembers
                }
            }));

            setOpenConfirm(false);
            handleMenuClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Render join button or member actions
    const renderJoinButton = () => {
        if (isInvited) {
            return (
                <div className="flex items-center gap-2">
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleAcceptInvitation}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} /> : "Accept Invitation"}
                    </Button>
                    <IconButton onClick={handleMenuOpen}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleLeave} disabled={isLoading} style={{ color: 'red' }}>
                            Decline
                        </MenuItem>
                    </Menu>
                </div>
            );
        } else if (!isMember) {
            if (isPublic) {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleJoin}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} /> : "Join"}
                    </Button>
                );
            } else {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleJoin}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} /> : "Request Access"}
                    </Button>
                );
            }
        } else if (isPending) {
            return (
                <div className="flex items-center gap-2">
                    <span className="text-gray-500 border border-gray-300 rounded px-4 py-2 bg-gray-100 cursor-not-allowed">
                        Pending...
                    </span>
                    <IconButton onClick={handleMenuOpen}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleLeave} disabled={isLoading} style={{ color: 'red' }}>
                            Cancel
                        </MenuItem>
                    </Menu>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white border rounded-lg overflow-hidden">
            <GroupCover group={group} />
            <div className="px-4 pt-4">
                <div className="flex items-center gap-4">
                    <div className="flex justify-between w-full items-center">
                        <div className="flex-1 -mt-2">
                            <h1 className="text-2xl font-bold">{group.name}</h1>
                            <p className="text-gray-500">Group ({group.confidentiality}) • {groupMembers} members</p>
                        </div>
                        <div className="flex items-center gap-2">
                            {(isCreator || isAdmin) && <MembersSettings group={group} />}
                            {/* Show chat button only for accepted members */}
                            {isMember && userMembership?.status === 'accepted' && (
                                <Link to={`/group/chat/${groupeId}`} className="flex items-center justify-center border border-gray-400 hover:bg-gray-100 rounded-full p-2">
                                    <IoChatbubblesOutline size={27} />
                                </Link>
                            )}
                            {/* Show join button, accept invitation, or pending status */}
                            {(!isMember || isPending || isInvited) && renderJoinButton()}
                        </div>
                    </div>
                </div>
                <div className="mt-4 border-t pt-4">
                    <GroupLinks groupeId={groupeId} location={location} />
                </div>
            </div>

            {/* Confirmation dialog for leaving group */}
            <Dialog
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
            >
                <DialogTitle>Confirm Leave</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to leave this group?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
                    <Button
                        onClick={handleLeave}
                        color="error"
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} /> : "Leave"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default GroupHeader;