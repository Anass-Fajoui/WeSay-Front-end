import myAvatar from "../assets/maleUser.png";
import icon from "../assets/twitter.png";
import chat from "../assets/chat1.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import SearchBar from "./SearchBar";

const NavBar = () => {
    let navigate = useNavigate();
    let [isProfileMenu, setIsProfileMenu] = useState(false);
    function showProfileMenu() {
        setIsProfileMenu((value) => !value);
    }
    return ( 
        <div className="navbar">
            <Link
                to="/feed"
                className="logo flex items-center justify-center"
                style={{ textDecoration: "none" }}
            >
                <img src={chat} alt="" />
                <div className="p-2 text-black font-bold no-underline text-xl">
                    Tweetle
                </div>
            </Link>
            <SearchBar></SearchBar>
            <div></div>
            <div></div>
            <div onClick={showProfileMenu}>
                {isProfileMenu && <ProfileMenu />}
                <div className="rounded-full p-2 hover:bg-gray-50 transition">
                    <img src={myAvatar} alt="avatar" width={30} />
                </div>
            </div>
        </div>
    );
};

export default NavBar;
