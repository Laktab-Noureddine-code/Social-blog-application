/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from '@/lib/api';
import { Search, UserPlus } from 'lucide-react';
import { inviteMembers } from '@/Redux/groupsSlice';
import { userProfile } from "@/shared/helpers/helper";
import useUsersLoader from '@/shared/hooks/useUsersLoader';

export const InviterAmisTab = ({ groupId, groupMembers }) => {
    // Call the useUsersLoader hook to load all users
    useUsersLoader();

    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [availableUsers, setAvailableUsers] = useState([]);
    const [sending, setSending] = useState(false);
    const dispatch = useDispatch();

    // Get all users from the Redux store instead of just friends
    const allUsers = useSelector(state => state.users.users || []);

    useEffect(() => {
        if (allUsers.length > 0 && groupMembers) {
            // Filter out users who are already in the group
            const groupMemberIds = groupMembers.map(member => member.id);

            const filteredUsers = allUsers.filter(user =>
                !groupMemberIds.includes(user.id)
            );
            setAvailableUsers(filteredUsers);
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [allUsers, groupMembers]);

    // Filter users based on search term
    const filteredUsers = availableUsers.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get only the first 20 users to display
    const displayUsers = filteredUsers.slice(0, 20);

    // Handle user selection
    const handleSelectUser = (user) => {
        if (selectedUsers.some(u => u.id === user.id)) {
            // Deselect the user
            setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
        } else {
            // Select the user
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    // Send invitations
    const handleSendInvitations = async () => {
        if (selectedUsers.length === 0) return;

        try {
            setSending(true);
            const userIds = selectedUsers.map(user => user.id);
            await api.post(`/api/groups/${groupId}/invite-members`, {
                user_ids: userIds
            });

            // Update Redux store - keep the groupSlice logic
            dispatch(inviteMembers(userIds));

            // Reset selection after sending
            setSelectedUsers([]);

        } catch (error) {
            console.error('Erreur lors de l\'envoi des invitations:', error);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="p-4 w-full">
            <div className="w-full bg-white rounded-lg">
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Rechercher des utilisateurs..."
                        className="pl-10 w-full p-2 border rounded-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>

                <h3 className="font-medium mb-3 text-gray-700">Utilisateurs disponibles</h3>

                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                    </div>
                ) : displayUsers.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                        {searchTerm ? "Aucun utilisateur trouvé" : "Tous les utilisateurs sont déjà dans ce groupe ou ont été invités"}
                    </div>
                ) : (
                    <div className="max-h-[400px] overflow-y-auto pr-2 mb-4">
                        {displayUsers.map(user => (
                            <div
                                key={user.id}
                                className="flex items-center p-3 mb-2 hover:bg-gray-50 rounded-md border border-gray-100 cursor-pointer"
                                onClick={() => handleSelectUser(user)}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.some(u => u.id === user.id)}
                                    onChange={() => { }}
                                    className="mr-3 h-5 w-5 accent-blue-500"
                                />
                                <div className="flex items-center flex-1">
                                    <img
                                        src={userProfile(user.image_profile_url)}
                                        alt={user.name}
                                        className="w-10 h-10 rounded-full mr-3 object-cover border border-gray-200"
                                    />
                                    <div className="overflow-hidden">
                                        <p className="font-medium text-gray-800 truncate">{user.name}</p>
                                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedUsers.length > 0 && (
                    <button
                        onClick={handleSendInvitations}
                        disabled={sending}
                        className={`w-full py-3 rounded-lg font-medium flex items-center justify-center transition-all ${sending
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                            }`}
                    >
                        {sending ? (
                            <span>Envoi en cours...</span>
                        ) : (
                            <>
                                <UserPlus size={18} className="mr-2" />
                                <span>Inviter {selectedUsers.length} utilisateur{selectedUsers.length > 1 ? 's' : ''}</span>
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};