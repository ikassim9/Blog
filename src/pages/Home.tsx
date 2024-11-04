import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Post from "../components/Post";
import PostService from "../services/PostService";
import { IPost } from "../model/IPost";

export default function Home() {
 
  const [posts, setPost] = useState<IPost[]>([]);

 
  useEffect(() => {

    const getPosts = async () => {
 
        await PostService.getPosts()
          .then((response) => {

            setPost(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
 
    };
    
 
    getPosts();
 
  }, []);

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
