import React from "react";

interface ClearChatButtonProps {
    onClearChat: () => void;
}

const ClearChatButton: React.FC<ClearChatButtonProps> = ({ onClearChat }) => {
    return (
        <button
            onClick={onClearChat}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
            Clear Chat
        </button>
    );
};

export default ClearChatButton;
