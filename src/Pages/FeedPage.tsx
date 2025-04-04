import { useEffect, useState } from "react";
import TweetCardList from "../Components/TweetCardList";
import axios from "axios";
import "../feed.css";
import NavBar from "../Components/NavBar";
import Tweet from "../types";

function FeedPage() {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    function updateData(){
        axios 
            .get("http://localhost:8080/api/tweets")
            .then((response) => {
                console.log(response.data);
                setTweets(response.data);
            })

            .catch((e) => console.log(e));
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
