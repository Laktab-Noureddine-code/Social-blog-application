/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/shared/ui/dialog';
import { UserCog, } from 'lucide-react';
import { MembersTab } from './MembersTab';
import { RequestsTab } from './RequestsTab';
import { InviterAmisTab } from './InviterAmisTab';

// ==============================================
// COMPOSANT PRINCIPAL - MEMBRES ET DEMANDES
// ==============================================
export const MembersSettings = ({ group }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('members');
    const [searchTerm, setSearchTerm] = useState('');
    const currentUser = useSelector(state => state.auth.user);
    
    // Separate pending members into requests and invitations
    const pendingRequests = group.members ? group.members.filter(member => 
        member.pivot.status === "pending" && member.pivot.role === "member"
    ) : [];
    
    const pendingInvitations = group.members ? group.members.filter(member => 
        member.pivot.status === "pending" && member.pivot.role === "invited"
    ) : [];

    // is admin || creator 
  
    // Filtrer les membres selon la recherche
    const filteredMembers = group.members ? group.members.filter(member =>
        member.name && member.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    // Séparer les membres par rôle
    const creator = group.creator;
    const admins = filteredMembers.filter(m => m.pivot.role === 'admin' && m.id !== creator.id);
    const members = filteredMembers.filter(m => m.pivot.role === "member" && m.pivot.status === "accepted");

    const membersCount = group.members.filter(m => m.pivot.status === "accepted").length
    return (
        <>
            {/* Bouton pour ouvrir le modal */}
           <button
                onClick={() => setIsOpen(true)}
                className="flex items-center justify-center border border-gray-400 hover:bg-gray-100 rounded-full p-2"
            >
                <UserCog size={27} />
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
                            Membres ({membersCount})
                        </button>
                        <button
                            className={`px-4 py-2 font-medium ${activeTab === 'requests' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'}`}
                            onClick={() => setActiveTab('requests')}
                        >
                            Demandes ({pendingRequests.length})
                        </button>
                        <button
                            className={`px-4 py-2 font-medium ${activeTab === 'inviter' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'}`}
                            onClick={() => setActiveTab('inviter')}
                        >
                            Inviter des amis
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
                    ) : activeTab === 'requests' ? (
                        <RequestsTab
                            group={group}
                            currentUserId={currentUser.id}
                            pendingMembers={pendingRequests}
                        />
                    ) : (
                        <InviterAmisTab
                            groupId={group.id}
                            currentUserId={currentUser.id}
                            groupMembers={group.members}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};