import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Alert, AlertDescription } from '@/shared/ui/alert';
import { BsExclamationTriangle } from "react-icons/bs";

const DeleteGroupModal = ({ group, isOpen, onClose, onDelete }) => {
    const [groupName, setGroupName] = useState('');
    const [error, setError] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (groupName !== group.name) {
            setError('Le nom du groupe ne correspond pas');
            return;
        }

        setIsDeleting(true);
        try {
            await onDelete(groupName);
            onClose();
        } catch (error) {
            setError(error.message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Supprimer le groupe</DialogTitle>
                    <DialogDescription>
                        Cette action est irréversible. Toutes les données du groupe seront supprimées.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <Alert variant="destructive">
                        <BsExclamationTriangle className="h-4 w-4" />
                        <AlertDescription>
                            Pour confirmer, veuillez entrer le nom du groupe <strong>{group.name}</strong>
                        </AlertDescription>
                    </Alert>

                    <Input
                        placeholder="Entrez le nom du groupe"
                        value={groupName}
                        onChange={(e) => {
                            setGroupName(e.target.value);
                            setError(null);
                        }}
                        className="w-full"
                    />

                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isDeleting}
                    >
                        Annuler
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting || groupName !== group.name}
                    >
                        {isDeleting ? 'Suppression...' : 'Supprimer'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteGroupModal;