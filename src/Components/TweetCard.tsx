import myAvatar from "../assets/maleUser.png";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import authenticate from "../Service/authenticate";
import { Tweet, User } from "../types";
import { useEffect, useState } from "react";

interface Props {
    id: number;
    title: string;
    content: string;
    likes: number;
    createdAt: Date;
    writer: User;
    updateData: () => void;
}

const TweetCard = ({
    id,
    title,
    content,
    likes,
    createdAt,
    writer,
    updateData,
}: Props) => {
    let [token, userId] = authenticate();
    let [liked, setLiked] = useState<Boolean>(false);
    let [nbrlikes, setLikes] = useState(likes);
    const navigate = useNavigate();
    let mydate = new Date(createdAt);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(mydate);
    async function checkIfLiked() {
        try {
            let response = await axios.get(
                "http://localhost:8080/api/tweetsliked",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            let tweetArr = response.data;
            console.log(tweetArr);
            setLiked(tweetArr.includes(id))
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        checkIfLiked();
    }, []);

    async function LikeOrUnlike() {
        if (liked) {
            try {
                const response = await axios.patch(
                    `http://localhost:8080/api/tweet/${id}/unlike`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setLikes(response.data);
                setLiked(false);
            } catch (e) {
                window.alert("Unexpected Error occurred");
            }
        } else {
            try {
                const response = await axios.patch(
                    `http://localhost:8080/api/tweet/${id}/like`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setLikes(response.data);
                setLiked(true);
            } catch (e) {
                window.alert("Unexpected Error occurred");
            }
        }
    }
    return (
        <div className="tweet-card">
            <div className="header">
                <div
                    className="first"
                    onClick={() => navigate(`/profile/${writer.id}`)}
                >
                    <img src={myAvatar} alt="avatar" width={30} />

                    <div className="text">
                        <div className="user">
                            {writer.firstName} {writer.lastName}
                        </div>
                        <div className="username">{writer.userName}</div>
                    </div>
                </div>
            </div>
            <div className="title">{title}</div>
            <div className="content">{content}</div>
            <div className="end">
                <div className="like select-none" onClick={LikeOrUnlike}>
                    {liked ? (
                        <i className="fa-solid fa-heart"></i>
                    ) : (
                        <i className="fa-regular fa-heart"></i>
                    )}{" "}
                    {nbrlikes}
                </div>
                <div className="date">{formattedDate}</div>
            </div>
        </div>
    );
};

export default TweetCard;
