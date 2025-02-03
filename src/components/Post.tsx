import { Link, useParams } from "react-router-dom";
import { IPost } from "../model/IPost";
import TextEditor from "./TextEditor";
import Toolbar from "./Toolbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseAuth } from "../services/FirebaseAuth";

function Post({post, showToolBar, id} : {post: IPost, showToolBar: boolean, id: string}) {
 
  const [user, loading] = useAuthState(FirebaseAuth);

  return (
    <>
      <Link to={`/posts/${post.id}`} className="flex shadow-lg bg-white h-36 ">
        <div className="p-2 flex flex-col flex-auto">
          <h2 className="text-base  bold mb-2">{post.title}</h2>

          <TextEditor
            content={post.description}
            mode="brief"
            editable={false}
          />
          {
            showToolBar && !loading && user && user.uid === id && ( 
             <div className="mt-auto">
            <Toolbar post={post}/>
          </div>
            )}
        </div>
        {post.thumbnail && (
          <img
            src={post.thumbnail}
            alt="Post Thumbnail"
            className="w-32 object-cover"
          />
        )}
      </Link>
    </>
  );
}

export default Post;
