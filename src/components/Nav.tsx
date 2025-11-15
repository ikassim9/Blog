import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseAuth } from "../services/FirebaseAuth";
import { signOut } from "firebase/auth";
import {  SquarePen, UserRound } from "lucide-react";
import { useState } from "react";

 
 
export default function Nav() {
  
  const [user, loading] = useAuthState(FirebaseAuth);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {

    signOut(FirebaseAuth);

    navigate("/");
  }

  return loading ? (
    <span className="loading loading-dots loading-lg flex item-center mx-auto"></span>
  ) : (
    <header className="flex p-4 items-center">
      <Link to="/" className="mr-auto ml-5 text-xl">
        Blog
      </Link>
      <nav className="flex gap-8">
        {!user && (
          <>
            <Link to="/users/login" className="text-center p-2">
              Login
            </Link>
            <Link
              to="/users/register"
              className="text-center bg-primary text-white w-28 p-2 rounded-md"
            >
              Sign up
            </Link>
          </>
        )}

        {user && (
          <>
            <Link className="text-lg flex gap-4" to="/users/create-post">
              <SquarePen />
              Write
            </Link>
          
<div className="relative">
      {/* Trigger Icon */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer"
      >
        <UserRound />
      </button>
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200  "
        >
           <Link className="block py-2 px-4 text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
          to={`/users/${user.uid}`}
           >
            Profile
          </Link>
          <div
            onClick={handleLogout}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
          >
            Sign Out
          </div>
        </div>
      )}
    </div>
          </>
        )}
      </nav>
    </header>
  );
}
