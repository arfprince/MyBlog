import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  const handleLogOutClick = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("currentSessionUser");
    localStorage.setItem("isLoggedIn", false);
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 to-orange-500 text-white p-4 flex justify-between items-center shadow-lg flex-wrap">
      <h1 className="text-2xl font-extrabold sm:text-xl md:text-2xl lg:text-3xl">My Blog</h1>
      <div className="flex gap-6 items-center mt-4 sm:mt-0">
        <nav className="flex flex-wrap gap-6 justify-center sm:justify-start">
          {isLoggedIn ? (
            <div className="flex items-center gap-6 sm:gap-4 text-lg sm:text-base">
              <h1 className="text-lg sm:text-base">
                Welcome to Blog{" "}
                <span className="font-bold text-blue-800">
                  {JSON.parse(localStorage.getItem("currentSessionUser"))
                    .toLocaleUpperCase()
                    .split("@")[0]}
                </span>
              </h1>
              <Link
                to="/"
                className="text-lg sm:text-base md:text-sm font-semibold hover:text-blue-200 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/profile"
                className="text-lg sm:text-base md:text-sm font-semibold hover:text-blue-200 transition-colors"
              >
                Profile
              </Link>
              <Link
                to="/favorites"
                className="text-lg sm:text-base md:text-sm font-semibold hover:text-blue-200 transition-colors"
              >
                Favorites
              </Link>
              <Link
                to="/last_ten_likes"
                className="text-lg sm:text-base md:text-sm font-semibold hover:text-blue-200 transition-colors"
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
            <div className="flex items-center gap-6 sm:gap-4 text-lg sm:text-base">
             <Link
                to="/"
                className="text-lg sm:text-base md:text-sm font-semibold hover:text-blue-200 transition-colors"
              >
                Home
              </Link>
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition-all"
            >
              Login
            </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
