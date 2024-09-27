import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Post from "../components/Post";
import PostService from "../services/PostService";
import { FirebaseAuth } from "../services/FirebaseAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import { IPost } from "../model/IPost";

export default function Home() {
  const [currentUser] = useAuthState(FirebaseAuth);

 // const [posts, setPost] = useState<IPost[]>([]);


 const posts = [{

   id: 1,
   userId: "1",
   title: "post 1",
   description: "post 1 description sample",
 },

 {

  id: 2,
  userId: "2",
  title: "post 2",
  description: "post 2 description sample",

 },

 {

  id: 3,
  userId: "3",
  title: "post 3 sample",
  description: "post 2 description sample",

 }

]
 
  // useEffect(() => {

  //   const getPosts = async () => {
 
  //       await PostService.getPosts()
  //         .then((response) => {

  //           setPost(response.data);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
 
  //   };
    
 
  //   getPosts();
 
  // }, []);

  return (
    <>
      <nav>
        <Nav></Nav>
      </nav>

      <section className="ml-8 mt-8 sm:mt-20">
        <section className="mb-8 text-center sm:mb-20">
          <h1 className="text-2xl sm:text-4xl">
            Connect with others through blogging
          </h1>
          <p className="text-base mt-4 sm:text-xl">
            Explore, Share, and Connect - Your Online Community Awaits
          </p>
        </section>

        <section className="grid p-3 gap-4 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <Post key={post.id} title={post.title} description={post.description}/>
          ))}
        </section>
      </section>
    </>
  );
}
