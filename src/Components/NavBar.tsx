import myAvatar from "../assets/maleUser.png";
import icon from "../assets/twitter.png";
import chat from "../assets/chat1.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";

const NavBar = () => {
    let navigate = useNavigate();
    let [isProfileMenu, setIsProfileMenu] = useState(false);
    function showProfileMenu(){
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
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <Link to="/create">
                <i className="fa-solid fa-square-plus  "></i>
            </Link>
            <div></div>
            <div></div>

            <div onClick={showProfileMenu}>
                {isProfileMenu && <ProfileMenu />}
                <img src={myAvatar} alt="avatar" width={30} />
            </div>
        </div>
    );
};

export default NavBar;
