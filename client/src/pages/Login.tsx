import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { SubmitHandler, useForm } from "react-hook-form";
import { signInWithEmailAndPassword  } from "firebase/auth";
import { FirebaseAuth } from "../services/FirebaseAuth";


export default function Login() {

  const navigate = useNavigate();

  // use to support typescript
  type FormValues = {
    name: string;
    email: string;
    password: string;
    emailExistError: string;
    invalidCredentialsError: string;
    internalError: string;
    tooManyPasswordAttempts: string;
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

  const loginUser: SubmitHandler<FormValues> = async (form: FormValues) => {

    const url = "/user/login";

    const {email, password } = form;

    signInWithEmailAndPassword(FirebaseAuth, email, password)
    .then((userCredential) => {
      // Signed in


      navigate("/")
 
 
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      debugger;
      switch (errorCode) {
        case "auth/invalid-credential": {
          setError("invalidCredentialsError", {
            message: "We don't recognize this email or password",
          });

          break;
        }

      
        case "auth/too-many-requests": {
          setError("tooManyPasswordAttempts", {
            message: "Too many login faile attempts. Please reset your password or try again later"
          });

          break;
        }
      }
      
    });


  };

  return (
    <>
      <Nav></Nav>

      <div className="flex flex-col justify-center items-center h-screen">
        <div className="bg-white p-8 rounded shadow-2xl w-96">
          
          <h1 className="text-2xl mb-8 text-center">Welcome back</h1>
          <p data-cy="error_email" className="mt-3 text-center text-sm text-red-500">{errors.invalidCredentialsError?.message}</p>
          <p data-cy="error_email" className="mt-3 text-center text-red-500">{errors.tooManyPasswordAttempts?.message}</p>

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
                  onChange: () => {
                    if (errors.invalidCredentialsError?.message) {
                      clearErrors("invalidCredentialsError");
                    }
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


                  onChange: () => {
                    if (errors.invalidCredentialsError?.message) {
                      clearErrors("invalidCredentialsError");
                    }
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
            <div>
              <Link to="#" className="text-gray-600">Forgot password?</Link>
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
      </div>
    </>
  );
}
