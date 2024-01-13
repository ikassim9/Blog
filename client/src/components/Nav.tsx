import Button from "./Button";


export default function Nav() {
  return (
    <header className="flex p-4 items-center">
      <h1 className="mr-auto ml-5 text-xl">Blog</h1>
      <nav className="flex gap-8">
       <button className="text-xl">Login</button>
        <Button width ="w-20" bgColor="bg-primary" textColor="text-white" value = "Sign up"/>
      </nav>
    </header>
  );
}
