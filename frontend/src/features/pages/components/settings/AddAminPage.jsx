/* eslint-disable react/prop-types */
// import { useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { Button } from "@/shared/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/shared/ui/dialog";
// import { X } from "lucide-react";
// import { Checkbox } from "@/shared/ui/checkbox";
// import useUsersLoader from '@/shared/hooks/useUsersLoader';

// const AddAdminPage = ({ page }) => {
//   useUsersLoader(); // Load users/friends
//   const users = useSelector((state) => state.users.users);
//   const token = useSelector((state) => state.auth.access_token);
//   const currentUserId = useSelector((state) => state.auth.user.id);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // Filter out current user and existing group members
//   const existingMemberIds = group.members.map((member) => member.id);
//   const availableUsers = users.filter(
//     (user) => user.id !== currentUserId && !existingMemberIds.includes(user.id)
//   );

//   const toggleUserSelection = (user) => {
//     setSelectedUsers((prev) =>
//       prev.some((u) => u.id === user.id)
//         ? prev.filter((u) => u.id !== user.id)
//         : [...prev, user]
//     );
//   };

//   const handleSubmit = async () => {
//     if (selectedUsers.length === 0) return;

//     setIsLoading(true);
//     try {
//       const response = await axios.post(
//         `/api/page/${page.id}/invite-members`,
//         {
//           user_ids: selectedUsers.map((user) => user.id),
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setIsOpen(false);
//       setSelectedUsers([]);
//     } catch (error) {
//       console.error("Error inviting members:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild>
//         <Button variant="outline" size="sm">
//           Ajouter des membres
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="md:min-w-[900px] max-w-full">
//         <DialogHeader>
//           <DialogTitle>Ajouter des membres au groupe</DialogTitle>
//         </DialogHeader>

//         <div className="grid grid-cols-2 gap-10">
//           {/* Available friends list */}
//           <div className="space-y-4 border-r pr-4">
//             <h3 className="font-medium">Vos amis</h3>
//             <div className="space-y-2 h-[300px] overflow-y-auto">
//               {availableUsers.length > 0 ? (
//                 availableUsers.map((user) => (
//                   <div
//                     key={user.id}
//                     className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
//                         <span className="text-sm font-medium">
//                           {user.name.charAt(0).toUpperCase()}
//                         </span>
//                       </div>
//                       <span>{user.name}</span>
//                     </div>
//                     <Checkbox
//                       checked={selectedUsers.some((u) => u.id === user.id)}
//                       onCheckedChange={() => toggleUserSelection(user)}
//                     />
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500">Aucun ami disponible à ajouter</p>
//               )}
//             </div>
//           </div>

//           {/* Selected users list */}
//           <div className="space-y-4 pl-4">
//             <h3 className="font-medium">
//               Membres sélectionnés ({selectedUsers.length})
//             </h3>
//             <div className="space-y-2 h-[300px] overflow-y-auto">
//               {selectedUsers.length > 0 ? (
//                 selectedUsers.map((user) => (
//                   <div
//                     key={user.id}
//                     className="flex items-center justify-between p-2 bg-gray-50 rounded"
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
//                         <span className="text-sm font-medium">
//                           {user.name.charAt(0).toUpperCase()}
//                         </span>
//                       </div>
//                       <span>{user.name}</span>
//                     </div>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => toggleUserSelection(user)}
//                     >
//                       <X className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500">Aucun membre sélectionné</p>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-end gap-2 pt-4">
//           <Button
//             variant="outline"
//             onClick={() => setIsOpen(false)}
//             disabled={isLoading}
//           >
//             Annuler
//           </Button>
//           <Button
//             onClick={handleSubmit}
//             disabled={selectedUsers.length === 0 || isLoading}
//           >
//             {isLoading ? "Envoi en cours..." : "Envoyer les invitations"}
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AddAdminPage;




import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { UserPlus, X } from "lucide-react";
import { Checkbox } from "@/shared/ui/checkbox";
import api from "@/lib/api";

const AddAdminPage = ({ page }) => {
  const currentUserId = useSelector((state) => state.auth.user.id);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const existingMemberIds = page.admis ? page.admis.map((member) => member.id) : [];

  const toggleUserSelection = (user) => {
    setSelectedUsers((prev) =>
      prev.some((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user]
    );
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    try {
      const response = await api.get(`/api/users/search`, {
        params: { q: query },
      });

      const filtered = response.data.filter(
        (user) =>
          user.id !== currentUserId && !existingMemberIds.includes(user.id)
      );

      setSearchResults(filtered);
    } catch (error) {
      console.error("Erreur recherche utilisateur :", error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (selectedUsers.length === 0) return;

    setIsLoading(true);
    try {
      await api.post(`/api/page/${page.id}/invite-members`, {
        user_ids: selectedUsers.map((user) => user.id),
      });

      setIsOpen(false);
      setSelectedUsers([]);
      setSearchTerm("");
      setSearchResults([]);
    } catch (error) {
      console.error("Error inviting members:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="w-full mt-4 px-4 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center gap-2 shadow-sm hover:shadow">
          <UserPlus className="w-5 h-5" />
          Ajouter un administrateur
        </button>
      </DialogTrigger>
      <DialogContent className="md:min-w-[900px] max-w-full">
        <DialogHeader>
          <DialogTitle>Ajouter des membres à la page</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-10">
          {/* Liste des utilisateurs filtrés */}
          <div className="space-y-4 border-r pr-4">
            <h3 className="font-medium">Rechercher un utilisateur</h3>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Nom d'utilisateur..."
              className="w-full border p-2 rounded mb-2"
            />

            <div className="space-y-2 h-[300px] overflow-y-auto">
              {searchLoading ? (
                <p className="text-gray-500">Recherche en cours...</p>
              ) : searchResults.length > 0 ? (
                searchResults.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span>{user.name}</span>
                    </div>
                    <Checkbox
                      checked={selectedUsers.some((u) => u.id === user.id)}
                      onCheckedChange={() => toggleUserSelection(user)}
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Aucun utilisateur trouvé</p>
              )}
            </div>
          </div>

          {/* Liste des utilisateurs sélectionnés */}
          <div className="space-y-4 pl-4">
            <h3 className="font-medium">
              Membres sélectionnés ({selectedUsers.length})
            </h3>
            <div className="space-y-2 h-[300px] overflow-y-auto">
              {selectedUsers.length > 0 ? (
                selectedUsers.map((user) => (
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
            {isLoading ? "Envoi en cours..." : "Envoyer les demandes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAdminPage;
