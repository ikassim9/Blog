import { Link } from "react-router-dom";

export default function Register() {


  const register = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    console.log('aa');
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="bg-white p-16 rounded shadow-2xl">
          <h1 className="text-2xl  mb-10 text-gray text-center">Create your account</h1>

          <form action="POST" className="space-y-5" onSubmit={register}>
            <div>
              <label htmlFor="name">Name</label>
              <input className="field" type="text" placeholder="John" />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input className="field"  type="email" placeholder="john1234@gmail.com"/>
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input className="field"  type="password" placeholder="6+ characters" />
            </div>
 
              <button className="bg-primary text-white  p-2 rounded-md w-full">Sign up</button>
            <span className="block">
              Already have an account? <Link to="/users/login" className="text-blue-400" >Login</Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
