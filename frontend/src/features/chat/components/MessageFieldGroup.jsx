/* eslint-disable react/prop-types */
import { Send, Image as ImageIcon, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearEditingMessage, updateGroupMessage } from "@/Redux/messagesSlice";
import api from "@/lib/api";

function MessageFieldGroup({ group }) {
    const [message, setMessage] = useState("");
    const [media, setMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [isSending, setIsSending] = useState(false);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const editingMessage = useSelector(state => state.messages.editingMessage);
    const dispatch = useDispatch();

    // When editing a message, populate the textarea
    useEffect(() => {
        if (editingMessage) {
            setMessage(editingMessage.message || "");
            textareaRef.current?.focus();
        }
    }, [editingMessage]);

    const cancelEdit = () => {
        dispatch(clearEditingMessage());
        setMessage("");
    };

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${Math.min(textarea.scrollHeight, 130)}px`;
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [message]);

    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMedia(file);
            setMediaPreview(URL.createObjectURL(file));
        }
    };

    const clearMedia = () => {
        setMedia(null);
        setMediaPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim() && !media) return;

        if (!group?.id) {
            alert("No group selected.");
            return;
        }

        // Handle UPDATE mode
        if (editingMessage) {
            setIsSending(true);
            try {
                await api.put(`/api/group/messages/${editingMessage.id}`, {
                    message: message.trim()
                });

                // Update message in Redux store
                dispatch(updateGroupMessage({
                    id: editingMessage.id,
                    message: message.trim(),
                    is_edited: true
                }));

                setMessage("");
                dispatch(clearEditingMessage());

            } catch (err) {
                console.error('Message update error:', err);
            } finally {
                setIsSending(false);
            }
            return;
        }

        // Handle CREATE mode (existing code)
        setIsSending(true);

        try {
            const formData = new FormData();
            formData.append('group_id', group.id);
            formData.append('message', message.trim());
            if (media) {
                formData.append('media', media);
            }

            await api.post('/api/group/messages/send', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage("");
            clearMedia();
        } catch (err) {
            console.error('Message send error:', err);
            // Don't show alert - just log the error
        } finally {
            setIsSending(false);
        }
    };
      

    return (
        <form onSubmit={handleSubmit} className="border-t border-gray-400 p-4 bg-white">
            {/* Editing indicator */}
            {editingMessage && (
                <div className="mb-2 flex items-center justify-between bg-blue-50 border-l-4 border-blue-500 px-3 py-2 rounded-r">
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-blue-600">Editing message</span>
                        <span className="text-sm text-gray-600 truncate max-w-xs">{editingMessage.message}</span>
                    </div>
                    <button
                        type="button"
                        onClick={cancelEdit}
                        className="p-1 hover:bg-blue-100 rounded-full text-gray-500 hover:text-gray-700"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}

            {mediaPreview && (
                <div className="mb-2 relative w-32">
                    <img src={mediaPreview} alt="Preview" className="rounded-md" />
                    <button
                        type="button"
                        onClick={clearMedia}
                        className="absolute top-0 right-0 bg-black bg-opacity-60 text-white rounded-full p-1 text-xs"
                    >
                        ✕
                    </button>
                </div>
            )}

            <div className="flex items-center bg-gray-100 rounded-xl py-1 px-3">
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 rounded-full  text-gray-800 mr-2 hover:bg-blue-600 hover:text-white bg-gray-300 "
                    title="Add an image"
                >
                    <ImageIcon className="h-5 w-5" />
                </button>

                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Message in group "${group && group.name}"...`}
                    rows={1}
                    className="resize-none flex-1 bg-transparent md:text-lg sm:text-sm text-[10px] font-medium px-2 py-1 focus:outline-none max-h-32 overflow-auto"
                />

                <input
                    type="file"
                    accept="image/*,video/*"
                    ref={fileInputRef}
                    onChange={handleMediaChange}
                    className="hidden"
                />

                

                <button
                    type="submit"
                    disabled={isSending || (!message.trim() && !media)}
                    className={`p-2 rounded-full transition ${isSending || (!message.trim() && !media)
                        ? 'bg-gray-300 cursor-not-allowed text-gray-800'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                        } `}
                >
                    <Send className="h-5 w-5" />
                </button>
            </div>
        </form>
    );
}

export default MessageFieldGroup;
