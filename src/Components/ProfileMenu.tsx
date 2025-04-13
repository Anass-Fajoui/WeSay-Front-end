import React from "react";
import { useNavigate } from "react-router";

const ProfileMenu = () => {
    const navigate = useNavigate();
    function goToProfile() {
        navigate(`/myprofile`);
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
        <div className="absolute right-3 top-full mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
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
    );
};

export default ProfileMenu;
