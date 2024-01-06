import Button from "./Button";


export default function Nav() {
  return (
    <header className="p-4 flex justify-end align-center bg-red-500">
      <h1 className="mr-auto ml-5 text-center fs text-xl">Blog</h1>
      <nav className="flex gap-8">
       <button className="text-xl">Login</button>
        <Button value = "Sign up"/>
      </nav>
    </header>
  );
}
