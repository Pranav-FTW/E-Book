"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useBookContext } from "../context/BookContext"
import { useUser } from "../context/UserContext"


const BookCard = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{book.name}</h3>
        <p className="text-sm text-gray-600 mb-2">By: {book.author.fullName}</p>
        <p className="text-sm text-gray-500 mb-4">Category: {book.category}</p>
        <div className="mb-4">
          <h4 className="text-md font-semibold text-gray-700 mb-1">Summary</h4>
          <p className="text-sm text-gray-600 line-clamp-3">{book.summery}</p>
        </div>
        <Link
          to={`/books/${book._id}`}
          className="inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300"
        >
          Read More
        </Link>
      </div>
    </div>
  )
}

const AllBooksPage = () => {
  const { books, loading, error, fetchBooks } = useBookContext()
  const { user } = useUser();

  useEffect(() => {
    fetchBooks()
  }, [])

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">All Books</h1>
        {user && (
          <Link
            to="/books/create"
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300"
          >
            Create New Book
          </Link>
        )}
      </div>

      {books.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No books available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  )
}

export default AllBooksPage

