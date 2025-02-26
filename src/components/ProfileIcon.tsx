import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const ProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const openModal = () => {
        setShowModal(true);
        setIsOpen(false); // Close menu when opening modal
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="relative" ref={menuRef}>
            {/* Profile Picture Button */}
            <button onClick={toggleMenu} className="p-1 rounded-full hover:bg-gray-300 animate-fade-in">
                <Image 
                    src="/my-profile-zoomed.jpg" 
                    alt="Profile Picture" 
                    width={36} 
                    height={36} 
                    className="w-14 h-14 rounded-full border border-gray-400 hover:opacity-80"
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-gray-800 text-white rounded-lg shadow-lg">
                    <ul className="p-2">
                        <li className="p-2 rounded cursor-pointer">(Gemini Free API Key)</li>                  
                        <li onClick={openModal} className="p-2 hover:bg-gray-700 rounded cursor-pointer">Upgrade Plan?</li>
                        <hr className="border-gray-600 my-1" />
                        <li onClick={openModal} className="p-2 hover:bg-red-600 rounded cursor-pointer">Log out</li>
                    </ul>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white text-black p-10 rounded-lg shadow-lg text-center">
                        <p className="text-lg font-semibold">Contact Boss for implementing this app 😂</p>
                        <button 
                            onClick={closeModal} 
                            className="mt-4 bg-gray-600 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
