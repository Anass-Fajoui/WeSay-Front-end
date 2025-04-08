import axios, { AxiosError } from "axios";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function RegisterPage() {

    const [usernameError, setUserNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    async function createUser(data: FieldValues) {
        try {
            let response = await axios.post(
                "http://localhost:8080/api/auth/register",
                {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    userName: data.username,
                    email: data.email,
                    password: data.password,
                }
            );
            let token = response.data.token;
            window.localStorage.setItem("token", token);
            navigate("/feed");
        } catch (e) {
            interface MyResponse{
                emailError: boolean,
                usernameError: boolean 
            }
            const err = e as AxiosError<MyResponse>;
            if (err.response){
                let data = err.response.data;
                setEmailError(data.emailError);
                setUserNameError(data.usernameError);
                if (!data.emailError && !data.usernameError){
                    window.alert("Unexpected Error");
                }
            }
        }
    }

    return (
        <div className="flex min-h-screen">
           
            <div className="w-1/2 bg-[#1DA1F2] flex items-center justify-center">
                <h1 className="text-white text-4xl font-bold">
                    Join Us Today!
                </h1>
            </div>

            
            <div className="w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="max-w-md w-full">
                    <h3 className="text-3xl font-bold mb-6 text-center mb-4">
                        Create your account
                    </h3>

                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit(createUser)}
                    >
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="block mb-1 font-medium">
                                    First Name
                                </label>
                                <input
                                    {...register("firstName", {
                                        required: "Must enter first name",
                                    })}
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.firstName &&
                                    typeof errors.firstName.message ===
                                        "string" && (
                                        <div className="text-red-500 text-sm mt-1">{errors.firstName.message}</div>
                                    )}
                            </div>
                            <div className="w-1/2">
                                <label className="block mb-1 font-medium">
                                    Last Name
                                </label>
                                <input
                                    {...register("lastName", {
                                        required: "Must enter last name",
                                    })}
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.lastName &&
                                    typeof errors.lastName.message ===
                                        "string" && (
                                        <div className="text-red-500 text-sm mt-1">{errors.lastName.message}</div>
                                    )}
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">
                                Username
                            </label>
                            <input
                                {...register("username", {
                                    required: "Must enter username",
                                })}
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {usernameError ? (
                                <div className="text-red-500 text-sm mt-1">Username already in use</div>
                            ) : (
                                errors.username &&
                                typeof errors.username.message === "string" && (
                                    <div className="text-red-500 text-sm mt-1">{errors.username.message}</div>
                                )
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">
                                Email
                            </label>
                            <input
                                {...register("email", {
                                    required: "Must enter email",
                                })}
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {emailError ? (
                                <div className="text-red-500 text-sm mt-1">Email already in use</div>
                            ) : (
                                errors.email &&
                                typeof errors.email.message === "string" && (
                                    <div className="text-red-500 text-sm mt-1">{errors.email.message}</div>
                                )
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">
                                Password
                            </label>
                            <input
                                {...register("password", {
                                    required: "Must enter password",
                                })}
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.password &&
                                typeof errors.password.message === "string" && (
                                    <div className="text-red-500 text-sm mt-1">{errors.password.message}</div>
                                )}
                        </div>
                        <br />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                        >
                            Register
                        </button>

                        <p className="text-center text-sm mt-4">
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="text-blue-600 hover:underline"
                            >
                                Login
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
