import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Header = () => {
  const { user, logout } = useUser();

  return (
    <header className="bg-purple-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">User Management</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/profile" className="hover:text-purple-200">Profile</Link>
              <button onClick={logout} className="hover:text-purple-200">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-purple-200">Login</Link>
              <Link to="/register" className="hover:text-purple-200">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

