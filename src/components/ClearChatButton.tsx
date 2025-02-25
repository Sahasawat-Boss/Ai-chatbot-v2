import React from "react";

interface ClearChatButtonProps {
    onClearChat: () => void;
}

const ClearChatButton: React.FC<ClearChatButtonProps> = ({ onClearChat }) => {
    return (
        <button
            onClick={onClearChat}
            className="w-fit px-2 py-1 bg-red-700 text-white rounded hover:bg-red-500 transition"
        >
            Clear Chat
        </button>
    );
};

export default ClearChatButton;
