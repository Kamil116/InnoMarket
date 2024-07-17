import React, {FormEvent} from "react";
import "./styles/Authorization.css";
import {Link, useNavigate} from "react-router-dom";
import axios, {AxiosError} from "axios";
import Layout from "../Layout/Layout";
import {set} from "firebase/database";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

interface SignInProps {
    setAuth: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SignIn({ setAuth }: SignInProps) {
    const navigate = useNavigate();

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        interface ErrorResponse {
            [key: string]: string;
        }

        e.preventDefault();
        const emailElement = document.getElementById("email-input-login") as HTMLInputElement;
        const passwordElement = document.getElementById("password-input-login") as HTMLInputElement;

        const email = emailElement.value;
        const password = passwordElement.value;

        client
            .post("/api/login", {
                email: email,
                password: password,
            })
            .then(() => {
                localStorage.setItem('isLogged', 'yes')
                setAuth(true)
                localStorage.setItem('userEmail', email)
                navigate("/");
            })
            .catch((error: AxiosError<ErrorResponse>) => {
                const loginErrorText = document.getElementById("login-error") as HTMLParagraphElement;
                loginErrorText.style.display = "block";

                if (error.message === "Network Error") {
                    loginErrorText.textContent = "Network error";
                } else if (error.response && error.response.data) {
                    loginErrorText.textContent = error.response.data[0];
                } else {
                    loginErrorText.textContent = "An error occurred";
                }

                loginErrorText.style.fontSize = "18px";
                loginErrorText.style.margin = "0 0 10px 0";
                loginErrorText.style.padding = "2px 0 2px 0";
                loginErrorText.style.color = "red";
                loginErrorText.style.textAlign = "center";
                loginErrorText.style.border = "2px solid red";
            });
    }

    return (
        <div>
            <Layout>
                <div id="middle">
                    <div id="login-window">
                        <div className="sign-buttons">
                            <div className="sign-in-up">
                                <button className="wide_button" id="sign-in-button-login">
                                    Sign In
                                </button>
                            </div>
                            <div className="sign-up-up">
                                <Link to="/register">
                                    <button className="wide_button" id="sign-up-button-login">
                                        Sign Up
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="main-content">
                            <div>
                                <p id="login-error" style={{display: "none"}}></p>
                            </div>
                            <form id="login-form" onSubmit={handleSubmit}>
                                <label htmlFor="email-input-login">
                                    Email address
                                    <input
                                        type="email"
                                        className="input_box"
                                        id="email-input-login"
                                        required
                                    />
                                </label>
                                <label htmlFor="password-input-login">
                                    Password
                                    <input
                                        type="password"
                                        className="input_box"
                                        id="password-input-login"
                                        required
                                    />
                                </label>
                                <button className="wide_button" id="bottom_sign_in">
                                    SIGN IN
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
}


