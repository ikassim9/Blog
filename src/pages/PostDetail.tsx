import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import PostService from "../services/PostService";
import TextEditor from "../components/TextEditor";
import Nav from "../components/Nav";

export default function PostDetail() {
  const { id } = useParams() as { id: string }; // to type to string

  const [post, setPost] = useState<any>();
  const descriptionRef = useRef<any>(null);
  const location = useLocation();

  useEffect(() => {
    const getPostDetail = async () => {
      await PostService.getPostById(id)
        .then((response) => {
          setPost(response.data);
          descriptionRef.current.setHTML(response.data.description);
          // to scroll top of page on page load
          window.scrollTo(0, 0);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getPostDetail();
  }, [id, location]);

  return (
    <>
      <Nav />

      <div className="min-h-screen p-2 mt-8">
        <div className="xl:w-1/2 m-auto">
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
              content=""
              editable={false}
              mode=""
              ref={descriptionRef}
            />
          </section>
        </div>
      </div>
    </>
  );
}
