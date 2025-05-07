import { Send } from "lucide-react"

function MessageField() {
    return (
        <div className="border-t border-gray-400 p-4 bg-white">
            <div className="flex items-center bg-gray-100 rounded-xl py-1 px-3">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent text-lg font-[500] px-4 py-2 focus:outline-none"
                />
                <Send className="h-6 w-6 text-blue-500 cursor-pointer" />
            </div>
        </div>
    )
}

export default MessageField
