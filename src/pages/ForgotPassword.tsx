import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import {sendPasswordResetEmail } from "firebase/auth";
import { FirebaseAuth } from "../services/FirebaseAuth";
import Footer from "../components/Footer";
 
export default function ForgotPassword() {
    

    const [message, setMessage] = useState('');



    type FormValues = {
        
        email: string;
 
      };


  // validate only on form submission
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });


  const resetPassword = (form: FormValues) => {
    const {email } = form;

    sendPasswordResetEmail(FirebaseAuth, email).then(() => {
        
        reset();

        setMessage('Password reset has been sent to your email')

    })

    .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
       console.log(errorCode, errorMessage);
    });

   
  };

  return (
    <>

    <div className="flex flex-col min-h-screen">

      <Nav />

      <main className="flex flex-grow items-center justify-center ">

      {
          message.length > 0 &&
          <div
            className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mb-4"
            role="alert"
          >
            <p className="text-sm">
             {message}
            </p>
          </div>
        }
  <div className="bg-white p-8 rounded shadow-2xl w-96">
    
    <h1 className="text-2xl mb-8 text-center">Reset your password</h1>
    <p data-cy="error_email" className="mt-3 text-center text-sm text-red-500">{}</p>
    <p data-cy="error_email" className="mt-3 text-center text-red-500">{}</p>

    <form
      action="POST"
      className="space-y-5 group"
      onSubmit={handleSubmit(resetPassword)}
      noValidate
    >
      <div>
        <label htmlFor="email">Email</label>
        <input
          {...register("email", {
            required: "Please enter your email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email",
            },
          })}
          className="field"
          type="email"
          placeholder="Enter your email address"
          data-cy="input_email"
        />

        <p data-cy="error_email" className="mt-3 text-red-500">
          {errors.email?.message}
        </p>
      </div>

 

      <button
        data-cy="submitBtn"
        className="bg-primary text-white  p-2 rounded-md w-full"
      >
        Submit
      </button>
      <span className="block">
       
        <Link to="/users/login" className="text-blue-400">
         Back to login
        </Link>
      </span>
 
    </form>
  </div>
</main>

<Footer></Footer>
</div>
    </>
  );
}
