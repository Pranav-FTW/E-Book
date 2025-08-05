"use client"

import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useBookContext } from "../context/BookContext"
import { useUser } from "../context/UserContext"

const BookDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { fetchBookById, deleteBook, loading, error } = useBookContext()
  const { user } = useUser()
  const [book, setBook] = useState(null)

  useEffect(() => {
    const loadBook = async () => {
      const bookData = await fetchBookById(id)
      if (bookData) {
        setBook(bookData)
      } else {
        navigate("/books")
      }
    }

    if (id) {
      loadBook()
    }
  }, [id])

  const handleDeleteBook = async () => {
    if (window.confirm("Are you sure you want to delete this book? This action cannot be undone.")) {
      const success = await deleteBook(id)
      if (success) {
        navigate("/books")
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (!book) {
    return null
  }

  const isAuthor = user && book.author._id === user._id

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link to="/books" className="text-purple-600 hover:underline flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Books
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.name}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <span className="mr-4">By: {book.author.fullName}</span>
                <span className="mr-4">Category: {book.category}</span>
                <span>Published: {new Date(book.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {isAuthor && (
              <div className="flex space-x-2">
                <Link
                  to={`/books/edit/${book._id}`}
                  className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
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
                  Edit
                </Link>
                <button
                  onClick={handleDeleteBook}
                  className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
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
                  Delete
                </button>
              </div>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Summary</h2>
            <div className="bg-gray-50 p-4 rounded-md text-gray-700">
              <p>{book.summery}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Content</h2>
            <div className="bg-gray-50 p-4 rounded-md text-gray-700 whitespace-pre-line">
              <p>{book.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetailPage

