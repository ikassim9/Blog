import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import { sendEmailVerification, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import { FirebaseAuth } from "../services/FirebaseAuth";
import { useEffect, useState } from "react";
import Auth from "../services/Auth";
import Footer from "../components/Footer";


export default function Login() {
  
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
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const loginUser: SubmitHandler<FormValues> = async (form: FormValues) => {
    // first validate on server
    try {
      const { email, password } = form;
      const userCredential = await signInWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );
      const authToken = await userCredential.user.getIdToken();

      await Auth.login(authToken);

      if (userCredential.user && userCredential.user.emailVerified) {
        navigate("/");
      } else {
        // sign out and send verification email
        await signOut(FirebaseAuth);
        await sendEmailVerification(userCredential.user);
        setMessage(
          "A verification email has been sent to your email address. Please verify your email before attempting to login."
        );
      }
    } catch (error: any) {
      const errorCode = error.code;
      switch (errorCode) {
        case "auth/invalid-credential": {
          setMessage("We don't recognize this email or password");
          break;
        }
        case "auth/too-many-requests": {
          setMessage(
            "Too many login failed attempts. Please reset your password or try again later"
          );
          break;
        }

        default:
          setMessage("Something went wrong. Please try again");
      }
    }  
  };

  return (
    <>

    <div className="flex flex-col min-h-screen">

    <header>

    <Nav></Nav>

    </header>
     
    <main className="flex-grow flex-col flex justify-center items-center">
    {message.length > 0 && (
          <div
            className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mb-4"
            role="alert"
          >
            <p className="text-sm">{message}</p>
          </div>
        )}
        <div className="bg-white p-8 rounded shadow-2xl w-96 mt-4">
          <h1 className="text-2xl mb-8 text-center">Welcome back</h1>
          <form
            action="POST"
            className="space-y-5 group"
            onSubmit={handleSubmit(loginUser)}
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

            <div>
              <label htmlFor="password">Password</label>
              <input
                {...register("password", {
                  required: "Please enter your password",
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
            <div>
              <Link to="/users/forgot-password" className="text-gray-600">
                Forgot password?
              </Link>
            </div>

            <button
              data-cy="submitBtn"
              className="bg-primary text-white  p-2 rounded-md w-full"
            >
              Login
            </button>
            <span className="block">
              Not a member?{" "}
              <Link to="/users/register" className="text-blue-400">
                Sign up
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
