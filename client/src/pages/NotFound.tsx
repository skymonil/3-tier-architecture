import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/log-in" className="px-4 py-2 bg-[#9c231b] text-white rounded hover:bg-[#502b28]">
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;