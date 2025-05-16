/* eslint-disable react/prop-types */
import { Send, Image as ImageIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function MessageField({ receiverId }) {
    const { chatId } = useParams(); // receiver_id
    receiverId = receiverId || chatId;
    const [message, setMessage] = useState("");
    const [media, setMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [isSending, setIsSending] = useState(false);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const token = useSelector(state => state.auth.access_token);



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
            // Handle different request types based on whether media is included
            if (media) {
                // console.log(typeof receiverId)
                // Use FormData for requests with files
                const formData = new FormData();
                formData.append('receiver_id', String(receiverId)); // 👈 au lieu de parseInt
                console.log(formData.get('receiver_id')) // Explicitly convert to number
                if (message.trim()) {
                    formData.append('message', message.trim());
                }
                formData.append('media', media);
                const response = await fetch('http://127.0.0.1:8000/api/messages/send', {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        // Don't set Content-Type with FormData - browser will do it
                    },
                    body: formData
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to send message');
                }


            } else {
                // Use JSON for text-only messages (matching your Postman request)
                const response = await fetch('/api/messages/send', {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        receiver_id: parseInt(receiverId), // Ensure it's an integer
                        message: message.trim()
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to send message');
                }

            }

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