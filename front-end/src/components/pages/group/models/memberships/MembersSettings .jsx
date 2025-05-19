/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Search, X, UserCog, UserMinus, UserPlus, UserCheck, UserX } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// ==============================================
// COMPOSANT PRINCIPAL - MEMBRES ET DEMANDES
// ==============================================
export const MembersSettings = ({ group }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('members');
    const [searchTerm, setSearchTerm] = useState('');
    const currentUser = useSelector(state => state.auth.user);

    // Filtrer les membres selon la recherche
    const filteredMembers = group.members.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Séparer les membres par rôle
    const creator = group.creator;
    const admins = filteredMembers.filter(m => m.pivot.role === 'admin' && m.id !== creator.id);
    const members = filteredMembers.filter(m => m.pivot.role === 'member');

    return (
        <>
            {/* Bouton pour ouvrir le modal */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center justify-center border border-gray-400 hover:bg-gray-100 rounded-full p-2"
            >
                <UserCog className="h-5 w-5" />
            </button>

            {/* Modal de gestion des membres */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Gestion des membres</DialogTitle>
                    </DialogHeader>

                    {/* Onglets */}
                    <div className="flex border-b">
                        <button
                            className={`px-4 py-2 font-medium ${activeTab === 'members' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'}`}
                            onClick={() => setActiveTab('members')}
                        >
                            Membres ({group.members.length})
                        </button>
                        <button
                            className={`px-4 py-2 font-medium ${activeTab === 'requests' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'}`}
                            onClick={() => setActiveTab('requests')}
                        >
                            Demandes
                        </button>
                    </div>

                    {/* Contenu des onglets */}
                    {activeTab === 'members' ? (
                        <MembersTab
                            creator={creator}
                            admins={admins}
                            members={members}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            currentUserId={currentUser.id}
                            groupId={group.id}
                        />
                    ) : (
                        <RequestsTab
                            group={group}
                            currentUserId={currentUser.id}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

// ==============================================
// COMPOSANT MEMBRES
// ==============================================
const MembersTab = ({ creator, admins, members, searchTerm, setSearchTerm, currentUserId, groupId }) => {
    const [loading, setLoading] = useState({});
    const token = useSelector(state => state.auth.access_token);

    // Changer le rôle d'un membre (admin/membre)
    const handleChangeRole = async (userId, currentRole) => {
        setLoading(prev => ({ ...prev, [userId]: true }));

        try {
            const newRole = currentRole === 'admin' ? 'member' : 'admin';
            await axios.post(
                `/api/groups/${groupId}/change-role`,
                { user_id: userId, role: newRole },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Recharger les données du groupe après modification
            window.location.reload();
        } catch (error) {
            console.error("Erreur lors du changement de rôle:", error);
        } finally {
            setLoading(prev => ({ ...prev, [userId]: false }));
        }
    };

    // Retirer un membre du groupe
    const handleRemoveMember = async (userId) => {
        if (!confirm("Êtes-vous sûr de vouloir retirer ce membre?")) return;

        setLoading(prev => ({ ...prev, [userId]: true }));

        try {
            await axios.post(
                `/api/groups/${groupId}/remove-member`,
                { user_id: userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Recharger les données du groupe après modification
            window.location.reload();
        } catch (error) {
            console.error("Erreur lors du retrait du membre:", error);
        } finally {
            setLoading(prev => ({ ...prev, [userId]: false }));
        }
    };

    return (
        <div className="space-y-6">
            {/* Barre de recherche */}
            <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Rechercher des membres..."
                    className="pl-10 w-full p-2 border rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Créateur du groupe */}
            <div className="space-y-2">
                <h3 className="font-semibold">Créateur</h3>
                <MemberItem
                    member={creator}
                    isCreator={true}
                    currentUserId={currentUserId}
                />
            </div>

            {/* Admins */}
            {admins.length > 0 && (
                <div className="space-y-2">
                    <h3 className="font-semibold">Administrateurs ({admins.length})</h3>
                    {admins.map(admin => (
                        <MemberItem
                            key={admin.id}
                            member={admin}
                            currentUserId={currentUserId}
                            onRoleChange={() => handleChangeRole(admin.id, admin.pivot.role)}
                            onRemove={() => handleRemoveMember(admin.id)}
                            loading={loading[admin.id]}
                            isAdmin={true}
                        />
                    ))}
                </div>
            )}

            {/* Membres normaux */}
            {members.length > 0 && (
                <div className="space-y-2">
                    <h3 className="font-semibold">Membres ({members.length})</h3>
                    {members.map(member => (
                        <MemberItem
                            key={member.id}
                            member={member}
                            currentUserId={currentUserId}
                            onRoleChange={() => handleChangeRole(member.id, member.pivot.role)}
                            onRemove={() => handleRemoveMember(member.id)}
                            loading={loading[member.id]}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// ==============================================
// COMPOSANT ITEM MEMBRE
// ==============================================
const MemberItem = ({ member, isCreator = false, isAdmin = false, currentUserId, onRoleChange, onRemove, loading }) => {
    // Ne pas afficher les actions pour soi-même ou le créateur
    const showActions = !isCreator && member.id !== currentUserId;

    return (
        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage src={member.image_profile_url} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-medium">{member.name}</p>
                    {isCreator && (
                        <span className="text-xs text-gray-500">Créateur</span>
                    )}
                    {isAdmin && !isCreator && (
                        <span className="text-xs text-blue-500">Admin</span>
                    )}
                </div>
            </div>

            {showActions && (
                <div className="flex gap-2">
                    {/* Bouton Changer rôle */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onRoleChange}
                        disabled={loading}
                    >
                        {loading ? (
                            'Chargement...'
                        ) : isAdmin ? (
                            <>
                                <UserMinus className="mr-2 h-4 w-4" />
                                Rétrograder
                            </>
                        ) : (
                            <>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Promouvoir
                            </>
                        )}
                    </Button>

                    {/* Bouton Retirer */}
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 border-red-200 hover:bg-red-50"
                        onClick={onRemove}
                        disabled={loading}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
};

// ==============================================
// COMPOSANT DEMANDES
// ==============================================
const RequestsTab = ({ group, currentUserId }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState({});
    const token = useSelector(state => state.auth.access_token);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await axios.get(
                    `/api/groups/${group.id}/join-requests`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setRequests(res.data.requests);
            } catch (error) {
                console.error("Erreur lors de la récupération des demandes:", error);
            }
        };

        fetchRequests();
    }, [group.id, token]);

    // Gérer une demande (accepter/rejeter/annuler)
    const handleRequest = async (requestId, action) => {
        setLoading(prev => ({ ...prev, [requestId]: true }));

        try {
            await axios.post(
                `/api/groups/${group.id}/handle-request`,
                { request_id: requestId, action },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Mettre à jour la liste des demandes
            setRequests(prev => prev.filter(req => req.id !== requestId));
        } catch (error) {
            console.error(`Erreur lors de ${action} la demande:`, error);
        } finally {
            setLoading(prev => ({ ...prev, [requestId]: false }));
        }
    };

    return (
        <div className="space-y-4">
            {requests.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                    {group.confidentiality === 'private'
                        ? "Aucune demande en attente"
                        : "Aucune invitation en cours"}
                </p>
            ) : (
                requests.map(request => (
                    <div key={request.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={request.user.image_profile_url} />
                                <AvatarFallback>{request.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{request.user.name}</p>
                                <p className="text-xs text-gray-500">
                                    {new Date(request.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {/* Pour les groupes privés (demandes entrantes) */}
                            {group.confidentiality === 'private' && (
                                <>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleRequest(request.id, 'accept')}
                                        disabled={loading[request.id]}
                                    >
                                        {loading[request.id] ? (
                                            'Chargement...'
                                        ) : (
                                            <>
                                                <UserCheck className="mr-2 h-4 w-4" />
                                                Accepter
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-red-500 border-red-200 hover:bg-red-50"
                                        onClick={() => handleRequest(request.id, 'reject')}
                                        disabled={loading[request.id]}
                                    >
                                        <UserX className="h-4 w-4" />
                                    </Button>
                                </>
                            )}

                            {/* Pour les groupes publics (invitations sortantes) */}
                            {group.confidentiality === 'public' && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-500 border-red-200 hover:bg-red-50"
                                    onClick={() => handleRequest(request.id, 'cancel')}
                                    disabled={loading[request.id]}
                                >
                                    {loading[request.id] ? (
                                        'Chargement...'
                                    ) : (
                                        <>
                                            <X className="mr-2 h-4 w-4" />
                                            Annuler
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};