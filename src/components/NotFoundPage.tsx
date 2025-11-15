import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-black mb-4">404</h1>

      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-500 mb-6 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>

    <Link to="/"   className="text-center bg-primary text-white   p-3 rounded-md">
        Go back to Home
      </Link>

      
    
    </div>
  );
}
