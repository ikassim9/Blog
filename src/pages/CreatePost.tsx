import PostService from "../services/PostService";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseAuth } from "../services/FirebaseAuth";
import Nav from "../components/Nav";
import { useRef, useState } from "react";
import TextEditor from "../components/TextEditor";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function CreatePost() {

  const [currentUser] = useAuthState(FirebaseAuth);
  const [message, setMessage] = useState('');
  const  titleRef = useRef<any>(null);
  const descriptionRef = useRef<any>(null); 
  const formRef = useRef<any>();
  const [isSubmitting, setIsSubmittting] = useState(false);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Store actual file
  const fileInputRef = useRef<any>();

  const navigate = useNavigate();

  const handleFileChange = (event: any) => {

 
    const file = event.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setPreviewURL(imgURL);
      setSelectedFile(file);
 
    }
  };

  const removeThumbnail = () => {

    if (previewURL) 
      URL.revokeObjectURL(previewURL);

    fileInputRef.current.value = "";
    setPreviewURL(null);
    setSelectedFile(null);
   };
 
  const createPost= async (event: any) => {
    event.preventDefault();

    let title = titleRef.current.value;
    let description = descriptionRef.current.getHTML();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if(selectedFile)
    formData.append("image", selectedFile);

    if (title == null || title === "") {
      setMessage("Please enter a title");
      return;
    }

    try {
      if (currentUser) {
        const authToken = await currentUser.getIdToken();
        setIsSubmittting(true);
        await PostService.createPost(formData, authToken);

        navigate("/");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again");
    }

    finally {
      setIsSubmittting(false);
    }
  };
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <header>
          <Nav />
        </header>
        <main className="flex-grow flex items-center justify-center">
          <div className="p-4 w-full max-w-4xl ">
            {message && (
              <p className=" border-t border-b border-blue-500 text-blue-700 text-center text-lg mb-6">
                {message}
              </p>
            )}

            <h1 className="text-center text-3xl mb-4">Create post</h1>

            <form
              action="POST"
              className="space-y-4 group"
              onSubmit={createPost}
              noValidate
              ref={formRef}
            >
              <div className="mb-4">
                <label className="block mb-2">
                  Upload Thumbnail (Optional)
                </label>

                {/* Hidden file input */}
                <input
                  type="file"
                  id="thumbnail-upload"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />

                {/* Label acts as the upload area */}
                <div className="flex gap-8">
                  <label
                    htmlFor="thumbnail-upload"
                    className="flex justify-center items-center cursor-pointer bg-gray-100 border-2 border-gray-300 rounded-md hover:bg-gray-200 transition duration-200 w-32 h-32"
                  >
                    {previewURL ? (
                      <img
                        src={previewURL}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500">Choose Image</span>
                    )}
                  </label>

                  {previewURL && (
                    <button
                      type="button"
                      onClick={removeThumbnail}
                      className="p-1 mt-auto w-24 text-white text-center bg-red-500 rounded-md hover:bg-red-300"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
              <input
                ref={titleRef}
                type="text"
                maxLength={150}
                placeholder="Title"
                required
                id="title"
                className="p-2 rounded  w-full mt-1 bg-transparent border "
                name="title"
              />

              <TextEditor
                editable={true}
                content=""
                ref={descriptionRef}
              ></TextEditor>
              <button
                type="submit"
                data-cy="submitBtn"
                disabled={isSubmitting}
                className="bg-primary text-white  p-2 rounded-md w-full"
              >
                {isSubmitting ? "Publishing..." : "Publish"}
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
