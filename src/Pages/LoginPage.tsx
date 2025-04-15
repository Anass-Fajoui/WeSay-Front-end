import { FieldValues, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { PasswordField } from "../Components/PasswordField";

const LoginPage = () => {
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    async function login(data: FieldValues) {
        try {
            let response = await axios.post(
                "http://localhost:8080/api/auth/authenticate",
                {
                    email: data.email,
                    password: data.password,
                }
            );
            let token = response.data.token;
            window.localStorage.setItem("token", token);

            navigate("/feed");
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                if (err.response.data === "Invalid Email or Password") {
                    setError(true);
                } else {
                    window.alert("Unexpected error occured");
                }
            }
        }
    }
    return (
        <div className="flex min-h-screen">
            <div className="w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="max-w-md w-full">
                    <h3 className="text-3xl font-bold mb-6 text-center mb-4">
                        Login to your account
                    </h3>

                    <form className="space-y-4" onSubmit={handleSubmit(login)}>
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
                            {errors.email &&
                                typeof errors.email.message === "string" && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.email.message}
                                    </div>
                                )}
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">
                                Password
                            </label>
                            <PasswordField register={register}/>
                            {errors.password &&
                                typeof errors.password.message === "string" && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.password.message}
                                    </div>
                                )}
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm mt-2 mb-0">
                                Invalid Email or Password
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition mt-3"
                        >
                            Login
                        </button>

                        <p className="text-center text-sm mt-4">
                            Don't have an account ?{" "}
                            <a
                                href="/register"
                                className="text-blue-600 hover:underline"
                            >
                                SignUp
                            </a>
                        </p>
                    </form>
                </div>
            </div>
            <div className="w-1/2 bg-[#1DA1F2] flex items-center justify-center">
                <h1 className="text-white text-4xl font-bold">
                    Join Us Today!
                </h1>
            </div>
        </div>
    );
};

export default LoginPage;
