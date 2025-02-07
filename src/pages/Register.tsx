import { Link } from "react-router-dom";
import Auth from "../services/Auth";
import {FirebaseAuth} from "../services/FirebaseAuth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { createUserWithEmailAndPassword, sendEmailVerification, signOut, updateProfile } from "firebase/auth";
import { useState } from "react";
import Footer from "../components/Footer";


export default function Register() {

  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  // use to support typescript
  type FormValues = {
    name: string;
    email: string;
    password: string;
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

  // registers user in firebase and in server

  const registerUser: SubmitHandler<FormValues> = async (form: FormValues) => {
 
    const { name, email, password } = form;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );
      const user = userCredential.user;

      // set display name of user 

      await updateProfile(user, { displayName: name });

      const authToken = await user.getIdToken();

      await Auth.register(name, authToken);

      await sendEmailVerification(user);

      setMessage(
        "A verification email has been sent to your email address. Please login back in after verifying your email."
      );

      reset();
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use": {
          setMessage("This email is already taken");
          break;
        }

        default:
          setMessage("Something went wrong. Please try again later");
      }
    } finally {
      // firebase by defaults automaticaly signs in user, need to manually sign themn out to verify email adress and re login
      await signOut(FirebaseAuth);
    }
  };

  return (
    <>
  <div className="min-h-screen flex flex-col">

    <header>
    <Nav></Nav>
    </header>
      <main  className="flex-grow flex flex-col justify-center items-center">
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

        <div className="bg-white p-8 rounded shadow-2xl w-96 mt-4">
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
                })}
                className="field"
                type="email"
                placeholder="john1234@gmail.com"
                data-cy="input_email"
              />
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
      </main>
        <Footer />
      </div>
    </>
  );
}
