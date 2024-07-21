import React, { FormEvent } from 'react';
import './styles/Authorization.css';
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import Layout from '../Layout/Layout';
import { useNavigate } from 'react-router-dom';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000'
});

interface ErrorResponse {
  [key: string]: string;
}

interface SignUpProps {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignUp({ setAuth }: SignUpProps) {
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const nameElement = document.getElementById(
      'name-input-registration'
    ) as HTMLInputElement;
    const emailElement = document.getElementById(
      'email-input-registration'
    ) as HTMLInputElement;
    const passwordElement = document.getElementById(
      'password-input-registration'
    ) as HTMLInputElement;
    const repeatedPasswordElement = document.getElementById(
      'password-confirmation'
    ) as HTMLInputElement;

    const name = nameElement.value;
    const email = emailElement.value;
    const password = passwordElement.value;
    const repeatedPassword = repeatedPasswordElement.value;

    const errorStyle = {
      fontSize: '18px',
      margin: '0 0 10px 0',
      padding: '2px 0 2px 0',
      color: 'red',
      textAlign: 'center',
      border: '2px solid red'
    };

    if (password !== repeatedPassword) {
      const registrationErrorText = document.getElementById(
        'registration-error'
      ) as HTMLParagraphElement;
      registrationErrorText.style.display = 'block';
      registrationErrorText.textContent = 'Passwords do not coincide';

      Object.assign(registrationErrorText.style, errorStyle);
      return;
    }

    client
      .post('/api/register', {
        email: email,
        username: name,
        password: password
      })
      .then(() => {
        localStorage.setItem('isLogged', 'yes');
        localStorage.setItem('userEmail', email);
        navigate('/');
        setAuth(true);
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        const registrationErrorText = document.getElementById(
          'registration-error'
        ) as HTMLParagraphElement;
        registrationErrorText.style.display = 'block';
        if (error.message === 'Network Error') {
          registrationErrorText.textContent = 'Network error';
        } else if (error.response && error.response.data) {
          registrationErrorText.textContent = error.response.data[0];
        } else {
          registrationErrorText.textContent = 'An error occurred';
        }
        registrationErrorText.style.fontSize = '18px';
        registrationErrorText.style.margin = '0 0 10px 0';
        registrationErrorText.style.padding = '2px 0 2px 0';
        registrationErrorText.style.color = 'red';
        registrationErrorText.style.textAlign = 'center';
        registrationErrorText.style.border = '2px solid red';
      });
  }

  return (
    <div>
      <Layout>
        <div id="middle">
          <div id="registration-window">
            <div className="sign-buttons">
              <div className="sign-in-up">
                <Link to="/login">
                  <button
                    className="wide_button"
                    id="sign-in-button-registration"
                  >
                    Sign In
                  </button>
                </Link>
              </div>
              <div className="sign-up-up">
                <button
                  className="wide_button"
                  id="sign-up-button-registration"
                >
                  Sign Up
                </button>
              </div>
            </div>
            <div className="main-content">
              <div>
                <p id="registration-error" style={{ display: 'none' }}></p>
              </div>
              <form id="registration-form" onSubmit={handleSubmit}>
                <label htmlFor="name-input-registration">
                  Name
                  <input
                    type="text"
                    className="input_box"
                    id="name-input-registration"
                    required
                  />
                </label>
                <label htmlFor="email-input-registration">
                  Email address
                  <input
                    type="email"
                    className="input_box"
                    id="email-input-registration"
                    required
                  />
                </label>
                <label htmlFor="password-input-registration">
                  Password
                  <input
                    type="password"
                    className="input_box"
                    id="password-input-registration"
                    required
                  />
                </label>
                <label htmlFor="password-confirmation">
                  Confirm password
                  <input
                    type="password"
                    className="input_box"
                    id="password-confirmation"
                    required
                  />
                </label>
                <button className="wide_button" id="bottom_sign_up">
                  SIGN UP
                </button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
