import { Link } from "react-router-dom";
import Button from "./Button";

export default function Nav() {
  return (
    <header className="flex p-4 items-center">
      <h1 className="mr-auto ml-5 text-xl">Blog</h1>
      <nav className="flex gap-8">
 

        <Link to="/users/login" className="text-center p-2" >Login</Link>
        <Link  to="/users/register" className="text-center bg-primary text-white w-28 p-2 rounded-md">Sign up</Link>
    
      </nav>
    </header>
  );
}
