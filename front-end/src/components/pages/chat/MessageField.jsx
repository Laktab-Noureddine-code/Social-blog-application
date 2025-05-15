import { Send, Image as ImageIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../../Redux/messagesSlice";

function MessageField({ receiverId }) {
    // const { chatId } = useParams(); // receiver_id
    const [message, setMessage] = useState("");
    const [media, setMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [isSending, setIsSending] = useState(false);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const token = useSelector(state => state.auth.access_token);
    const dispatch = useDispatch();

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

        setIsSending(true);

        try {
            const formData = new FormData();
            formData.append('receiver_id', receiverId);
            formData.append('message', message.trim());
            if (media) {
                formData.append('media', media);
            }
            
            const response = await fetch('/api/messages/send', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                },
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to send message');
            }

            // dispatch(addMessage(data));
            setMessage("");
            clearMedia();

        } catch (err) {
            console.error('Message send error:', err);
            alert(err.message);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border-t border-gray-400 p-4 bg-white">
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
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tapez un message..."
                    rows={1}
                    className="resize-none flex-1 bg-transparent text-lg font-medium px-2 py-1 focus:outline-none max-h-32 overflow-auto"
                />

                <input
                    type="file"
                    accept="image/*,video/*"
                    ref={fileInputRef}
                    onChange={handleMediaChange}
                    className="hidden"
                />

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-700 mr-2"
                    title="Ajouter une image ou vidéo"
                >
                    <ImageIcon className="h-5 w-5" />
                </button>

                <button
                    type="submit"
                    disabled={isSending || (!message.trim() && !media)}
                    className={`p-2 rounded-full transition ${isSending || (!message.trim() && !media)
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600'
                        } text-white`}
                >
                    <Send className="h-5 w-5" />
                </button>
            </div>
        </form>
    );
}

export default MessageField;
