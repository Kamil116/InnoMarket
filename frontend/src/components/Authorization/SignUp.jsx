import React from 'react';
import './styles/Authorization.css';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import {Link} from 'react-router-dom';
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
});


function UserRegistration() {
    console.log('Standard user')
    let name = document.getElementById('name-input-registration').value
    let email = document.getElementById('email-input-registration').value
    let password = document.getElementById('password-input-registration').value
    let repeated_password = document.getElementById('password-confirmation').value
    client.post(
        "/api/register",
        {
            email: email,
            username: name,
            password: password
        }
    ).then(() => {
        if (password !== repeated_password) {
            const registration_error_text = document.getElementById("registration-error")
            registration_error_text.style.display = 'block'
            registration_error_text.textContent = "Passwords do not coincide"
            registration_error_text.style.fontSize = '18px'
            registration_error_text.style.margin = '0 0 10px 0'
            registration_error_text.style.padding = '2px 0 2px 0'
            registration_error_text.style.color = 'red'
            registration_error_text.style.textAlign = 'center'
            registration_error_text.style.border = '2px solid red'
        } else {
            window.location.replace('/')
        }
    })
        .catch((error) => {
            if (!email || !name || !password || !repeated_password) {
                return
            }
            const registration_error_text = document.getElementById("registration-error")
            registration_error_text.style.display = 'block'
            if (error.message === 'Network Error') {
                registration_error_text.textContent = 'Network error'
            } else {
                registration_error_text.textContent = error.response.data[0]
            }
            registration_error_text.style.fontSize = '18px'
            registration_error_text.style.margin = '0 0 10px 0'
            registration_error_text.style.padding = '2px 0 2px 0'
            registration_error_text.style.color = 'red'
            registration_error_text.style.textAlign = 'center'
            registration_error_text.style.border = '2px solid red'
        })
}

const SignUp = () => (
    <div>
        <Header/>
        <div id="middle">
            <div id="registration-window">
                <div className="sign-buttons">
                    <div className="sign-in-up">
                        <Link to='/login'>
                            <button className="wide_button" id="sign-in-button-registration">
                                Sign In
                            </button>
                        </Link>
                    </div>
                    <div className="sign-up-up">
                        <button className="wide_button" id="sign-up-button-registration">Sign Up
                        </button>
                    </div>
                </div>
                <div className="main-content">
                    <div>
                        <p id="registration-error" style={{display: undefined}}></p>
                    </div>
                    <form id="registration-form" onSubmit={event => event.preventDefault()}>
                        <label htmlFor="name-input-registration">
                            Name
                            <input type="text" className="input_box" id="name-input-registration" required/>
                        </label>
                        <label htmlFor="email-input-registration">
                            Email address
                            <input type="email" className="input_box" id="email-input-registration" required/>
                        </label>
                        <label htmlFor="password-input-registration">
                            Password
                            <input placeholder="Type password..." type="password" className="input_box"
                                   id="password-input-registration" required/>
                        </label>
                        <label htmlFor="password-input-registration">
                            Confirm password
                            <input type="password" className="input_box" id="password-confirmation" required/>
                        </label>
                        <button className="wide_button" id="bottom_sign_up" onClick={UserRegistration}>SIGN UP AS USER
                        </button>
                        <button className="wide_button" id="bottom_sign_up_vendor" onClick={UserRegistration}>SIGN UP AS
                            VENDOR
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
);


export default SignUp;