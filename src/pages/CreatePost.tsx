import { SubmitHandler, useController, useForm } from "react-hook-form";
import { IPost } from "../model/IPost";
import PostService from "../services/PostService";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseAuth } from "../services/FirebaseAuth";
import Nav from "../components/Nav";
import { useRef, useState } from "react";
import TextEditor from "../components/TextEditor";

export default function CreatePost() {

  const [currentUser] = useAuthState(FirebaseAuth);
  const [message, setMessage] = useState('');
  const [error, setErrorMessage] = useState('');
  const  titleRef = useRef<any>(null);
  const descriptionRef = useRef<any>(null); 
  
 
  const createPost= async (event: any) => {

    event.preventDefault();
    
    let title = titleRef.current.value;
    let description = descriptionRef.current.getHTML();

    const post = {title: title, description:  description} as IPost;
 
    if (currentUser) {
      const authToken = await currentUser.getIdToken();

      await PostService.createPost(post, authToken)
        .then((response) => {
          setMessage('post created successfully');
          setErrorMessage('');
        })
        .catch((error) => {
            setErrorMessage('Something went wrong. Please try again');
            setMessage('');
        });
    }
    

  };

  return (
    <>
 
    <Nav />
      <div className="p-4 max-w-3xl mx-auto min-h-screen">

        <h1 className="text-center text-3xl mb-4">Create post</h1>

        <form
          action="POST"
          className="space-y-4 group"
          onSubmit={createPost}
          noValidate
        >
          <input
          ref={titleRef}
            type="text"
            placeholder="Title"
            required
            id="title"
            className="field"
            name="title"
          />

          <TextEditor editable={true} content="" ref={descriptionRef}></TextEditor>
           <button
           type="submit"
            data-cy="submitBtn"
            className="bg-primary text-white  p-2 rounded-md w-full"
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
}
