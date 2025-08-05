"use client"

import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"

const BookContext = createContext()

export const useBookContext = () => useContext(BookContext)

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentBook, setCurrentBook] = useState(null)
  const [userBook, setUserBook] = useState([]);

  // Get all books
  const fetchBooks = async () => {
    setLoading(true)
    try {
      const response = await axios.get("http://localhost:8000/api/v1/books/")
      setBooks(response.data)
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch books")
      toast.error(err.response?.data?.message || "Failed to fetch books")
    } finally {
      setLoading(false)
    }
  }

  // Get a single book
  const fetchBookById = async (id) => {
    setLoading(true)
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/books/${id}`)
      setCurrentBook(response.data)
      setError(null)
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch book")
      toast.error(err.response?.data?.message || "Failed to fetch book")
      return null
    } finally {
      setLoading(false)
    }
  }

  // Create a new book
  const createBook = async (bookData) => {
    setLoading(true)
    try {
      const response = await axios.post("http://localhost:8000/api/v1/books/", bookData, {
        withCredentials: true,
      })
      setBooks([...books, response.data.book])
      toast.success("Book created successfully")
      setError(null)
      return response.data.book
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create book")
      toast.error(err.response?.data?.message || "Failed to create book")
      return null
    } finally {
      setLoading(false)
    }
  }

  // Update a book
  const updateBook = async (id, bookData) => {
    setLoading(true)
    try {
      const response = await axios.put(`http://localhost:8000/api/v1/books/${id}`, bookData, {
        withCredentials: true,
      })
      setBooks(books.map((book) => (book._id === id ? response.data.book : book)))
      toast.success("Book updated successfully")
      setError(null)
      return response.data.book
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update book")
      toast.error(err.response?.data?.message || "Failed to update book")
      return null
    } finally {
      setLoading(false)
    }
  }

  // Delete a book
  const deleteBook = async (id) => {
    setLoading(true)
    try {
      await axios.delete(`http://localhost:8000/api/v1/books/${id}`, {
        withCredentials: true,
      })
      setBooks(books.filter((book) => book._id !== id))
      toast.success("Book deleted successfully")
      setError(null)
      return true
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete book")
      toast.error(err.response?.data?.message || "Failed to delete book")
      return false
    } finally {
      setLoading(false)
    }
  }

  const userBooks = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/users/book`, {
        withCredentials: true,
      })
      console.log(res.data);
      setUserBook(res.data);
      console.log(userBook);
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete book")
      toast.error(err.response?.data?.message || "Failed to delete book")
      return false
    } finally {
      setLoading(false)
    }
  }

  // Load books on component mount
  useEffect(() => {
    fetchBooks()
  }, [])

  const value = {
    books,
    loading,
    error,
    currentBook,
    fetchBooks,
    fetchBookById,
    createBook,
    updateBook,
    deleteBook,
    userBooks,
    userBook,
    setUserBook,
    
  }

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>
}

