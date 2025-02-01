import { Navigate } from "react-router-dom";

const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

export default function PrivateRoute({ children }) {
  return isLoggedIn ? children : <Navigate to="/" replace/>
}
