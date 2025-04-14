import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { useNavigate } from "react-router";
import authenticate from "../Service/authenticate";
import axios from "axios";
import { AxiosError } from "axios";
import { User, Tweet } from "../types";
import Spinner from "../Components/Spinner";
import EditableTweetCard from "../Components/EditableTweetCard";
import myAvatar from "../assets/maleUser.png";

const MyProfile = () => {
    const navigate = useNavigate();
    let [token, userId] = authenticate();
    let [user, setUser] = useState<User>();
    let [tweets, setTweets] = useState<Tweet[]>([]);
    let [Loading, setLoading] = useState<Boolean>();

    async function getMyUser() {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/myuser",
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
                `http://localhost:8080/api/user/${userId}/tweets`,
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
            <NavBar />
            <div className="container">
                {Loading && <Spinner />}
                {tweets.map((tweet) => (
                    <EditableTweetCard {...tweet} updateData={getMyTweets} />
                ))}
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
