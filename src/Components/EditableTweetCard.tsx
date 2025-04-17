import myAvatar from "../assets/maleUser.png";
import Swal from "sweetalert2";
import axios from "axios";
import { AxiosError } from "axios";
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
    onDelete: () => void;
}

const EditableTweetCard = ({
    id,
    title,
    content,
    likes,
    createdAt,
    writer,
    onDelete,
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
                const err = e as AxiosError;
                if (err.response) {
                    if (err.response.status === 403) {
                        navigate("/login");
                    } else {
                        window.alert("Unexpected Error occurred");
                        console.log(e);
                    }
                } else {
                    window.alert("Unexpected Error occurred");
                    console.log(e);
                }
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
                const err = e as AxiosError;
                if (err.response) {
                    if (err.response.status === 403) {
                        navigate("/login");
                    } else {
                        window.alert("Unexpected Error occurred");
                    }
                } else {
                    window.alert("Unexpected Error occurred");
                    console.log(e);
                }
            }
        }
    }

    function editTweet() {
        navigate(`/edit/${id}`);
    }

    axios
        .get("http://localhost:8080/api/tweetsliked", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            let tweetArr = response.data;
            // console.log(tweetArr)
            setLiked(tweetArr.includes(id));
        })
        .catch((e) => {
            const err = e as AxiosError;
            if (err.response) {
                if (err.response.status === 403) {
                    navigate("/login");
                } else {
                    console.log(e);
                }
            }
        });
    console.log(`tweet is ${id} rendered, likes = ${likes}`);

    useEffect(() => {
        setLikes(likes);
    }, [likes]);

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
                        <div className="username">@{writer.userName}</div>
                    </div>
                </div>
                <div className="icons">
                    <i
                        className="fa-solid fa-pen-to-square"
                        onClick={editTweet}
                    ></i>
                    <i className="fa-solid fa-trash" onClick={onDelete}></i>
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

export default EditableTweetCard;
