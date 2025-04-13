import myAvatar from "../assets/maleUser.png";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import authenticate from "../Service/authenticate";
import {Tweet, User} from "../types"

interface Props {
    id: number;
    title: string;
    content: string; 
    likes: number;
    createdAt: Date;
    writer : User,
    updateData: () => void;
}
 
const EditableTweetCard = ({ id, title, content, likes, createdAt , writer, updateData}: Props) => {
    let [token, userId] = authenticate();
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

    function deleteTweet() {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            // icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:8080/api/tweet/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    .then((response) => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your tweet has been deleted.",
                            icon: "success",
                        });
                        updateData();
                    })
                    .catch((error) => console.log(error))
            }
        });
    }
    function editTweet() {
      navigate(`/edit/${id}`)
    }

    return (
        <div className="tweet-card">
            <div className="header">
                <div className="first">
                    <img src={myAvatar} alt="avatar" width={30} />

                    <div className="text">
                        <div className="user">{writer.firstName} {writer.lastName}</div>
                        <div className="username">{writer.userName}</div>
                    </div>
                </div>
                <div className="icons">
                    <i
                        className="fa-solid fa-pen-to-square"
                        onClick={editTweet}
                    ></i>
                    <i className="fa-solid fa-trash" onClick={deleteTweet}></i>
                </div>
            </div>
            <div className="title">{title}</div>
            <div className="content">{content}</div>
            <div className="end">
                <div className="like">
                    <i className="fa-regular fa-heart"></i> {likes}
                </div>
                <div className="date">{formattedDate}</div>
            </div>
        </div>
    );
};

export default EditableTweetCard;
