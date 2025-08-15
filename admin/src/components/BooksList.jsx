import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch books from the server
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/v1/books/getbooks', {}, {
        withCredentials: true,
      });
      setBooks(res.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      alert('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  // Handle making a book public
  const makePublic = async (bookId) => {
    try {
      await axios.post(
        '/api/v1/books/makepublic',
        { bookId },
        { withCredentials: true }
      );
      alert('Book made public successfully!');
    } catch (error) {
      console.error('Error making the book public:', error);
      alert('Failed to make book public');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading && books.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen">
      <div className="w-full max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Books List</h1>
        {books.length === 0 ? (
          <p className="text-center py-8">No books available.</p>
        ) : (
          books.map((book) => (
            <div key={book._id} className="bg-gray-800 p-4 rounded flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{book.name}</h3>
                <p className="text-sm text-gray-400">{book.author}</p>
              </div>
              <div className="flex space-x-4">
                <Link
                  to={`/books/${book._id}`}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                >
                  View Book
                </Link>
                <button
                  onClick={() => makePublic(book._id)}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                >
                  Make Public
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BooksList;