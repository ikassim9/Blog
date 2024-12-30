import { Link } from "react-router-dom";
import { IPost } from "../model/IPost";
import TextEditor from "./TextEditor";

function Post({post} : {post: IPost}){
  return (
    <>
    <Link to={`/posts/${post.id}`} className="flex shadow-lg bg-white h-36 ">
        <div className="p-4">
          <h2 className="text-base  bold mb-2">{post.title}</h2>
          <TextEditor content={post.description} mode="brief" editable={false} />
          {/* <h3 className="text-blue-500">Sam</h3> */}
        </div>

        {post.thumbnail && (
          <img
            src={post.thumbnail}
            alt="Post Thumbnail"
            className="w-32 object-cover ml-auto"
          />
        )}
      </Link>
    </>
  );
}

export default Post;
