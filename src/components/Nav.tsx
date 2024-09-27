import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { FirebaseAuth } from "../services/FirebaseAuth";
import { signOut } from "firebase/auth";

 
 
export default function Nav() {
  
  const [user, loading] = useAuthState(FirebaseAuth,);
  const handleLogout = () => {

    signOut(FirebaseAuth);
  }

  return loading ? <span className="loading loading-dots loading-lg flex item-center mx-auto"></span> : (
    <header className="flex p-4 items-center">
      <Link to="/"  className="mr-auto ml-5 text-xl">Blog</Link>
      <nav className="flex gap-8">

      {!user && <Link to="/users/login" className="text-center p-2" >Login</Link>}

      {/* {user &&<Link  to="/users/create-post" className="text-center bg-primary text-white w-28 p-2 rounded-md">Create post</Link>} */}
          {!user && <Link  to="/users/register" className="text-center bg-primary text-white w-28 p-2 rounded-md">Sign up</Link>}


         {user && <button className="text-center bg-primary text-white w-28 p-2 rounded-md" onClick={handleLogout}>Log out</button>}
      </nav>
    </header>
  );
}
