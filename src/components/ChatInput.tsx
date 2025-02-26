import React, { useState } from 'react';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !isLoading) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center py-5 px-8 animate-fade-in-up">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow px-5 py-2 rounded-xl rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
            />
            <button
                type="submit"
                className={`px-5 py-2 bg-gray-600 rounded-xl rounded-l-none text-white rounded-r-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                    }`}
                disabled={isLoading}
            >
                Ask AI
            </button>
        </form>
    );
};

export default ChatInput;
