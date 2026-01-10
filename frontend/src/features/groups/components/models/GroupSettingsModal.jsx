/* eslint-disable react/prop-types */
import { useState } from 'react';
import api from '@/lib/api';
import { useDispatch } from 'react-redux';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/shared/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/shared/ui/select';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { updateGroup } from '@/Redux/groupsSlice';

const GroupSettingsModal = ({
    group,
    isOpen,
    onClose
}) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(group.name);
    const [confidentiality, setConfidentiality] = useState(group.confidentiality);
    const [visibility, setVisibility] = useState(group.visibility);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            const response = await api.put(
                `/api/groups/${group.id}/update-info`,
                {
                    name,
                    confidentiality,
                    visibility
                }
            );

            dispatch(updateGroup({
                groupId: group.id,
                updatedData: {
                    name,
                    confidentiality,
                    visibility
                }
            }));

            onClose();
        } catch (err) {
            setError(err.response?.data?.error || 'Une erreur est survenue');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Modifier les paramètres du groupe</DialogTitle>
                </DialogHeader>

                {error && (
                    <div className="p-4 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div>
                        <Input
                            placeholder="Nom du groupe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full"
                            required
                        />
                    </div>

                    <div>
                        <div className="text-sm text-gray-500 mb-1">Confidentialité</div>
                        <Select
                            value={confidentiality}
                            onValueChange={setConfidentiality}
                        >
                            <SelectTrigger className="w-full">
                                <div className="flex items-center">
                                    <Lock className="w-4 h-4 mr-2" />
                                    <SelectValue>
                                        {confidentiality === 'privé' ? 'Privé' : 'Public'}
                                    </SelectValue>
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="privé">Privé</SelectItem>
                                <SelectItem value="public">Public</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Visibility selector */}
                    <div>
                        <div className="text-sm text-gray-500 mb-1">Visibilité</div>
                        <Select
                            value={visibility}
                            onValueChange={setVisibility}
                        >
                            <SelectTrigger className="w-full">
                                <div className="flex items-center">
                                    {visibility === 'visible' ?
                                        <Eye className="w-4 h-4 mr-2" /> :
                                        <EyeOff className="w-4 h-4 mr-2" />
                                    }
                                    <SelectValue>
                                        {visibility === 'visible' ? 'Visible' : 'Masqué'}
                                    </SelectValue>
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="visible">Visible</SelectItem>
                                <SelectItem value="masqué">Masqué</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default GroupSettingsModal;