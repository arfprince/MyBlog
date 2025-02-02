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
import Layout from "./components/Layout.jsx";
import Login from "./Authentication/Login.jsx";
import Register from "./Authentication/Register.jsx";
import Home from "./components/Home.jsx";
import Profile from "./components/userElements/profile/Profile.jsx";
import CreateNewBlog from "./components/userElements/profile/CreateNewBlog.jsx";
import Favorites from "./components/userElements/favourites/Favourites.jsx";
import LastTenLikes from "./components/userElements/lastTenLikes/lastTenLikes.jsx";
import { LikedBlogsProvider } from "./context/UsersLikedBlogContext.jsx";
import PrivateRoute from "./Authentication/PrivateRoutes.jsx";
import { UserLoginProvider } from "./context/userLoginContext.jsx";

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
