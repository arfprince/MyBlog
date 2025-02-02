

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/userLoginContext";

export default function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
