/* eslint-disable react/prop-types */
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { Delete, Ellipsis, Pencil } from "lucide-react";
import { useState } from "react";
import MediaDialog from "./images/MediaDialog";
import { userProfile } from "@/shared/helpers/helper";
import { Link } from "react-router-dom";

// Helper to format time under the message (ex: 21:40)
const formatTimeOnly = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

const Message = ({ message, isMyMessage, onDelete, onEdit }) => {
    const [isMediaOpen, setIsMediaOpen] = useState(false);
    const sender = message.sender || {
        id: message.sender_id,
        couverture_url: null,
        profile_image: null
    };
    
    return (
        <div className={`relative flex gap-2 mb-5 ${isMyMessage ? "justify-end" : "justify-start"}`}>
            {
                isMyMessage ? "" : (
                    <Link to={`/profile/${sender.id}`}>
                        <img
                            src={userProfile(sender.couverture_url)}
                            className="w-7 h-7 rounded-full"
                            alt="sender"
                        />
                    </Link>
                )
            }

            <div
                className={`${message.media ? "p-1  md:max-w-[40%] max-w-[80%]" : "px-4 py-2 max-w-md"} relative ${isMyMessage
                    ? "bg-[#424dc4] text-white shadow-xl rounded-[8px_0px_8px_8px]"
                    : "bg-white border border-gray-200 shadow-lg rounded-[0_8px_8px_8px]"}`}
            >

                {/* Image if media present */}
                {message.media && (
                    <img
                        src={`http://localhost:8000/storage/${message.media}`}
                        alt="media"
                        loading="lazy"
                        className="max-w-full h-auto rounded-md mt-2 cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setIsMediaOpen(true)}
                    />
                )}

                {/* Message content */}
                {message.message && <p className="text-sm break-words">{message.message}</p>}
                
                {/* Edit indicator */}
                {message.is_edited && (
                    <span className={`text-[10px] ${isMyMessage ? 'text-blue-200' : 'text-gray-400'}`}>
                        (edited)
                    </span>
                )}

                {/* Menu actions - Only show for own messages */}
                {isMyMessage && (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="absolute flex items-center p-1 rounded-full justify-center top-2 bg-gray-200 -left-7 text-black">
                            <Ellipsis size={15} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-32 bg-white shadow-lg border rounded-md">
                            {/* Edit option - only for text messages */}
                            {message.message && (
                                <DropdownMenuItem 
                                    onClick={() => onEdit(message)} 
                                    className="text-blue-600 p-2 text-sm cursor-pointer"
                                >
                                    <Pencil className="mr-2 w-4 h-4" /> Edit
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                                onClick={() => onDelete(message.id)} 
                                className="text-red-600 p-2 text-sm cursor-pointer"
                            >
                                <Delete className="mr-2 w-4 h-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>

            {/* Time under message */}
            <div className={`absolute ${isMyMessage ? "right-0" : "left-10"} bottom-[-18px] text-xs mt-1 text-gray-500`}>
                {formatTimeOnly(message.created_at)}
            </div>

            {/* Dialog to show full-screen image */}
            <MediaDialog
                isOpen={isMediaOpen}
                setIsOpen={setIsMediaOpen}
                mediaUrl={`http://localhost:8000/storage/${message.media}`}
            />
        </div>
    );
};

export default Message;