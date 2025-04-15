import { useForm, FieldValues } from "react-hook-form";
import NavBar from "../Components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { AxiosError } from "axios";
import authenticate from "../Service/authenticate";
import { User } from "../types";
import Swal from "sweetalert2";
import { PasswordField } from "../Components/PasswordField";
import { useNavigate } from "react-router";

const EditInfo = () => {
    let [token, userId] = authenticate();
    let [user, setUser] = useState<User>();
    let [usernameError, setUserNameError] = useState<Boolean>(false);
    let [emailError, setEmailError] = useState<Boolean>(false);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    async function getMyUser() {
        try {
            let response = await axios.get("http://localhost:8080/api/myuser", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(response.data);
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
        getMyUser();
    }, []);

    useEffect(() => {
        if (user) {
            reset({
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.userName,
                email: user.email,
            });
        }
    }, [user, reset]);

    function editProfile(data: FieldValues) {
        try {
            axios.put(
                "http://localhost:8080/api/myuser",
                {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    userName: data.username,
                    email: data.email,
                    password: data.password,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            Swal.fire({
                title: "Success",
                text: "User Info Updated Successfully",
                icon: "success",
                confirmButtonColor: "#3b82f6",
            });
        } catch (e) {
            interface MyResponse {
                emailError: boolean;
                usernameError: boolean;
            }
            const err = e as AxiosError<MyResponse>;
            if (err.response) {
                let data = err.response.data;
                if (err.response.status === 403) {
                    navigate("/login");
                    return;
                }
                if (typeof data.emailError === "boolean") {
                    setEmailError(data.emailError);
                }
                if (typeof data.usernameError === "boolean") {
                    setUserNameError(data.usernameError);
                }
                if (!data.emailError && !data.usernameError) {
                    window.alert("Unexpected Error");
                }
            } else {
                window.alert("Unexpected Error");
            }
        }
    }

    function deleteUser() {
        Swal.fire({
            title: "Are you sure ?",
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete my account",
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete("http://localhost:8080/api/myuser", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    navigate("/login");
                    window.localStorage.setItem("token", "");
                    window.localStorage.setItem("userId", "");
                } catch (e) {
                    window.alert("Unexpected Error");
                }
            }
        });
    }

    return (
        <>
            <NavBar />
            <div className="py-3">
                <div className="flex items-start justify-center mb-3">
                    <div className="w-full max-w-xl rounded-xl bg-white shadow-md p-4">
                        <h3 className="mb-6 text-center text-2xl font-bold text-gray-800">
                            Edit Your Profile
                        </h3>
                        <form
                            className="space-y-4"
                            onSubmit={handleSubmit(editProfile)}
                        >
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <div className="w-full sm:w-1/2">
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        First Name
                                    </label>
                                    <input
                                        {...register("firstName", {
                                            required: "First name is required",
                                        })}
                                        type="text"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.firstName &&
                                        typeof errors.firstName.message ===
                                            "string" && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.firstName.message}
                                            </div>
                                        )}
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Last Name
                                    </label>
                                    <input
                                        {...register("lastName", {
                                            required: "Last name is required",
                                        })}
                                        type="text"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.lastName &&
                                        typeof errors.lastName.message ===
                                            "string" && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.lastName.message}
                                            </div>
                                        )}
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <input
                                    {...register("username", {
                                        required: "Username is required",
                                    })}
                                    type="text"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {usernameError ? (
                                    <div className="text-red-500 text-sm mt-1">
                                        Username already in use
                                    </div>
                                ) : (
                                    errors.username &&
                                    typeof errors.username.message ===
                                        "string" && (
                                        <div className="text-red-500 text-sm mt-1">
                                            {errors.username.message}
                                        </div>
                                    )
                                )}
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                    })}
                                    type="email"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {emailError ? (
                                    <div className="text-red-500 text-sm mt-1">
                                        Email already in use
                                    </div>
                                ) : (
                                    errors.email &&
                                    typeof errors.email.message ===
                                        "string" && (
                                        <div className="text-red-500 text-sm mt-1">
                                            {errors.email.message}
                                        </div>
                                    )
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <PasswordField register={register} />
                                {errors.password &&
                                    typeof errors.password.message ===
                                        "string" && (
                                        <div className="text-red-500 text-sm mt-1">
                                            {errors.password.message}
                                        </div>
                                    )}
                            </div>
                            <button
                                type="submit"
                                className="w-full rounded bg-blue-600 py-2 px-4 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
                <div className=" max-w-xl mx-auto flex justify-center px-3 mt-0">
                    <button
                        className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        onClick={deleteUser}
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </>
    );
};

export default EditInfo;
