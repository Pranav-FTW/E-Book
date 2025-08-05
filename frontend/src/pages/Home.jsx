import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Home = () => {
  const { user } = useUser();

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-6 text-purple-600">Welcome to Book Management</h1>
      <p className="text-lg text-gray-700 mb-6">
        {user ? `Hello, ${user.fullName}! Explore and manage your books.` : "Please log in or register to get started."}
      </p>
      <div className="flex space-x-4">
        {user ? (
          <Link to="/profile" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
            View Profile
          </Link>
        ) : (
          <>
            <Link to="/login" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
              Login
            </Link>
            <Link to="/register" className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
