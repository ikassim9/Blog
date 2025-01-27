import { useAuthState } from "react-firebase-hooks/auth";
import { IPost } from "../model/IPost";
import Post from "./Post";
import { FirebaseAuth } from "../services/FirebaseAuth";
import SkeletonLoader from "./SkeletonLoader";
import Toolbar from "./Toolbar";
import { useParams } from "react-router-dom";
 
// wil be used by both home page and user profile page

export default function PostGallery({posts, showToolBar} : {posts: IPost[], showToolBar: boolean}) { 
  const [user, loading] = useAuthState(FirebaseAuth);

 const { id } = useParams() as { id: string }; // to type to string
     return (
        <>
            {loading ? (
                <SkeletonLoader />
              ) : (
              <main>
                <section className="grid p-3  gap-4 xl:w-1/2 m-auto">
                  {posts.map((post) => (
                   <Post key={post.id} post={post} id={id} showToolBar={showToolBar} />
                  ))}
                </section>
              </main>
              )}
        </>
      );

}