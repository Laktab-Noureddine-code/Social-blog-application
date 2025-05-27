/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { Clock, Users, Lock, Eye, EyeOff } from "lucide-react";

function AboutGroup() {
    const group = useSelector(state => state.groups.currentGroup);

    if (!group) return (
        <div className="p-4 text-center text-gray-500">
            Chargement des informations du groupe...
        </div>
    );
    const totalMembers = group.members.filter(m => m.pivot.status == "accepted").length


    return (
        <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">À propos de ce groupe</h2>

            {/* Section Description */}
            <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">DESCRIPTION</h3>
                <p className="text-gray-700 whitespace-pre-line">
                    {group.description || "Aucune description fournie"}
                </p>
            </div>

            {/* Détails du groupe */}
            <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                    <Lock className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Groupe {group.confidentiality === 'privé' ? 'privé' : 'public'}</span>
                </div>

                <div className="flex items-center text-gray-700">
                    {group.visibility === 'visible' ? (
                        <Eye className="w-4 h-4 mr-2 text-gray-500" />
                    ) : (
                        <EyeOff className="w-4 h-4 mr-2 text-gray-500" />
                    )}
                    <span>{group.visibility === 'visible' ? 'Visible' : 'Masqué'} aux membres</span>
                </div>

                <div className="flex items-center text-gray-700">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Créé le {new Date(group.created_at).toLocaleDateString('fr-FR')}</span>
                </div>

                <div className="flex items-center text-gray-700">
                    <Users className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{totalMembers || 0} membre{totalMembers !== 1 ? 's' : ''}</span>
                </div>
            </div>


        </div>
    );
}

export default AboutGroup;