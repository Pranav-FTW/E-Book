import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BooksList from './components/BooksList';
import BookDetail from './components/BookDetail';
import Login from './components/Login';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/books" element={<BooksList />} />
          <Route path="/books/:id" element={<BookDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;