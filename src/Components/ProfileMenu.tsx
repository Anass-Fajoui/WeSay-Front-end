import { useNavigate } from "react-router";
import myAvatar from "../assets/maleUser.png";
import { useState, useEffect, useRef } from "react";

const ProfileMenu = () => {
    const userId = window.localStorage.getItem("userId");
    const navigate = useNavigate();
    const [isProfileMenu, setIsProfileMenu] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null); 

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsProfileMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function goToProfile() {
        navigate(`/profile/${userId}`);
    }
    function Logout() {
        navigate("/login");
        window.localStorage.setItem("token", "");
        window.localStorage.setItem("userId", "");
    }
    function editInfo() {
        navigate("/editInfo");
    }
    return (
        <div className="relative">
            <div className="rounded-full p-2 hover:bg-gray-50 transition" onClick={() => setIsProfileMenu(!isProfileMenu)}>
                <img src={myAvatar} alt="avatar" width={30} />
            </div>
            {isProfileMenu && (
                <div
                    className="absolute right-3 top-full mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100"
                    ref={dropdownRef}
                >
                    <div
                        onClick={goToProfile}
                        className="block px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors decoration-0"
                    >
                        View Profile
                    </div>
                    <div
                        onClick={editInfo}
                        className="block px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Edit Info
                    </div>
                    <div className="border-t border-gray-100"></div>
                    <div
                        onClick={Logout}
                        className="block px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Logout
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
