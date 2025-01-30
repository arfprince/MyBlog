import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BlogsProvider } from "./context/BlogsContext.jsx";
import { FavouriteBlogsProvider } from "./context/UsersFavouriteBlogContext.jsx";
import Layout from "./components/Layout.jsx";
import Login from "./Authentication/Login.jsx";
import Register from "./Authentication/Register.jsx";
import Home from "./components/Home.jsx";
import Profile from "./components/userElements/profile/Profile.jsx";
import CreateNewBlog from "./components/userElements/profile/CreateNewBlog.jsx";
import Favorites from "./components/userElements/favourites/Favourites.jsx";
const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/newBlog" element={<CreateNewBlog />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <FavouriteBlogsProvider>
    <BlogsProvider>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </BlogsProvider>
  </FavouriteBlogsProvider>
);
