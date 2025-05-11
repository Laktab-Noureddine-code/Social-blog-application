// src/components/Message.jsx

import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Delete } from "lucide-react";

// Helper pour formater date sous le message
const formatDateUnderMessage = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const Message = ({ message, isMyMessage, onDelete }) => {
    return (
        <div className={`flex mb-4 ${isMyMessage ? "justify-end" : "justify-start"}`}>
            <div
                className={`px-4 py-2 max-w-md relative ${isMyMessage
                    ? "bg-[#6c74c5] text-white shadow-xl rounded-[8px_0px_8px_8px]"
                    : "bg-gray-50 border border-gray-200 shadow-lg rounded-[0_8px_8px_8px]"}`}
            >
                {message.message && <p className="text-sm break-words">{message.message}</p>}

                {message.media && (
                    <img
                        src={`http://localhost:8000/storage/${message.media}`}
                        alt="media"
                        loading="lazy"
                        className="max-w-full h-auto rounded-md mt-2"
                    />
                )}

                {/* Date sous le message */}
                <div className={`text-xs mt-1 ${isMyMessage ? "text-gray-200" : "text-gray-500"}`}>
                    {formatDateUnderMessage(message.created_at)}
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger className="absolute top-2 right-2 text-gray-600">⋮</DropdownMenuTrigger>
                    <DropdownMenuContent className="w-32 bg-white shadow-lg border rounded-md">
                        <DropdownMenuItem onClick={() => onDelete(message.id)} className="text-red-600 p-2 text-sm cursor-pointer">
                            <Delete className="mr-2 w-4 h-4" /> Supprimer
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default Message;
