import TweetForm from "../Components/TweetForm";
import authenticate from "../Service/authenticate";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { Tweet } from "../types";
import NavBar from "../Components/NavBar";

const CreateTweetPage = () => {
    let [token, userId] = authenticate();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    function onSubmit(data: FieldValues) {
        axios
            .post(
                "http://localhost:8080/api/tweets/add",
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
            .then(() => {
                navigate(-1);
                Swal.fire({
                    title: "Success",
                    text: "Tweet Created Successfully",
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
                } else {
                    window.alert("Unexpected Error occurred");
                }
            });
    }
    return (
        <>
            <NavBar />
            <div className="text-center text-3xl mb-4 mt-3 font-semibold">
                Create A New Tweet
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

export default CreateTweetPage;
