import Nav from "../components/Nav";
import Post from "../components/Post";

export default function Home() {
  return (
    <>
      <div>
        <Nav></Nav>
      </div>

      <div className="ml-8 mt-8 flex-col space-y-4">

        <div className="">
        <h1 className="text-2xl">Connect with others through blogging</h1>
        <p className="text-base mt-4 sm:text-lg">Explore, Share, and Connect - Your Online Community Awaits</p>
        </div>
       
         <Post/> 
      </div>


    </>
  );
}
