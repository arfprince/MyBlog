import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { BlogsProvider } from "./context/BlogsContext.jsx";
import { FavouriteBlogsProvider } from "./context/UsersFavouriteBlogContext.jsx";
import Layout from "./Layout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import CreateNewBlog from "./components/userElements/profile/CreateNewBlog.jsx";
import Favorites from "./pages/Favourites.jsx";
import LastTenLikes from "./pages/lastTenLikes.jsx";
import { LikedBlogsProvider } from "./context/UsersLikedBlogContext.jsx";
import PrivateRoute from "./Authentication/PrivateRoutes.jsx";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/favorites"
        element={
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/newBlog"
        element={
          <PrivateRoute>
            <CreateNewBlog />
          </PrivateRoute>
        }
      />
      <Route
        path="/last_ten_likes"
        element={
          <PrivateRoute>
            <LastTenLikes />
          </PrivateRoute>
        }
      />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <LikedBlogsProvider>
    <FavouriteBlogsProvider>
      <BlogsProvider>
        <AuthProvider>
          <RouterProvider router={routes} />
        </AuthProvider>
      </BlogsProvider>
    </FavouriteBlogsProvider>
  </LikedBlogsProvider>
);
