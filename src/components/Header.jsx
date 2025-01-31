import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogOutClick = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("currentSessionUser");
    localStorage.setItem("isLoggedIn", false);
    navigate("/");
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 to-orange-500 text-white p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-extrabold">My Blog</h1>
      <div className="flex gap-6 items-center">
        <nav className="flex gap-6">
          {isLoggedIn ? (
            <div className="flex items-center gap-6">
              <h1 className="text-lg">
                Welcome to Blog{" "}
                <span className="font-bold text-blue-500">
                  {JSON.parse(localStorage.getItem("currentSessionUser"))
                    .toLocaleUpperCase()
                    .split("@")[0]}
                </span>
              </h1>
              <Link
                to="/"
                className="text-lg font-semibold hover:text-blue-200 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/profile"
                className="text-lg font-semibold hover:text-blue-200 transition-colors"
              >
                Profile
              </Link>
              <Link
                to="/favorites"
                className="text-lg font-semibold hover:text-blue-200 transition-colors"
              >
                Favorites
              </Link>
              <Link
                to="/last_ten_likes"
                className="text-lg font-semibold hover:text-blue-200 transition-colors"
              >
                Last Ten Likes
              </Link>
              <button
                onClick={handleLogOutClick}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition-all"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
