import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Post from "../components/Post";
import PostService from "../services/PostService";
import { IPost } from "../model/IPost";
import SkeletonLoader from "../components/SkeletonLoader";
import Footer from "../components/Footer";
import PostGallery from "../components/PostGallery";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseAuth } from "../services/FirebaseAuth";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
 
  const [posts, setPost] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(FirebaseAuth);

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




  // useEffect(() => {

  useEffect(() => {
    const unsubscribe = FirebaseAuth.onAuthStateChanged((currentUser) => {
 
      let user =  localStorage.getItem('user');

      // sets or remove user in local storage
      if (currentUser && currentUser?.uid === user) return;

      if (currentUser && currentUser?.uid !== user) {
        localStorage.setItem("user", currentUser.uid);
      } else if (currentUser == null) {
        localStorage.removeItem("user");
      }

    });
    return unsubscribe; 
  }, [user]);  
     
 
  return (
    <>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="flex flex-col min-h-screen bg-gray-100">
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
          <PostGallery posts={posts} showToolBar={false}/>
          <Footer></Footer>
        </div>
      )}
    </>
  );
}
