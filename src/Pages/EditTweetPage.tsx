import TweetForm from "../Components/TweetForm";
import authenticate from "../Service/authenticate";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AxiosError } from "axios";
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
    } = useForm({});

    async function getTweet() {
        try {
            let response = await axios.get(
                `http://localhost:8080/api/tweet/${tweetId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTweet(response.data);
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
            }
        }
    }
    useEffect(() => {
        getTweet();
    }, []);

    useEffect(() => {
        if (tweet) {
            reset({
                title: tweet.title,
                content: tweet.content,
            });
        }
    }, [tweet, reset]);

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
                navigate(-1);
                Swal.fire({
                    title: "Success",
                    text: "Tweet Edited Successfully",
                    icon: "success",
                    confirmButtonColor: "#3b82f6",
                });
            })
            .catch((e) => {
                const err = e as AxiosError;
                if (err.response) {
                    if (err.response.status === 403) {
                        navigate("/login");
                    } else {
                        window.alert("Unexpected Error occurred");
                    }
                }
            });
    }
    return (
        <>
            <NavBar />
            <div className="p-4">
                <div className="flex items-start justify-center mb-3">
                    <div className="w-full max-w-xl rounded-xl bg-white shadow-md px-4 py-3">
                        <h3 className="mb-6 text-center text-2xl font-bold text-gray-800">
                            Edit a Tweet
                        </h3>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <div className="mb-2">
                                <label
                                    htmlFor="title"
                                    className="mb-1 block text-md font-medium text-gray-700"
                                >
                                    Title
                                </label>
                                <input
                                    id="title"
                                    {...register("title", {
                                        required: "Title is required",
                                    })}
                                    type="text"
                                    placeholder="What's this tweet about?"
                                    className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        errors.title
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                />
                                {errors.title?.message &&
                                    typeof errors.title.message ===
                                        "string" && (
                                        <div className="text-red-500 text-sm mt-1">
                                            {errors.title.message}
                                        </div>
                                    )}
                            </div>

                            <div className="mb-2">
                                <label
                                    htmlFor="content"
                                    className="mb-1 block text-md font-medium text-gray-700"
                                >
                                    Content
                                </label>
                                <textarea
                                    id="content"
                                    rows={4}
                                    {...register("content", {
                                        required: "Content is required",
                                    })}
                                    className={`w-full resize-none rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        errors.content
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                    placeholder="What's happening?"
                                />
                                {errors.content?.message &&
                                    typeof errors.content.message ===
                                        "string" && (
                                        <div className="text-red-500 text-sm">
                                            {errors.content.message}
                                        </div>
                                    )}
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded bg-blue-600 py-2 px-4 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-2"
                            >
                                Update Tweet
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditTweetPage;
