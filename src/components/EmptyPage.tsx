import { Link } from "react-router-dom";
 
export default function EmptyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-2xl font-semibold text-gray-700 mb-2">
        No Posts Yet
      </h1>

      <p className="text-gray-500 mb-6 text-center">
        You haven’t created any posts yet. Start writing your first one!
      </p>

      <Link
        to="/users/create-post"
        className="text-center bg-primary text-white w-28 p-2 rounded-md"
      >
        Create post
      </Link>
    </div>
  );
}
