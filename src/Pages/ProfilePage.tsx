import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { useNavigate, useParams } from "react-router";
import authenticate from "../Service/authenticate";
import axios from "axios";
import { AxiosError } from "axios";
import { User, Tweet } from "../types";
import Spinner from "../Components/Spinner";
import EditableTweetCard from "../Components/EditableTweetCard";
import myAvatar from "../assets/maleUser.png";
import TweetCard from "../Components/TweetCard";
import ProfileHeader from "../Components/ProfileHeader";

const MyProfile = () => {
    const navigate = useNavigate();
    let [token, userId] = authenticate();
    let { id } = useParams();
    let [user, setUser] = useState<User>();
    let [tweets, setTweets] = useState<Tweet[]>([]);
    let [Loading, setLoading] = useState<Boolean>();

    async function getMyUser() {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/user/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setUser(response.data);
        } catch (e) {
            console.log(e);
        }
    }
    async function getMyTweets() {
        try {
            setLoading(true);
            const response = await axios.get(
                `http://localhost:8080/api/user/${id}/tweets`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTweets(response.data);
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                if (err.response.status === 403) {
                    navigate("/login");
                }
            }
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getMyUser();
        getMyTweets();
    }, []);

    return (
        <>
            <ProfileHeader name={user?.firstName + " " + user?.lastName} username={user?.userName}/>
            <div className="container">
                {(id == userId) && (<div className="flex justify-between m-3">
                    <div
                        className="p-2 px-3 bg-white rounded-4xl flex-grow cursor-pointer mx-2
                                    hover:bg-gray-50
                                    transition-all duration-200
                                    hover:shadow-[0_0_8px_rgba(0,0,0,0.1)]"
                        onClick={() => navigate("/create")}
                    >
                        What's on your mind ?
                    </div>
                    <div
                        onClick={() => navigate("/create")}
                        className="addNewTweet"
                    >
                        <i className="fa-solid fa-square-plus"></i>
                    </div>
                </div>)}
                {Loading && <Spinner />}
                {tweets.map((tweet) =>
                    id == userId ? (
                        <EditableTweetCard
                            {...tweet}
                            updateData={getMyTweets}
                        />
                    ) : (
                        <TweetCard {...tweet} updateData={getMyTweets} />
                    )
                )}
                {tweets.length === 0 && !Loading && (
                    <div className="mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md text-center mt-4 p-3">
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">
                            No Tweets Found
                        </h4>
                        <p className="text-gray-500">
                            Looks like there are no tweets to display right now.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default MyProfile;
