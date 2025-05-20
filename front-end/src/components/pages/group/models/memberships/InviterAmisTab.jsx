/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Search, UserPlus } from 'lucide-react';
import { inviteMembers } from '../../../../../Redux/groupsSlice';
import { userProfile } from '../../../../../helpers/helper';

export const InviterAmisTab = ({ groupId, groupMembers }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [availableFriends, setAvailableFriends] = useState([]);
    const [sending, setSending] = useState(false);
    const token = localStorage.getItem('access_token');
    const dispatch = useDispatch();

    // Récupérer la liste des amis depuis le store Redux
    const friends = useSelector(state => state.amis?.friends || []);

    useEffect(() => {
        if (friends.length > 0 && groupMembers) {
            // Filtrer les amis qui ne sont pas déjà dans le groupe
            const groupMemberIds = groupMembers.map(member => member.id);

            const filteredFriends = friends.filter(friend =>
                !groupMemberIds.includes(friend.id)
            );
            setAvailableFriends(filteredFriends);
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [friends, groupMembers]);

    // Filtrer les amis en fonction de la recherche
    const filteredFriends = availableFriends.filter(friend =>
        friend.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        friend.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(filteredFriends)
    // Gérer la sélection d'un ami
    const handleSelectFriend = (friend) => {
        if (selectedFriends.some(f => f.id === friend.id)) {
            // Désélectionner l'ami
            setSelectedFriends(selectedFriends.filter(f => f.id !== friend.id));
        } else {
            // Sélectionner l'ami
            setSelectedFriends([...selectedFriends, friend]);
        }
    };

    // Envoyer les invitations
    const handleSendInvitations = async () => {
        if (selectedFriends.length === 0) return;

        try {
            setSending(true);
            const friendIds = selectedFriends.map(friend => friend.id);
            await axios.post(`/api/groups/${groupId}/invite-members`, {
                user_ids: friendIds
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Mettre à jour le store Redux
            dispatch(inviteMembers(friendIds));

            // Réinitialiser la sélection après l'envoi
            setSelectedFriends([]);

        } catch (error) {
            console.error('Erreur lors de l\'envoi des invitations:', error);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="p-4 w-full">
            <div className="w-full bg-white rounded-lg ">
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Rechercher des amis..."
                        className="pl-10 w-full p-2 border rounded-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>

                <h3 className="font-medium mb-3 text-gray-700">Amis disponibles</h3>

                {loading ? (
                    <div className="text-center py-4">Chargement...</div>
                ) : filteredFriends.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                        {searchTerm ? "Aucun ami trouvé" : "Tous vos amis sont déjà dans ce groupe ou ont été invités"}
                    </div>
                ) : (
                    <div className="max-h-[400px] overflow-y-auto pr-2 mb-4">
                        {filteredFriends.map(friend => (
                            <div
                                key={friend.id}
                                className="flex items-center p-3 mb-2 hover:bg-gray-50 rounded-md border border-gray-100 cursor-pointer"
                                onClick={() => handleSelectFriend(friend)}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedFriends.some(f => f.id === friend.id)}
                                    onChange={() => { }}
                                    className="mr-3 h-5 w-5 accent-blue-500"
                                />
                                <div className="flex items-center flex-1">
                                    {/* <p>{friend.profile_photo_url}</p> */}
                                    <img
                                        src={userProfile(friend.image_profile_url)}
                                        alt={friend.name}
                                        className="w-10 h-10 rounded-full mr-3 object-cover border border-gray-200"
                                    />
                                    <div className="overflow-hidden">
                                        <p className="font-medium text-gray-800 truncate">{friend.name}</p>
                                        <p className="text-sm text-gray-500 truncate">{friend.email}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedFriends.length > 0 && (
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
                                <span>Inviter {selectedFriends.length} ami{selectedFriends.length > 1 ? 's' : ''}</span>
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};