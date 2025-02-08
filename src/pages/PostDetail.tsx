import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import PostService from "../services/PostService";
import TextEditor from "../components/TextEditor";
import Nav from "../components/Nav";
import SkeletonLoader from "../components/SkeletonLoader";
import Footer from "../components/Footer";

export default function PostDetail() {
  const { id } = useParams() as { id: string }; // to type to string

  const [post, setPost] = useState<any>();
  const descriptionRef = useRef<any>(null);
  const location = useLocation();
    const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getPostDetail = async () => {
      try{
      
        const response = await PostService.getPostById(id);
        setPost(response.data);
        window.scrollTo(0, 0);
      }
      catch(error){
        console.log(error);
      }
      finally{
        setLoading(false)
      }
     
    };

    getPostDetail();
  }, [id, location]);

  return (
    <>
      
      {loading ? (
     <SkeletonLoader />
      ): (
        <div className="min-h-screen flex flex-col">
          <Nav />
        <main className="lg:w-1/2 lg:m-auto p-2 mt-8">
          <section>
            {post?.thumbnail && (
              <img
                src={post.thumbnail}
                alt="Post Thumbnail"
                className="w-full md:h-96 object-cover"
              />
            )}
          </section>
          <section className="p-4  bg-white min-h-32	">
            <h1 className="">{post?.title}</h1>
            <TextEditor
              content={post.description} 
              editable={false}
              mode=""
              ref={descriptionRef}
            />
          </section>
 

      </main>
      <Footer />
      </div>
      )}
     
    </>
  );
}
