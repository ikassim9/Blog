import React, {useState } from "react";
import { useForm } from "react-hook-form";
import Nav from "../components/Nav";
import { Link, useLocation } from "react-router-dom";
import {confirmPasswordReset } from "firebase/auth";
import { FirebaseAuth } from "../services/FirebaseAuth";
import { error } from "console";



function useQuery(){
    const location = useLocation();

    return new URLSearchParams (location.search);
}
export default function PasswordReset() {

    const [message, setMessage] = useState('');

    const query = useQuery();

    type FormValues = { 
        password: string;
        internalError: string;
      };


  // validate only on form submission
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });


  const handlePasswordReset = (form: FormValues) => {
 
    const obCode = query.get('oobCode' )!;

    const {password} = form;

 
      confirmPasswordReset(FirebaseAuth, obCode, password)
      .then(() => {
        
        setMessage('Password successfully reset');

      })

      .catch(() => {
        setError("internalError", {
          type: "Server",
          message: "Your request to reset your password has expired or the link has already been used",
        });
      });

 
      reset();

  };

  return (
    <>
      <Nav />


      <div className="flex flex-col justify-center items-center h-screen">

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


{
          errors.internalError?.message &&
          <div
            className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3 mb-4"
            role="alert"
          >
            <p className="text-sm">
             { errors.internalError?.message }
            </p>
          </div>
        }
 
    <div className="bg-white p-8 rounded shadow-2xl w-96">
    
 
    <form
      action="POST"
      className="space-y-5 group"
      onSubmit={handleSubmit(handlePasswordReset)}
      noValidate
    >
        <div>
                <label className='text-' htmlFor="password">New password</label>
              <input
                {...register("password", {
                  required: "Please enter your password",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="field"
                type="password"
                placeholder="Enter your password"
                data-cy="input_password"
              />
              <p data-cy="error_password" className="mt-3 text-red-500">
                {errors.password?.message}
              </p>
            </div>
 

      <button
        data-cy="submitBtn"
        className="bg-primary text-white  p-2 rounded-md w-full"
      >
        Reset Password
      </button>
      <span className="block">
       
        <Link to="/users/login" className="text-blue-400">
         Back to login
        </Link>
      </span>
 
    </form>
  </div>
</div>
    </>
  );
}
