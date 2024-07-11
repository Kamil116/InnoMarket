import React from 'react';
import './styles/Authorization.css';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import {Link} from "react-router-dom";
import axios, {Axios, AxiosError} from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

function HandleSubmit(e) {
    e.preventDefault();
    let email = document.getElementById('email-input-login').value
    let password = document.getElementById('password-input-login').value

    client.post(
        "/api/login",
        {
            email: email,
            password: password
        }
    ).then(() => {
        window.location.replace('/')
    })
        .catch((error) => {
            const login_error_text = document.getElementById("login-error")
            login_error_text.style.display = 'block'
            if (error.message === 'Network Error') {
                login_error_text.textContent = 'Network error'
            } else {
                login_error_text.textContent = error.response.data[0]
            }
            login_error_text.style.fontSize = '18px'
            login_error_text.style.margin = '0 0 10px 0'
            login_error_text.style.padding = '2px 0 2px 0'
            login_error_text.style.color = 'red'
            login_error_text.style.textAlign = 'center'
            login_error_text.style.border = '2px solid red'
        })
}

const SignIn = () => (
    <div>
        <Header/>
        <div id="middle">
            <div id="login-window">
                <div className="sign-buttons">
                    <div className="sign-in-up">
                        <button className="wide_button" id="sign-in-button-login">
                            Sign In
                        </button>
                    </div>
                    <div className="sign-up-up">
                        <Link to='/register'>
                            <button className="wide_button" id="sign-up-button-login">Sign Up</button>
                        </Link>
                    </div>
                </div>
                <div className="main-content">
                    <div>
                        <p id="login-error" style={{display: "none"}}></p>
                    </div>
                    <form id="login-form" onSubmit={HandleSubmit}>
                        <label htmlFor="email-input-login">
                            Email address
                            <input type="email" className="input_box" id="email-input-login" required/>
                        </label>
                        <label htmlFor="password-input-login">
                            Password
                            <input type="password" className="input_box" id="password-input-login" required/>
                        </label>
                        <button className="wide_button" id="bottom_sign_in">SIGN IN</button>
                    </form>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
);


export default SignIn;