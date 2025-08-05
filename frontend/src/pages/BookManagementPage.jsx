"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useBookContext } from "../context/BookContext"
import { useUser } from "../context/UserContext"

const BookManagementPage = () => {
  const { books, loading, error, fetchBooks, deleteBook, userBooks, userBook, setUserBook } = useBookContext()
  const { user } = useUser()

  const [isDeleting, setIsDeleting] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      await userBooks();
    };
    fetchBooks();
  }, []);
  
  useEffect(() => {
    console.log("Updated userBook:", userBook);
  }, [userBook]);
  
  

  
  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  const handleDeleteBook = async (id) => {
    if (window.confirm("Are you sure you want to delete this book? This action cannot be undone.")) {
      setIsDeleting(true)
      const success = await deleteBook(id)
      if (success) {
        setUserBook(userBook?.filter((book) => book._id !== id) || [])
      }
      setIsDeleting(false)
    }
  }

  if (loading && !isDeleting) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (error && !isDeleting) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  // Use a different variable name
  let userBooksL = userBook || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Your Books</h1>
        <Link
          to="/books/create"
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300"
        >
          Create New Book
        </Link>
      </div>

      {userBooksL.length == 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow-md">
          <p className="text-xl text-gray-600 mb-4">You haven't created any books yet.</p>
          <Link
            to="/books/create"
            className="inline-block bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300"
          >
            Create Your First Book
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Created At</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {userBooksL.map((book) => (
                <tr key={book._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-800">{book.name}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{book.category}</td>
                  <td className="py-3 px-4 text-gray-600">{new Date(book.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    {book.isAuthorizedByAdmin ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Approved</span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                        Pending Approval
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center space-x-2">
                      <Link to={`/books/${book._id}`} className="text-purple-600 hover:text-purple-800" title="View">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </Link>
                      <Link
                        to={`/books/edit/${book._id}`}
                        className="text-yellow-600 hover:text-yellow-800"
                        title="Edit"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDeleteBook(book._id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                        disabled={isDeleting}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default BookManagementPage