"use client"
import { Link, useNavigate } from "react-router-dom"
import { useUser } from "../context/UserContext"
 // Assuming you have this

const Navbar = () => {
  const { user, logout } = useUser() // Assuming you have this
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              BookStore
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/books" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
              Books
            </Link>
            {user && (
              <Link to="/books/manage" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
                My Books
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Hello, {user.fullName || user.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition-colors duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

