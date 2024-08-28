import { styled } from "styled-components";
import miaudote from "../images/miaudote-logo.svg";
import { useForm } from "react-hook-form";
import validator from "validator";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactInputMask from "react-input-mask";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import Header from "../components/Header";
import fotoSignUp from "../images/signup-photo.jpg";
import { useState } from "react";

export default function SignUpPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const watchPassword = watch('password');

  const onSubmit = (data) => {
    const { name, email, cpf, cellphone, password, confirmPassword } = data;

    const onlyNumbersCPF = cpf.replace(/\D/g, "");
    const onlyNumbersCellphone = cellphone.replace(/\D/g, "");

    axios.post('http://localhost:3001/signup', {
      name,
      email,
      cpf: onlyNumbersCPF,
      cellphone: onlyNumbersCellphone,
      password,
      confirmPassword
    })
    .then(resp => {
      Swal.fire({
        title: 'Your registration was successful.',
        text: 'Log in now.',
        icon: 'success',
        confirmButtonText: 'OK'

      }).then(() => {
        navigate(`/signin`);
      });
    })
    .catch(error => {
      console.log('the error is:', error);
      if (error.response.data.message === 'This email is already registered".') {
        // If the message indicates that the email is already registered
        return Swal.fire({
          title: 'The email provided is already registered.',
          text: 'Please log in.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
      
      if (error.response.data.message === 'This CPF is already registered.') {
        // If the message indicates that the CPF is already registered
        return Swal.fire({
          title: 'The CPF provided is already registered.',
          text: 'Please log in.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
      
      if (error.response.status === 500) {
        // If there is a server error (status 500)
        return Swal.fire({
          title: 'Please try again in a few moments.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
      
      }
    );
  };

  return (
    <>
      <Header />
      <PageContainer>
        <TextDiv>
          <div>
            <h2>Join the Miaudote Family!</h2>
            <p>Together, we make happy paws find homes full of love.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Name</label>
              <input
                className={errors?.name && "input-error"}
                type="text"
                placeholder="Ram"
                {...register("name", { required: true })}
              />
              {errors?.name?.type === 'required' && <p className="error-message">Nome é obrigatório.</p>}

              <label>E-mail</label>
              <input
                className={errors?.email && "input-error"}
                type="text"
                autoComplete="email"
                placeholder="dharani@miaudote.com"
                {...register("email", { required: true, validate: (value) => validator.isEmail(value) })}
              />
              {errors?.email?.type === 'required' && <p className="error-message">E-mail é obrigatório.</p>}
              {errors?.email?.type === 'validate' && <p className="error-message">E-mail inválido.</p>}

              <label>CPF</label>
              <ReactInputMask
                mask="999.999.999-99"
                className={errors?.cpf && "input-error"}
                type="text"
                placeholder="999.999.999-99"
                {...register("cpf", { required: true, pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/ })}
              />
              {errors?.cpf?.type === 'required' && <p className="error-message">CPF é obrigatório.</p>}
              {errors?.cpf?.type === 'pattern' && <p className="error-message">CPF em formato inválido.</p>}

              <label>Cellphone</label>
              <ReactInputMask
                mask="(99)99999-9999"
                className={errors?.cellphone && "input-error"}
                type="text"
                placeholder="990789999"
                {...register("cellphone", { required: true, pattern: /(\([0-9]{2}\))\d{5}-\d{4}/ })}
              />
              {errors?.cellphone?.type === 'required' && <p className="error-message">Celular é obrigatório.</p>}
              {errors?.cellphone?.type === 'pattern' && <p className="error-message">Celular em formato inválido.</p>}

              <label>Password</label>
              <input
                className={errors?.password && "input-error"}
                type="password"
                placeholder="123..7"
                {...register("password", { required: true, minLength: 8 })}
              />
              {errors?.password?.type === 'required' && <p className="error-message">A senha é obrigatória.</p>}
              {errors?.password?.type === 'minLength' && <p className="error-message">Sua senha deve ter no mínimo 8 caracteres.</p>}

              <label>Confirm Password</label>
              <input
                className={errors?.confirmPassword && "input-error"}
                type="password"
                placeholder="Rewrite your password"
                {...register("confirmPassword", { required: true, validate: (value) => value === watchPassword })}
              />
              {errors?.confirmPassword?.type === 'required' && <p className="error-message">A confirmação de senha é obrigatória.</p>}
              {errors?.confirmPassword?.type === 'validate' && <p className="error-message">As senhas não são iguais.</p>}

              <button type="submit">Submit</button>
            </form>
          </div>
          <p>Are you already part of the MiAudote family?</p>
          <Link to='/signin'>
            <p><u>Log into your account here.</u></p>
          </Link>
        </TextDiv>
        <PetPhoto src={fotoSignUp} alt="Create an account and find many pets looking for love." />
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
