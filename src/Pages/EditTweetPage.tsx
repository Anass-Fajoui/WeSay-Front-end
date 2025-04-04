import { useEffect } from "react";
import TweetForm from "../Components/TweetForm";
import Tweet from "../types";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const EditTweetPage = () => {
    const { id } = useParams();
    const [tweet, setTweet] = useState<Tweet |null>(null);
    
    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/tweet/${id}`)
            .then((response) => setTweet(response.data))
            .catch((e) => console.log(e));
    }, []);

    return (
        <>
            <div className="text-center text-3xl mb-4 mt-3 font-semibold">
                Edit Your Tweet
            </div>
            <TweetForm tweet={tweet}/>
        </>
    );
};

export default EditTweetPage;
