import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserContext";
import { BookProvider } from "./context/BookContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AllBooksPage from "./pages/AllBooksPage";
import CreateBookPage from "./pages/CreateBookPage";
import BookManagementPage from "./pages/BookManagementPage";
import EditBookPage from "./pages/EditBookPage";
import BookDetailPage from "./pages/BookDetailPage";
import Footer from "./components/Footer";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<AllBooksPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/books" element={<AllBooksPage />} />
    <Route path="/books/create" element={<CreateBookPage />} />
    <Route path="/books/manage" element={<BookManagementPage />} />
    <Route path="/books/edit/:id" element={<EditBookPage />} />
    <Route path="/books/:id" element={<BookDetailPage />} />
  </Routes>
);

function App() {
  return (
    <UserProvider>
      <BookProvider>
        <Router>
          <div className="min-h-screen bg-purple-50">
            <Header />
            <AppRoutes />
            <Footer />
            <ToastContainer position="bottom-right" />
          </div>
        </Router>
      </BookProvider>
    </UserProvider>
  );
}

export default App;
