/* eslint-disable react/prop-types */
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { Delete, X } from "lucide-react";
import { useState } from "react";

// Helper pour formater l'heure sous le message (ex : 21:40)
const formatTimeOnly = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

const Message = ({ message, isMyMessage, onDelete }) => {
    const [isMediaOpen, setIsMediaOpen] = useState(false);
    return (
        <div className={`relative flex mb-5 ${isMyMessage ? "justify-end" : "justify-start"}`}>
            <div
                className={`${message.media ? "p-1  md:max-w-[40%] max-w-[80%]" : "px-4 py-2 max-w-md"} relative ${isMyMessage
                    ? "bg-[#424dc4] text-white shadow-xl rounded-[8px_0px_8px_8px]"
                    : "bg-white border border-gray-200 shadow-lg rounded-[0_8px_8px_8px]"}`}
            >

                {/* Image si media présent */}
                {message.media && (
                    <img
                        src={`http://localhost:8000/storage/${message.media}`}
                        alt="media"
                        loading="lazy"
                        className="max-w-full h-auto rounded-md mt-2 cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setIsMediaOpen(true)}
                    />
                )}

                {/* Contenu du message */}
                {message.message && <p className="text-sm break-words">{message.message}</p>}
                {/* Menu suppression */}
                <DropdownMenu>
                    <DropdownMenuTrigger className="absolute top-2 right-2 text-gray-600">⋮</DropdownMenuTrigger>
                    <DropdownMenuContent className="w-32 bg-white shadow-lg border rounded-md">
                        <DropdownMenuItem onClick={() => onDelete(message.id)} className="text-red-600 p-2 text-sm cursor-pointer">
                            <Delete className="mr-2 w-4 h-4" /> Supprimer
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Heure sous le message */}
            <div className={`absolute ${isMyMessage ? "right-0" : "left-0"} bottom-[-18px] text-xs mt-1 text-gray-500`}>
                {formatTimeOnly(message.created_at)}
            </div>

            {/* Dialog pour afficher l'image en plein écran */}
            <Dialog open={isMediaOpen} onOpenChange={setIsMediaOpen}>
                <DialogTitle></DialogTitle>
                <DialogContent className="sm:max-w-3xl max-h-screen p-1 bg-black/80 border-none">
                    <DialogClose className="absolute right-4 top-4 rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors">
                        <X className="h-6 w-6 text-white cursor-pointer" />
                    </DialogClose>

                    <div className="flex items-center justify-center w-full h-full">
                        <img
                            src={`http://localhost:8000/storage/${message.media}`}
                            alt="media"
                            className="max-w-full max-h-[80vh] object-contain rounded-md"
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Message;