import TweetForm from "../Components/TweetForm";
import authenticate from "../Service/authenticate";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Tweet } from "../types";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Components/NavBar";

const EditTweetPage = () => {
    let [token, userId] = authenticate();
    let [tweet, setTweet] = useState<Tweet>();
    const navigate = useNavigate();
    const { id: tweetId } = useParams();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
    });

    async function getTweet() {
        try {
            let response = await axios.get(`http://localhost:8080/api/tweet/${tweetId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTweet(response.data);
        }catch (e){
            console.log("error");
        }  
    }
    useEffect(() => {
        getTweet();
    }, []);

    useEffect(() => {
        if (tweet){
            reset({
                title : tweet.title,
                content : tweet.content
            })
        }
    }, [tweet, reset])

    function onSubmit(data: FieldValues) {
        axios
            .put(
                `http://localhost:8080/api/tweet/${tweet?.id}`,
                {
                    title: data.title,
                    content: data.content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                navigate("/feed");
                Swal.fire({
                    title: "Success",
                    text: "Tweet Edited Successfully",
                    icon: "success",
                    confirmButtonColor: '#3b82f6'
                });
            })
            .catch((error) => {
                window.alert("Unexpected Error occured");
            });
    }
    return (
        <>
            <NavBar />
            <div className="text-center text-3xl mb-4 mt-3 font-semibold">
                Edit Your Tweet
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-4 border rounded shadow-sm bg-light mx-auto mt-4"
                style={{ maxWidth: "600px" }}
            >
                <div className="mb-3">
                    <input
                        id="title"
                        className={`form-control ${
                            errors.title ? "is-invalid" : ""
                        }`}
                        placeholder="Title"
                        {...register("title", {
                            required: "Title is required",
                        })}
                    />
                    {errors.title?.message &&
                        typeof errors.title.message === "string" && (
                            <div className="invalid-feedback">
                                {errors.title.message}
                            </div>
                        )}
                </div>
                <br />
                <div className="mb-3">
                    <textarea
                        rows={4}
                        id="content"
                        className={`form-control ${
                            errors.content ? "is-invalid" : ""
                        }`}
                        placeholder="Content"
                        {...register("content", {
                            required: "Content is required",
                        })}
                    />
                    {errors.content?.message &&
                        typeof errors.content.message === "string" && (
                            <div className="invalid-feedback">
                                {errors.content.message}
                            </div>
                        )}
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    );
};

export default EditTweetPage;
