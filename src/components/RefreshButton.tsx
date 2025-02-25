"use client";
import { IoMdRefresh } from "react-icons/io";

import React from "react";

const RefreshButton: React.FC = () => {
    const handleRefresh = () => {
        window.location.reload(); // Reload the page
    };

    return (
        <button
            onClick={handleRefresh}
            className="flex justify-center items-center gap-1 w-fit px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition animate-fade-in-left"
        >
            <IoMdRefresh />Refresh Page
        </button>
    );
};

export default RefreshButton;
