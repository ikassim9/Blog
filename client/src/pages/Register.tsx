import { Link } from "react-router-dom";
import Auth from "../services/Auth";
import FirebaseAuth from "../services/FirebaseAuth";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (event: any) => {
    const url = "/auth/register";
    event.preventDefault();

    createUserWithEmailAndPassword(FirebaseAuth, email, password)
      .then(async (userCredential) => {
        // Signed up

        console.log(userCredential.user);

        const userToken = await userCredential.user.getIdToken();
        const userId = await userCredential.user.uid;

        const user = {
          Name: name,
          UserID: userId,
        };

        await Auth.register(url, user, userToken)
          .then((response) => console.log(response.data))
          .catch((error) => {});
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ..
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
            onSubmit={registerUser}
            noValidate
          >
            <div>
              <label className="" htmlFor="name" id="name">
                Name
              </label>
              <input
                className="field invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                type="text"
                name="name"
                placeholder="John"
                required
                pattern=".{1,}"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                Please enter a name
              </span>
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                className="field invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john1234@gmail.com"
                required
                pattern="/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/"
              />
              <span className="mt-2 hidden text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                Please enter a valid email address
              </span>
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                className="field invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="6+ characters"
                required
                pattern=".{7,}"
              />

              <span className="mt-2 text-sm hidden text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                Password must be at least 6 characters
              </span>
            </div>

            <button className="bg-primary text-white  p-2 rounded-md w-full group-invalid:pointer-events-none group-invalid:opacity-30">
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
