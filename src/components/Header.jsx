
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const navigate = useNavigate()
    const handleLogOutClick = () => {
      setIsLoggedIn(false);
      localStorage.removeItem("currentSessionUser");
      localStorage.setItem("isLoggedIn", false);
      navigate("/");
    };
    return (
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">My Blog</h1>
        <div className="flex gap-4">
          <nav>
            {isLoggedIn ? (
              <div className="flex gap-4">
                <h1>Welcome to Blog {JSON.parse(localStorage.getItem("currentSessionUser"))}</h1>
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/profile" className="hover:underline">Profile</Link>
                <Link to="/favorites" className="hover:underline">Favorites</Link>
                <button onClick={handleLogOutClick} className="bg-red-500 px-3 py-1 rounded">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="bg-blue-500 px-3 py-1 rounded">Login</Link>
            )}
          </nav>
        </div>
      </header>
    );
  }