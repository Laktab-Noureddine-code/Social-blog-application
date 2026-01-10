/* eslint-disable react/prop-types */
import { X,  UserMinus, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { userProfile } from "@/shared/helpers/helper";

// ==============================================
// COMPOSANT ITEM MEMBRE
// ==============================================
export const MemberItem = ({ member, isCreator = false, isAdmin = false, currentUserId, onRoleChange, onRemove, loading }) => {
    // Ne pas afficher les actions pour soi-même ou le créateur
    const showActions = !isCreator && member.id !== currentUserId;

    return (
        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage src={userProfile(member.image_profile_url)} />
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