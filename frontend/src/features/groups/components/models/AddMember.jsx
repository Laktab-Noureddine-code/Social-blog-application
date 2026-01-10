/* eslint-disable react/prop-types */
import { useState } from 'react';
import api from '@/lib/api';
import { useSelector } from 'react-redux';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { X } from 'lucide-react';
import { Checkbox } from '@/shared/ui/checkbox';
import useUsersLoader from '@/shared/hooks/useUsersLoader';
import { MdOutlineGroupAdd } from "react-icons/md";
import { userProfile } from "@/shared/helpers/helper";


const AddMember = ({ group }) => {
  useUsersLoader(); // Load users/friends
  const users = useSelector(state => state.users.users);
  const currentUserId = useSelector(state => state.auth.user.id);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter out current user and existing group members
  const existingMemberIds = group.members.map(member => member.id);
  const availableUsers = users.filter(
    user => user.id !== currentUserId && !existingMemberIds.includes(user.id)
  );

  const toggleUserSelection = (user) => {
    setSelectedUsers(prev =>
      prev.some(u => u.id === user.id)
        ? prev.filter(u => u.id !== user.id)
        : [...prev, user]
    );
  };

  const handleSubmit = async () => {
    if (selectedUsers.length === 0) return;

    setIsLoading(true);
    try {
      const response = await api.post(
        `/api/groups/${group.id}/invite-members`,
        {
          user_ids: selectedUsers.map(user => user.id),
        }
      );

      setIsOpen(false);
      setSelectedUsers([]);
    } catch (error) {
      console.error('Error inviting members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className='flex items-center justify-center border border-gray-400 hover:bg-gray-100 rounded-full p-2'>
          <MdOutlineGroupAdd size={27} />
        </button>
      </DialogTrigger>
      <DialogContent className="md:min-w-[900px] max-w-full">
        <DialogHeader>
          <DialogTitle>Ajouter des membres au groupe</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-10">
          {/* Available friends list */}
          <div className="space-y-4 border-r pr-4">
            <h3 className="font-medium">Vos amis</h3>
            <div className="space-y-2 h-[300px] overflow-y-auto">
              {availableUsers.length > 0 ? (
                availableUsers.map(user => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={userProfile(user.image_profile_url)}
                        alt={user.name}
                        className="w-10 h-10 rounded-full mr-3 object-cover border border-gray-200"
                      />
                      <span>{user.name}</span>
                    </div>
                    <Checkbox
                      checked={selectedUsers.some(u => u.id === user.id)}
                      onCheckedChange={() => toggleUserSelection(user)}
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Aucun ami disponible à ajouter</p>
              )}
            </div>
          </div>

          {/* Selected users list */}
          <div className="space-y-4 pl-4">
            <h3 className="font-medium">Membres sélectionnés ({selectedUsers.length})</h3>
            <div className="space-y-2 h-[300px] overflow-y-auto">
              {selectedUsers.length > 0 ? (
                selectedUsers.map(user => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span>{user.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleUserSelection(user)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Aucun membre sélectionné</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={selectedUsers.length === 0 || isLoading}
          >
            {isLoading ? 'Envoi en cours...' : 'Envoyer les invitations'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMember;