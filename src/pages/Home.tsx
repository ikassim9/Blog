import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Post from "../components/Post";
import PostService from "../services/PostService";
import { IPost } from "../model/IPost";
import SkeletonLoader from "../components/SkeletonLoader";
import Footer from "../components/Footer";

export default function Home() {
 
  const [posts, setPost] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await PostService.getPosts();
        setPost(response.data);
      } catch (error) {
        console.log(error);
      } finally {
       setLoading(false);
      }
    };

    getPosts();
  }, []);

  return (
    <>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="flex flex-col min-h-screen">
          <header>
            <nav>
              <Nav></Nav>
            </nav>
            <section className="mt-8 mb-8 text-center sm:mb-20">
              <h1 className="text-2xl sm:text-4xl">
                Connect with others through blogging
              </h1>
              <p className="text-base mt-4 sm:text-xl">
                Explore, Share, and Connect - Your Online Community Awaits
              </p>
            </section>
          </header>
          <main>
            <section className="grid p-3  gap-4 xl:w-1/2 m-auto">
              {posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </section>
          </main>
          <Footer></Footer>
        </div>
      )}
    </>
  );
}
