import { useEffect, useState } from "react";
import TweetCard from "../Components/TweetCard";
import axios, { AxiosError } from "axios";
import "../feed.css";
import NavBar from "../Components/NavBar";
import {Tweet, User} from "../types"
import authenticate from "../Service/authenticate";
import { useNavigate } from "react-router";
import Spinner from "../Components/Spinner";


function FeedPage() {
    const navigate = useNavigate();
    let [token, userId] = authenticate();
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [Loading, setLoading] = useState<Boolean>(false);
    async function updateData(){
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:8080/api/tweets", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTweets(response.data);
        } catch (e) {
            const err = e as AxiosError;
            if (err.response){
                if (err.response.status === 403){
                    navigate("/login");
                }
            }
        } finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        updateData();
    }, []);
    return (
        <>
            <NavBar />
            <div className="container">
                {Loading && <Spinner />}
                {tweets.map((tweet) => (
                    <TweetCard {...tweet} updateData={updateData} />
                ))}
                {tweets.length === 0 && !Loading  && (
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
}

export default FeedPage;
