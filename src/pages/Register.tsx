import { Link } from "react-router-dom";
import Auth from "../services/Auth";
import {FirebaseAuth} from "../services/FirebaseAuth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { useState } from "react";


export default function Register() {

  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  // use to support typescript
  type FormValues = {
    name: string;
    email: string;
    password: string;
    emailExistError: string;
    internalError: string;
  };

  // validate only on form submission
  const {
    register,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });


  const registerUser: SubmitHandler<FormValues> = async (form: FormValues) => {
 
    const { name, email, password } = form;

 
    createUserWithEmailAndPassword(FirebaseAuth, email, password)
      .then(async (userCredential: any) => {
        const user = userCredential.user;

        const authToken = await user.getIdToken();

        await Auth.register(name, authToken)
          .then((response) => console.log(response.data))
          .catch((error) => {

            setError("internalError", {
              type: "Server",
              message: "Something went wrong. Please try again later",
            });
            
          });

          sendEmailVerification(user);

          setMessage("A verification email has been sent to your email address");

          signOut(FirebaseAuth);

          reset();

        navigate("/");
        

        // ...
      })
      .catch((error : any) => {
        switch (error.code) {
          case "auth/email-already-in-use": {
            setError("emailExistError", {
              type: "Server",
              message: "This email is already taken",
            });
          }
        }
      });
  };

  return (
    <>
      <Nav></Nav>
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

        <div className="bg-white p-8 rounded shadow-2xl w-96">
          <h1 className="text-2xl mb-8 text-center">Create your account</h1>

          <form
            action="POST"
            className="space-y-5 group"
            onSubmit={handleSubmit(registerUser)}
            noValidate
          >
            <div>
              <label className="" htmlFor="name" id="name">
                Name
              </label>
              <input
                {...register("name", { required: "Please enter a name" })}
                className="field"
                type="text"
                placeholder="John"
                data-cy="input_name"
              />
              <p data-cy="error_name" className="mt-3 text-red-500">
                {errors.name?.message}
              </p>
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                {...register("email", {
                  required: "Please enter your email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email",
                  },

                  onChange: () => {
                    if (errors.emailExistError?.message) {
                      clearErrors("emailExistError");
                    }
                  },
                })}
                className="field"
                type="email"
                placeholder="john1234@gmail.com"
                data-cy="input_email"
              />

              <p data-cy="error_email" className="mt-3 text-red-500">
                {errors.email?.message || errors.emailExistError?.message}
              </p>
            </div>

            <div>
              <label htmlFor="password">Password</label>
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
                placeholder="6+ characters"
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
              Sign up
            </button>
            <span className="block">
              Already have an account?{" "}
              <Link to="/users/login" className="text-blue-400">
                Login
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
