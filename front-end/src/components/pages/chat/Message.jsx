/* eslint-disable react/prop-types */
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Delete, Ellipsis } from "lucide-react";
import { useState } from "react";
import MediaDialog from "./images/MediaDialog";

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
                    <DropdownMenuTrigger className={`absolute flex items-center p-1 rounded-full justify-center top-2 bg-gray-200 ${isMyMessage ? '-left-7' : '-right-7'}  text-black`}><Ellipsis size={15} /></DropdownMenuTrigger>
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
            <MediaDialog
                isOpen={isMediaOpen}
                setIsOpen={setIsMediaOpen}
                mediaUrl={`http://localhost:8000/storage/${message.media}`}
            />
        </div>
    );
};

export default Message;