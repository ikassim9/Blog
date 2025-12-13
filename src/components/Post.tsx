import { Link, useNavigate, useParams } from "react-router-dom";
import type { IPost } from "../model/IPost";
import TextEditor from "./TextEditor";
import Toolbar from "./Toolbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseAuth } from "../services/FirebaseAuth";
import { useState } from "react";
import DeleteConfirmation from "./DeleteConfirmation";
import PostService from "../services/PostService";
import SkeletonLoader from "./SkeletonLoader";
import Spinner from "./Spinner";

function Post({post, showToolBar, id} : {post: IPost, showToolBar: boolean, id: string}) {
 
  const [user, loading] = useAuthState(FirebaseAuth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false)
  const navigate = useNavigate();

  const closeModal = () =>{

    setIsModalOpen(false)
  }
  const openModal = () =>{
    setIsModalOpen(true)
  }

  const onEdit = () => {
    navigate(`/posts/${post.id}/edit`)
  }
 
  const handleDeleteConfirmation = async () =>{
    
    try{

         if(user){
          setIsDeleting(true)
          setIsModalOpen(false)
          const authToken = await user.getIdToken();

          let postId=  post.id.toString();
          
          await PostService.deletePost(authToken, postId);

         }
    }

    catch(ex){

      console.error(`[ERROR] ${ex}`);
    }

    finally {

      setIsModalOpen(false)
      setIsDeleting(false)

      // hard refresh window for now to update list, need to handle state some other way (context, redux etc..)
      window.location.reload();  

    }


  }
  
  return (
    <>

  {isDeleting && <Spinner />}
    <div>
    <DeleteConfirmation isOpen={isModalOpen} onClose={closeModal} onDelete={handleDeleteConfirmation} />
    <Link to={`/posts/${post.id}`} className="flex shadow-lg bg-white h-36 z-100 ">
        <div className="p-2 flex flex-col flex-auto">
          <h2 className="text-base  bold mb-2">{post.title}</h2>

          <TextEditor
            content={post.description}
            mode="brief"
            editable={false}
          />
          {
            showToolBar   && ( 
             <div className="mt-auto">
            <Toolbar  onEdit={onEdit} onDelete={openModal}/>
          </div>
            )}
        </div>
        {post.thumbnail && (
          <img
            src={post.thumbnail}
            alt="Post Thumbnail"
            className="w-48 object-cover"
          />
        )}
      </Link>
    </div>
    </>
  );
}

export default Post;
