import { SubmitHandler, useForm } from "react-hook-form";
import { IPost } from "../model/IPost";
import PostService from "../services/PostService";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseAuth } from "../services/FirebaseAuth";
import Nav from "../components/Nav";
import { useState } from "react";

export default function CreatePost() {


  const [currentUser] = useAuthState(FirebaseAuth);
  const [message, setMessage] = useState('');

  const [error, setErrorMessage] = useState('');
  
  // use to support typescript
  type FormValues = {
    title: string;
    description: string;
  };

  // validate only on form submission
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const createPost: SubmitHandler<FormValues> = async (form: FormValues) => {
 
    const post = form as IPost;

    debugger;
 
    if (currentUser) {
      const authToken = await currentUser.getIdToken();

      await PostService.createPost(post, authToken)
        .then((response) => {
          console.log("response", response.data);
          reset();
          setMessage('post created successfully');
          setErrorMessage('');
        })
        .catch((error) => {
          console.log(error);
            debugger;
            setErrorMessage('Something went wrong. Please try again');
            setMessage('');
        });
    }
    

  };

  return (
    <>

    <Nav />
      <div className="p-4 max-w-3xl mx-auto min-h-screen">

      {
          message.length > 0 &&
          <div
            className="bg-green-100 border-t border-b border-green-500 text-black px-4 py-3 mb-4"
            role="alert"
          >
            <p className="text-sm">
             {message}
            </p>
          </div>
        }

        
      {
          error.length > 0 &&
          <div
            className="bg-red-100 border-t border-b red-green-500 text-black px-4 py-3 mb-4"
            role="alert"
          >
            <p className="text-sm">
             {error}
            </p>
          </div>
        }

        <h1 className="text-center text-3xl">Create post</h1>

        <form
          action="POST"
          className="space-y-4 group"
          onSubmit={handleSubmit(createPost)}
          noValidate
        >
          <input
          {...register("title", { required: true })}
            type="text"
            placeholder="Title"
            required
            id="title"
            className="field"
          />

          <textarea
             {...register("description", { required: true })}
            className="field sec p-3 h-60 border border-gray-300 outline-none resize-none"
            placeholder="Describe everything about this post here"
          ></textarea>

          <button
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
