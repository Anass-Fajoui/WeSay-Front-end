import { useEffect } from "react";
import TweetForm from "../Components/TweetForm";
import Tweet from "../types";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authenticate from "../Service/authenticate";
 
const EditTweetPage = () => {
    let token = authenticate();
    const navigate = useNavigate();
    const { id } = useParams();
    const [tweet, setTweet] = useState<Tweet |null>(null);
    
    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/tweet/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => setTweet(response.data))
            .catch((e) => {
                const err = e as AxiosError;
                if (e.response){
                    if (e.response.status === 403){
                        navigate("/login")
                    }else{
                        console.log(e);
                    }
                }
            });
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
