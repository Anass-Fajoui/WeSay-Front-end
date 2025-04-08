import { useEffect, useState } from "react";
import TweetCardList from "../Components/TweetCardList";
import axios, { AxiosError } from "axios";
import "../feed.css";
import NavBar from "../Components/NavBar";
import Tweet from "../types";
import authenticate from "../Service/authenticate";
import { useNavigate } from "react-router";

function FeedPage() {
    const navigate = useNavigate();
    let token = authenticate();
    const [tweets, setTweets] = useState<Tweet[]>([]);
    async function updateData(){
        try {
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
        }
    }
    useEffect(() => {
        updateData();
    }, []);
    return (
        <>
            <NavBar />
            <TweetCardList tweetList={tweets} updateData={updateData} />
        </>
    );
}

export default FeedPage;
