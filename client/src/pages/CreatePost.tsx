import { SubmitHandler, useForm } from "react-hook-form";
import { IPost } from "../model/IPost";
import PostService from "../services/PostService";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseAuth } from "../services/FirebaseAuth";
import Nav from "../components/Nav";

export default function CreatePost() {


  const [currentUser] = useAuthState(FirebaseAuth);

  
  // use to support typescript
  type FormValues = {
    title: string;
    description: string;
  };

  // validate only on form submission
  const {
    register,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: { errors },
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
        })
        .catch((error) => {
          console.log(error);
 
        });
    }
    

  };

  return (
    <>

    <Nav />
      <div className="p-4 max-w-3xl mx-auto min-h-screen">
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
