import myAvatar from "../assets/maleUser.png";
import icon from "../assets/twitter.png";
import chat from "../assets/chat1.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import SearchBar from "./SearchBar";

const NavBar = () => {
    return (
        <div className="navbar">
            <Link
                to="/feed"
                className="logo flex items-center justify-center"
                style={{ textDecoration: "none" }}
            >
                <img src={chat} alt="" />
                <div className="p-2 text-black font-bold no-underline text-xl">
                    WeSay
                </div>
            </Link>
            <SearchBar></SearchBar>
            <div></div>
            <div></div>
            <ProfileMenu />
        </div>
    );
};

export default NavBar;
