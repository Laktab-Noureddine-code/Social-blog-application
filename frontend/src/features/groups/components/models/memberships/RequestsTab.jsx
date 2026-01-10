/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

// ==============================================
// COMPOSANT DEMANDES
// ==============================================
import { X, UserCheck, UserX } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import api from "@/lib/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
// Import the new reducer
import { addMember, deleteMember, updateMemberStatus } from '@/Redux/groupsSlice';
import { userProfile } from "@/shared/helpers/helper";

export const RequestsTab = ({ group, currentUserId ,pendingMembers}) => {
    const [loading, setLoading] = useState({});
    const [localPendingRequests, setLocalPendingRequests] = useState([]);
    const dispatch = useDispatch();
    
    // Filter members with pending status
    const pendingRequests = localPendingRequests.length > 0 
        ? localPendingRequests 
        : pendingMembers
    
    // Initialize localPendingRequests if it's empty
    if (localPendingRequests.length === 0 && pendingRequests.length > 0) {
        setLocalPendingRequests(pendingRequests);
    }

    // Gérer une demande (accepter/rejeter/annuler)
    const handleRequest = async (userId, action) => {
        setLoading(prev => ({ ...prev, [userId]: true }));

        try {
            if (action === 'accept') {
                // Call the accept member API endpoint
                const response = await api.put(
                    `/api/groups/${group.id}/accept-member/${userId}`,
                    {}  // Empty body
                );

                // Update the member's status to "accepted"
                dispatch(updateMemberStatus({ userId, newStatus: 'accepted' }));
                
                // Remove the member from the local pending requests
                setLocalPendingRequests(prev => 
                    prev.filter(member => member.id !== userId)
                );
            } else if (action === 'reject' || action === 'cancel') {
                // Call the remove member API endpoint
                await api.delete(
                    `/api/groups/${group.id}/remove/${userId}`
                );

                // Update Redux store by removing the member
                dispatch(deleteMember(userId));
                
                // Remove the member from the local pending requests
                setLocalPendingRequests(prev => 
                    prev.filter(member => member.id !== userId)
                );
            }
        } catch (error) {
            console.error(`Erreur lors de ${action} la demande:`, error);
        } finally {
            setLoading(prev => ({ ...prev, [userId]: false }));
        }
    };

    return (
        <div className="space-y-4">
            {pendingRequests.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                    {group.confidentiality === 'private'
                        ? "Aucune demande en attente"
                        : "Aucune invitation en cours"}
                </p>
            ) : (
                pendingRequests.map(member => (
                    <div key={member.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                {/* <AvatarImage src={member.image_profile_url} /> */}
                                <AvatarImage src={userProfile(member.image_profile_url)} />

                            </Avatar>
                            <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-xs text-gray-500">
                                    {new Date(member.pivot.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {/* Pour les groupes privés (demandes entrantes) */}
                            {group.confidentiality === 'privé' && (
                                <>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleRequest(member.id, 'accept')}
                                        disabled={loading[member.id]}
                                    >
                                        {loading[member.id] ? (
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
                                        onClick={() => handleRequest(member.id, 'reject')}
                                        disabled={loading[member.id]}
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
                                    onClick={() => handleRequest(member.id, 'cancel')}
                                    disabled={loading[member.id]}
                                >
                                    {loading[member.id] ? (
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