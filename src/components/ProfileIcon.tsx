import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const ProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
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
                        <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">Settings</li>
                        <hr className="border-gray-600 my-1" />
                        <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">Upgrade Plan</li>
                        <hr className="border-gray-600 my-1" />
                        <li className="p-2 hover:bg-red-600 rounded cursor-pointer">Log out</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
