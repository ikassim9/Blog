import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <header className="flex p-4 items-center">
      <h1 className="mr-auto ml-5 text-xl">Blog</h1>
      <nav className="flex gap-8">
       {/* <button className="text-xl">Login</button>
        <Button width ="w-20" bgColor="bg-primary" textColor="text-white" value = "Sign up"/> */}
        <Link to="/users/login" className="text-center p-2" >Login</Link>
        <Link  to="/users/register" className="text-base text-center bg-primary text-white w-28 p-2 rounded-md">Sign up</Link>

      </nav>
    </header>
  );
}
