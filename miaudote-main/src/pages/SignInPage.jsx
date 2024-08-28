import { styled } from "styled-components";
import miaudote from "../images/miaudote-logo.svg";
import { useForm } from "react-hook-form";
import validator from "validator";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import axios from "axios";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import Header from "../components/Header";
import fotoSignIn from "../images/signin-photo.jpg";
import { useState } from "react";

export default function SignInPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  function onSubmit(data) {
    const { email, password } = data;

    axios.post(`${import.meta.env.VITE_API_BASE_URL}/signin`, { email, password })
      .then(resp => {
        const { token } = resp.data;
        setUser(token);
        localStorage.setItem('user', JSON.stringify(token));
        navigate(`/my-account`);
      })
      .catch(error => {
        const status = error.response?.status;
        if (status === 422) {
          Swal.fire({
            title: 'The provided data is invalid.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } else if (status === 404) {
          Swal.fire({
            title: 'The email provided is not registered. Please sign up first.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } else if (status === 401) {
          Swal.fire({
            title: 'Incorrect password.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } else if (status === 500) {
          Swal.fire({
            title: 'Please try again in a few moments.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } else {
          Swal.fire({
            title: 'An unknown error occurred. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      });
  }

  return (
    <>
      <Header />
      <PageContainer>
        <TextDiv>
          <div>
            <h2>Welcome Back to Miaudote!</h2>
            <p>Log in to continue spreading love (and treats!)</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>E-mail</label>
              <input
                className={errors?.email && "input-error"}
                type="text"
                autoComplete="email"
                placeholder="name@miaudote.com"
                {...register("email", { 
                  required: "E-mail is required.",
                  validate: (value) => validator.isEmail(value) || "Invalid e-mail." 
                })}
              />
              {errors?.email && <p className="error-message">{errors.email.message}</p>}
              
              <label>Password</label>
              <input
                className={errors?.password && "input-error"}
                type="password"
                autoComplete="current-password"
                placeholder="*222"
                {...register("password", { 
                  required: "Password is required.", 
                  minLength: { value: 8, message: "Password must be at least 8 characters." } 
                })}
              />
              {errors?.password && <p className="error-message">{errors.password.message}</p>}
              
              <button type="submit">Enter</button>
            </form>
          </div>
          <p>Are you not part of the Miaudote family yet?</p>
          <Link to='/signup'>
            <p><u>Create a new account here.</u></p>
          </Link>
        </TextDiv>
        <PetPhoto src={fotoSignIn} alt="Log in to your account and continue spreading the love." />
      </PageContainer>
      <Footer />
    </>
  );
}

const PetPhoto = styled.img`
  width: 50%;
  height: 100vh;
  object-fit: contain;
  
  @media screen and (max-width: 770px) {
    display: none;
  }
`;

const TextDiv = styled.div`
  padding-left: 6em;
  width: 60%;
  flex-direction: column;
  @media screen and (min-width: 771px) and (max-width: 1200px) {
    padding-left: 4em;
  }
  @media screen and (max-width: 770px) {
    display: none;
    padding-left: 0em;
    width: 90%;
    margin: auto;
  }
`;

const PageContainer = styled.div`
  display: flex;
  margin: auto;
  width: 100vw;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  padding-top: 2em;
  gap: 1.5em;
  text-align: center;

  button {
    margin-bottom: 1.5em;
  }
  p {
    text-align: center;
  }
  div {
    max-width: 80vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5em;
  }
`;
