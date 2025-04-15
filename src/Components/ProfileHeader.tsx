import myAvatar from "../assets/maleUser.png";
import { useNavigate, Link } from "react-router";
import chat from "../assets/chatWhite.png";
import whiteAvatar from "../assets/whiteUser.png"
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";

const ProfileHeader = ({
    name,
    username,
}: {
    name: string | undefined;
    username: string | undefined;
}) => {
    const navigate = useNavigate();
    let [isProfileMenu, setIsProfileMenu] = useState(false);
        function showProfileMenu() {
            setIsProfileMenu(!isProfileMenu);
        }
    return (
        <>
            <div className="profile-header mb-4">
                <div className="background flex justify-between items-center p-4">
                    <Link
                        to="/feed"
                        style={{ textDecoration: "none" }}
                        className="flex items-center"
                    >
                        <img src={chat} alt="" width={30} />
                        <div className="p-2 text-white font-bold no-underline text-xl">
                            Tweetle
                        </div>
                    </Link>
                    <div onClick={showProfileMenu} className="relative">
                        {isProfileMenu && <ProfileMenu />}
                        <div className="rounded-full p-2 hover:bg-gray-300 transition">
                            <img src={whiteAvatar} alt="avatar" width={30} />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="flex ">
                        <div className="bg-white w-fit rounded-full p-3 avatar">
                            <img src={myAvatar} alt="avatar" width={80} />
                        </div>
                        <div className="mx-3 my-1">
                            <div className="font-bold text-2xl text-gray-900">
                                {name}
                            </div>
                            <div className="text-gray-500 dark:text-gray-400">
                                @{username}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileHeader;
