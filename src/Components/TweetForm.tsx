import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {Tweet} from "../types";
import { useEffect } from "react";
import authenticate from "../Service/authenticate"

const TweetForm = ({ tweet }: { tweet: Tweet | null}) => {
    const navigate = useNavigate();
    let [token, userId] = authenticate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (tweet) {
            reset({
                title: tweet.title,
                content: tweet.content,
            });
        }
    }, [tweet, reset]);

    function onSubmit(data: FieldValues) {
        if (tweet?.id === 0){
            axios.post("http://localhost:8080/api/tweets/add", {
                title: data.title,
                content: data.content,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                navigate("/feed");
                Swal.fire({
                    title: "Success",
                    text: "Tweet Created Successfully",
                    icon: "success",
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        }else {
            axios.put(`http://localhost:8080/api/tweet/${tweet?.id}`, {
                title: data.title,
                content: data.content,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }) 
            .then((response) => {
                navigate("/feed");
                Swal.fire({
                    title: "Success",
                    text: "Tweet Edited Successfully",
                    icon: "success",
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        }
    }
    return (
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
                    {...register("title", { required: "Title is required" })}
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
    );
};

export default TweetForm;
