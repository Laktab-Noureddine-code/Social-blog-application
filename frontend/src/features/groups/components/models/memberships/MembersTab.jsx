/* eslint-disable react/prop-types */
import api from "@/lib/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { MemberItem } from "./MemberItem";
import { Search } from 'lucide-react';
import { deleteMember, updateMemberRole } from "@/Redux/groupsSlice";
// ==============================================
// COMPOSANT MEMBRES
// ==============================================
export const MembersTab = ({ creator, admins, members, searchTerm, setSearchTerm, currentUserId, groupId }) => {
    const [loading, setLoading] = useState({});
    const dispatch = useDispatch();
    let newRole;
    // Changer le rôle d'un membre (admin/membre)

    //  * done
    const handleChangeRole = async (userId, currentRole) => {
        setLoading(prev => ({ ...prev, [userId]: true }));
        try {
            newRole = currentRole === 'admin' ? 'member' : 'admin';
            await api.post(
                `/api/groups/${groupId}/change-role`,
                { user_id: userId, role: newRole }
            );
            dispatch(updateMemberRole({ userId, newRole }));
            // Recharger les données du groupe après modification
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
            await api.delete(
                `/api/groups/${groupId}/remove/${userId}`
            );
            // Recharger les données du groupe après modification
            dispatch(deleteMember(userId));
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
