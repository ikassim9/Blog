import PostService from "../services/PostService";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseAuth } from "../services/FirebaseAuth";
import Nav from "../components/Nav";
import { useEffect, useRef, useState } from "react";
import TextEditor from "../components/TextEditor";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import SkeletonLoader from "../components/SkeletonLoader";
import { set } from "cypress/types/lodash";
 

export default function EditPost() {
  const [currentUser] = useAuthState(FirebaseAuth);
  const [message, setMessage] = useState('');
  const descriptionRef = useRef<any>(null);
  const formRef = useRef<any>();
  const fileInputRef = useRef<any>();
  const { id } = useParams() as { id: string };
  const [post, setPost] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [isThumbnailRemoved, setIsThumbnailRemoved] = useState(false); // To track removal of thumbnail
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Store actual file
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const getPostDetail = async () => {
      try {
        const response = await PostService.getPostById(id);

        if(currentUser?.uid !== response.data.userId) {
          navigate('/')
          return;
        }
  
        setPost(response.data);
        window.scrollTo(0, 0);

        if (descriptionRef.current) {
          descriptionRef.current.setHTML(response.data.description);
        }

        // Set preview if thumbnail exists
        if (response.data.thumbnail) {
          setPreviewURL(response.data.thumbnail);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getPostDetail();
  }, [id]);

  const removeThumbnail = () => {

    if (previewURL) 
      URL.revokeObjectURL(previewURL);

    fileInputRef.current.value = "";
    setPreviewURL(null);
    setSelectedFile(null);
    setIsThumbnailRemoved(true);
  };


  const handleFileChange = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setPreviewURL(imgURL);
      setSelectedFile(file);
      setIsThumbnailRemoved(false);  

    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const description = descriptionRef.current?.getHTML();

    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('description', description);
    formData.append('isThumbnailRemoved', JSON.stringify(isThumbnailRemoved));
 
    if(selectedFile)
    formData.append('image', selectedFile);

 
    if (!post.title) {
      setMessage('Please enter a title');
      return;
    }

    if (currentUser) {
      const authToken = await currentUser.getIdToken();
      setIsSubmitting(true);

      try {
        await PostService.updatePost(id, formData, authToken, isThumbnailRemoved);
        navigate('/');
      } 
      catch (error) {
         setMessage('Something went wrong. Please try again');
      }

      finally{
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="min-h-screen flex flex-col">
          <header>
            <Nav />
          </header>
          <main className="flex-grow flex items-center justify-center">
            <div className="p-4 w-full max-w-4xl">
              {message && (
                <p className="border-t border-b border-blue-500 text-blue-700 text-center text-lg mb-6">
                  {message}
                </p>
              )}

              <h1 className="text-center text-3xl mb-4">Edit post</h1>

              <form
                className="space-y-4 group"
                onSubmit={handleSubmit}
                noValidate
                ref={formRef}
              >
                <div className="mb-4">
                  <label className="block mb-2">
                    Upload Thumbnail (Optional)
                  </label>

                  <input
                    type="file"
                    id="thumbnail-upload"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />

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
                  type="text"
                  maxLength={150}
                  placeholder="Title"
                  required
                  id="title"
                  className="p-2 rounded w-full mt-1 bg-transparent border"
                  name="title"
                  value={post.title || ""}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                />

                <TextEditor
                  editable={true}
                  content=""
                  mode=""
                  ref={descriptionRef}
                />
                <button
                  type="submit"
                  data-cy="submitBtn"
                  disabled={isSubmitting}
                  className="bg-primary text-white  p-2 rounded-md w-full"
                >
                  {isSubmitting ? "Updating..." : "Update"}
                </button>
              </form>
            </div>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
