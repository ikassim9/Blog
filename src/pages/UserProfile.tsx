import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { IPost } from "../model/IPost";
import SkeletonLoader from "../components/SkeletonLoader";
import Footer from "../components/Footer";
 import PostService from "../services/PostService";
import PostGallery from "../components/PostGallery";
import { useParams } from "react-router-dom";
import EmptyPage from "../components/EmptyPage";

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
        <Nav />
      {isLoading ? (
        <SkeletonLoader />
      ) : posts.length === 0 ? (
        <EmptyPage />
      ) : (
        <div className="flex flex-col min-h-screen bg-gray-100">
      
          <PostGallery posts={posts} showToolBar={true} />
          <Footer />
        </div>
      )}
    </>
  );
}
  