import { Link } from "react-router-dom";
import Auth from "../services/Auth";
import FirebaseAuth from "../services/FirebaseAuth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { SubmitHandler, useForm } from "react-hook-form"
 
export default function Register() {

  // use to support typescript
  type FormValues = {
    name: string
    email: string
    password: string,
    emailExistError: string
  }

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

    const url = "/user/register";

    const { name, email, password } = form;
 
    createUserWithEmailAndPassword(FirebaseAuth, email, password)
      .then(async (userCredential) => {
        // Signed up

        // clear existing email error if present

       

        const user = userCredential.user;

        const authToken = await user.getIdToken();

        await Auth.register(url, name, authToken)
          .then((response) => console.log(response.data))
          .catch((error) => {});


          reset();
        // ...
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use": {

            setError("emailExistError", { type: "Server", message: "Email already exists" })

            // setError("email", {
            //   message: "Email already exists",
            // });
          }
        }

        console.error(error.code);
      });

  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="bg-white p-16 rounded shadow-2xl">
          <h1 className="text-2xl  mb-10 text-gray text-center">
            Create your account
          </h1>

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
              <p data-cy='error_name' className="mt-3 text-red-500">{errors.name?.message}</p>
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
                    if(errors.emailExistError?.message){
                      clearErrors("emailExistError");
                    }

                  }
                   
                })}
                className="field"
                type="email"
                placeholder="john1234@gmail.com"
                data-cy='input_email'
              />

 
              <p data-cy='error_email'  className="mt-3 text-red-500">{errors.email?.message || errors.emailExistError?.message}</p>
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
                data-cy='input_password'
              />
              <p  data-cy='error_password' className="mt-3 text-red-500">{errors.password?.message}</p>
            </div>

            <button data-cy='submitBtn' className="bg-primary text-white  p-2 rounded-md w-full">
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
