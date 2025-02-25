import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
    message: string;
    isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
    return (
        <div className={`flex w-full my-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] overflow-auto ${isUser ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'} p-3 rounded-lg`}>
                {/* Only show the AI icon (faRobot) for assistant messages */}
                {!isUser && (
                    <div className="mr-2 animate-fade-in">
                        <FontAwesomeIcon icon={faRobot} className="h-6 w-6" />
                    </div>
                )}
                <div className="markdown-content animate-fade-in">
                    <ReactMarkdown>{typeof message === 'string' ? message : JSON.stringify(message)}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;
