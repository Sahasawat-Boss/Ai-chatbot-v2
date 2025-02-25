import React from "react";
import { MdDelete } from "react-icons/md";

interface ClearChatButtonProps {
    onClearChat: () => void;
}

const ClearChatButton: React.FC<ClearChatButtonProps> = ({ onClearChat }) => {
    return (
        <button
            onClick={onClearChat}
            className="flex justify-center items-center gap-1 w-fit px-2 py-1 bg-gray-700 text-white rounded hover:bg-red-700 transition animate-fade-in-right"
        >
            <MdDelete />Clear Chat
        </button>
    );
};

export default ClearChatButton;
