/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { groupCover } from "../../../helpers/helper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateGroup } from "../../../Redux/groupsSlice";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function GroupCard({ group }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.access_token);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    // Check user membership status
    const userMembership = group.members.find(m => m.id === currentUser?.id)?.pivot;
    const isMember = !!userMembership;
    const isPending = userMembership?.status === 'pending';
    const isPublic = group.confidentiality === "public";
    const isCreator = group.created_by === currentUser?.id;
    const isAdmin = userMembership?.role === 'admin';

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleShare = () => {
        const link = `${window.location.origin}/groups/${group.id}`;
        navigator.clipboard.writeText(link).then(() => {
            alert('Lien copié dans le presse-papier!');
        });
        handleMenuClose();
    };

    const handleJoin = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/groups/${group.id}/join`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) throw new Error(await res.text());

            const data = await res.json();
            dispatch(updateGroup({
                groupId: group.id,
                updatedData: {
                    members: data.members,
                    status: data.status
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
            const res = await fetch(`/api/groups/${group.id}/leave`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) throw new Error(await res.text());

            const data = await res.json();
            dispatch(updateGroup({
                groupId: group.id,
                updatedData: {
                    members: data.members
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

    const renderActionButton = () => {
        if (isCreator || isAdmin) {
            return (
                <div className="flex gap-2">
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`/groups/${group.id}`}
                        sx={{ backgroundColor: '#e7f3ff', color: '#1877f2' }}
                    >
                        Accéder au groupe
                    </Button>
                    <IconButton onClick={handleMenuOpen}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleLeave}>Quitter le groupe</MenuItem>
                        <MenuItem onClick={handleShare}>Partager</MenuItem>
                    </Menu>
                </div>
            );
        }

        if (isMember && userMembership.status === 'accepted') {
            return (
                <div className="flex gap-2">
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`/groups/${group.id}`}
                        sx={{ backgroundColor: '#e7f3ff', color: '#1877f2' }}
                    >
                        Accéder au groupe
                    </Button>
                    <IconButton onClick={handleMenuOpen}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => setOpenConfirm(true)}>Quitter le groupe</MenuItem>
                        <MenuItem onClick={handleShare}>Partager</MenuItem>
                    </Menu>
                </div>
            );
        }

        if (isPending) {
            return (
                <div className="flex items-center gap-2">
                    <Button
                        variant="outlined"
                        disabled
                    >
                        En attente...
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleLeave}
                        disabled={isLoading}
                    >
                        Annuler
                    </Button>
                </div>
            );
        }

        if (isPublic) {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleJoin}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={24} /> : "Rejoindre"}
                </Button>
            );
        }

        return (
            <Button
                variant="contained"
                color="primary"
                onClick={handleJoin}
                disabled={isLoading}
            >
                {isLoading ? <CircularProgress size={24} /> : "Demander l'accès"}
            </Button>
        );
    };

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden w-full border border-gray-200">
            {/* Cover image */}
            <div className="h-30 w-full relative">
                <img
                    src={groupCover(group.cover_image)}
                    alt="Cover"
                    className="w-full h-full object-cover"
                />
                {(isCreator || isAdmin) && (
                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                        {isCreator ? 'Créateur' : 'Admin'}
                    </div>
                )}
            </div>

            {/* Card content */}
            <div className="pt-10 pb-4 text-center px-4">
                <h2 className="text-xl font-semibold truncate">{group.name}</h2>
                <p className="text-gray-500 text-sm">{group.members.length} membres</p>
                <p className="text-gray-500 text-sm mb-2">
                    {isPublic ? 'Public' : 'Privé'}
                </p>

                <div className="mt-3 flex justify-center items-center gap-4">
                    {renderActionButton()}
                </div>
            </div>

            {/* Confirmation dialog for leaving group */}
            <Dialog
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
            >
                <DialogTitle>Confirmer la sortie</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Êtes-vous sûr de vouloir quitter ce groupe?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirm(false)}>Annuler</Button>
                    <Button
                        onClick={handleLeave}
                        color="error"
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} /> : "Quitter"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default GroupCard;