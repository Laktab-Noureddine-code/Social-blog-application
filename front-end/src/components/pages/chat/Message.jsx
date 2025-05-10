import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Delete } from "lucide-react";

function Message({ message, showDateHeader, formatDateHeader, isMyMessage, onDelete }) {
    return (
        <div>
            {showDateHeader && (
                <div className="text-gray-600 text-sm my-2 text-center">
                    {formatDateHeader(message.created_at)}
                </div>
            )}
            <div className={`flex mb-4 ${isMyMessage(message) ? "justify-end" : "justify-start"}`}>
                <div
                    title={formatDateHeader(message.created_at)}
                    className={`px-4 py-2 max-w-md relative ${isMyMessage(message)
                        ? "bg-[#6c74c5] text-white shadow-xl rounded-[8px_0px_8px_8px]"
                        : "bg-gray-50 border border-gray-200 shadow-lg rounded-[0_8px_8px_8px]"
                        }`}
                >
                    {/* Contenu du message */}
                    {message.message && <p className="text-sm break-words">{message.message}</p>}
                    {message.media && (
                        <img
                            src={"http://localhost:8000/storage/"+message.media}
                            alt="media"
                            crossOrigin="anonymous"
                            loading="lazy"
                            className="max-w-full h-auto rounded-md mt-2"
                        />
                    )}

                    {/* Menu Dropdown pour supprimer */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="absolute top-2 right-2 text-gray-600">
                            ⋮
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-32 bg-white shadow-lg border rounded-md">
                            <DropdownMenuItem
                                onClick={() => onDelete(message.id)}
                                className="text-red-600 p-2 text-sm cursor-pointer"
                            >
                                <Delete className="mr-2 w-4 h-4" />
                                Supprimer
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}

export default Message;
