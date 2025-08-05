"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useBookContext } from "../context/BookContext"
import { useUser } from "../context/UserContext"
import { toast } from "react-toastify"

const EditBookPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { fetchBookById, updateBook, loading, error } = useBookContext()
  const { user } = useUser()

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    summery: "",
    content: "",
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadBook = async () => {
      const book = await fetchBookById(id)
      if (book) {
        // Check if the current user is the author
        if (user && book.author._id !== user._id) {
          toast.error("You are not authorized to edit this book")
          navigate("/books")
          return
        }

        setFormData({
          name: book.name,
          category: book.category,
          summery: book.summery,
          content: book.content,
        })
      } else {
        navigate("/books")
      }
      setIsLoading(false)
    }

    if (id) {
      loadBook()
    }
  }, [id, user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Book title is required"
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required"
    }

    if (!formData.summery.trim()) {
      newErrors.summery = "Summary is required"
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required"
    } else if (formData.content.trim().length < 50) {
      newErrors.content = "Content should be at least 50 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const result = await updateBook(id, formData)
    if (result) {
      navigate("/books/manage")
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Book</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Book Title
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter book title"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="E.g., Fiction, Sci-Fi, Mystery"
          />
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="summery" className="block text-gray-700 font-medium mb-2">
            Summary
          </label>
          <textarea
            id="summery"
            name="summery"
            value={formData.summery}
            onChange={handleChange}
            rows="3"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.summery ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Write a brief summary of your book"
          ></textarea>
          {errors.summery && <p className="text-red-500 text-sm mt-1">{errors.summery}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="10"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.content ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Write your book content here"
          ></textarea>
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/books/manage")}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Updating...
              </span>
            ) : (
              "Update Book"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditBookPage

