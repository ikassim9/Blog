import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { IPost } from "../model/IPost";
import SkeletonLoader from "../components/SkeletonLoader";
import Footer from "../components/Footer";
 import PostService from "../services/PostService";
import PostGallery from "../components/PostGallery";
import { useParams } from "react-router-dom";

export default function UserProfile() {

  const { id } = useParams() as { id: string }; // to type to string

    const [posts, setPost] = useState<IPost[]>([]);
    const [isLoading, setLoading] = useState(true);

    
    useEffect(() => {

       const getPosts = async () => {
        try {

          const response = await PostService.GetUserPosts(id);
          setPost(response.data);
 
        } catch (error) {
          console.log(error);
        } finally {
         setLoading(false);
        }
      };
  
      getPosts();
    }, [id]);
  
    return (
      <>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
         <>  
         <div className="flex flex-col min-h-screen bg-gray-100">
         <Nav></Nav>
         <PostGallery posts={posts} showToolBar={true} />
        <Footer></Footer>
         </div>
         </>
         
        )}
      </>
    );
  }
  