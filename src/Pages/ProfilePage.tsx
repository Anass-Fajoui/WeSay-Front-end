import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import authenticate from "../Service/authenticate";
import axios from "axios";
import { AxiosError } from "axios";
import { User, Tweet } from "../types";
import Spinner from "../Components/Spinner";
import EditableTweetCard from "../Components/EditableTweetCard";
import TweetCard from "../Components/TweetCard";
import ProfileHeader from "../Components/ProfileHeader";
import Swal from "sweetalert2";

const MyProfile = () => {
    const navigate = useNavigate();
    let [token, userId] = authenticate();
    let { id } = useParams();
    let [user, setUser] = useState<User>();
    let [tweets, setTweets] = useState<Tweet[]>([]);
    let [Loading, setLoading] = useState<Boolean>();

    async function getUser() {
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
            const err = e as AxiosError;
            if (err.response) {
                if (err.response.status === 403) {
                    navigate("/login");
                }
            }
        }
    }
    async function getTweets() {
        console.log("hey I'm getting tweets")
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
                }else{
                    window.alert("Unexpected Error occured");
                }
            }else{
                window.alert("Unexpected Error occured");
            }
        } finally {
            setLoading(false);
        }
    }
    async function deleteTweet(tweetId : number) {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.delete(
                    `http://localhost:8080/api/tweet/${tweetId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                // location.reload();
                setTweets((prevTweets) => prevTweets.filter((tweet) => tweet.id !== tweetId));
                await Swal.fire({
                    title: "Deleted!",
                    text: "Your tweet has been deleted.",
                    icon: "success",
                    confirmButtonColor: "#3b82f6",
                });
            } catch (e) {
                const err = e as AxiosError;
                if (err.response) {
                    if (err.response.status === 403) {
                        navigate("/login");
                    } else {
                        window.alert("Unexpected Error occurred");
                    }
                }
            }
        }
    }
    useEffect(() => {
        getUser(); 
        getTweets();
    }, []);

    return (
        <>
            <ProfileHeader
                name={user?.firstName + " " + user?.lastName}
                username={user?.userName}
            />
            <div className="container">
                {id == userId && (
                    <div className="flex justify-between m-3">
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
                    </div>
                )}
                {Loading && <Spinner />}
                {tweets.map((tweet) =>
                    id == userId ? (
                        <EditableTweetCard {...tweet} onDelete={() => deleteTweet(tweet.id)} />
                    ) : (
                        <TweetCard {...tweet} />
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
