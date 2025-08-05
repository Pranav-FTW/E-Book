import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BookDetail = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the book details by ID
  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8000/api/v1/books/${id}`, {
        withCredentials: true,
      });
      setBook(res.data);
      
      // If book has a user property with an ID, fetch user details
      if (res.data.user && (res.data.user._id || typeof res.data.user === 'string')) {
        const userId = res.data.user._id || res.data.user;
        fetchUserDetails(userId);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching book details:', error);
      alert('Failed to load book details');
      setLoading(false);
    }
  };

  // Fetch user details
  const fetchUserDetails = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/users/${userId}`, {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
      // Continue even if user details fail to load
    } finally {
      setLoading(false);
    }
  };

  // Handle making the book public
  const makePublic = async () => {
    try {
      await axios.post(
        'http://localhost:8000/api/v1/books/makepublic',
        { bookId: id },
        { withCredentials: true }
      );
      alert('Book made public successfully!');
    } catch (error) {
      console.error('Error making the book public:', error);
      alert('Failed to make book public');
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  if (loading || !book) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Helper function to safely render potentially complex values
  const renderSafeValue = (value) => {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'object') return JSON.stringify(value);
    return value.toString();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl bg-gray-900 text-white min-h-screen">
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{book.name || 'Untitled Book'}</h1>
              <div className="flex flex-wrap items-center text-gray-300 mb-4">
                <span className="mr-4">By: {typeof book.author === 'string' ? book.author : 'Unknown Author'}</span>
                <span className="mr-4">Category: {book.category || 'Uncategorized'}</span>
                <span>Published: {book.createdAt ? new Date(book.createdAt).toLocaleDateString() : 'N/A'}</span>
              </div>
              {user && (
                <div className="text-gray-300 mb-2">
                  <span>Added by: {user.fullName || user.username || 'Unknown User'}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Summary</h2>
            <div className="bg-gray-700 p-4 rounded-md">
              <p>{book.summery || book.summary || 'No summary available'}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Content</h2>
            <div className="bg-gray-700 p-4 rounded-md whitespace-pre-line">
              <p>{book.content || 'No content available'}</p>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              onClick={makePublic}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
            >
              Make Public
            </button>
            <button
              onClick={() => navigate('/books')}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
            >
              Back to Books
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;