import { Send } from "lucide-react";
import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../../Redux/messagesSlice";

function MessageField() {
    const { chatId } = useParams(); // receiver_id
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const textareaRef = useRef(null);
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch()

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setIsSending(true);

        try {
            const response = await fetch('/api/messages/send', { // Full URL for testing
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    receiver_id: chatId,
                    message: message.trim()
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to send message');
            }

            // dispatch(addMessage(data));
            setMessage("");

        } catch (err) {
            console.error('Message send error:', err);
            alert(err.message); // Show error to user
        } finally {
            setIsSending(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border-t border-gray-400 p-4 bg-white">
            <div className="flex items-center bg-gray-100 rounded-xl py-1 px-3">
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tapez un message..."
                    rows={1}
                    className="resize-none flex-1 bg-transparent text-lg font-medium px-2 py-1 focus:outline-none max-h-32 overflow-auto"
                />

                <button
                    type="submit"
                    disabled={isSending || !message.trim()}
                    className={`p-2 rounded-full transition ${isSending || !message.trim()
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