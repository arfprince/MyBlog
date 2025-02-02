import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogs } from "../context/BlogsContext";
import RanderUserCreatedBlogs from "../components/userElements/profile/randerUserCreatedBlogs";
import { useFavouriteBlogs } from "../context/UsersFavouriteBlogContext";
import { useLikedBlogs } from "../context/UsersLikedBlogContext";
function Profile() {
  const { blogs, setBlogs } = useBlogs();
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);
  const [idForDeleteBlog, setIdForDeleteBlog] = useState("");
  const { allUsersFavouriteBlogs, setAllUsersFavouriteBlogs } =
    useFavouriteBlogs();
  const { allUserslikedBlogs, setAllUsersLikedBlogs } = useLikedBlogs();
  const [editedBlog, setEditedBlog] = useState({});
  const [saveEditedBlog, setSaveEditedBlog] = useState(false);
  const navigate = useNavigate();
  const currentSessionUser = JSON.parse(
    localStorage.getItem("currentSessionUser")
  );
  const handleCreateNewBlog = () => {
    navigate("/newBlog");
  };
  useEffect(() => {
    if (saveEditedBlog) {
      let updatedBlogs = blogs;
      let currentUsersAllBlogs = updatedBlogs[currentSessionUser].map((blog) =>
        blog.id === editedBlog.id ? editedBlog : blog
      );
      updatedBlogs[currentSessionUser] = currentUsersAllBlogs;
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      setBlogs(updatedBlogs);

      let updatedAllUsersFavouriteBlogs = { ...allUsersFavouriteBlogs };
      for (let user in updatedAllUsersFavouriteBlogs) {
        updatedAllUsersFavouriteBlogs[user] = updatedAllUsersFavouriteBlogs[
          user
        ].map((blog) => (blog.id === editedBlog.id ? editedBlog : blog));
      }
      setAllUsersFavouriteBlogs(updatedAllUsersFavouriteBlogs);
      localStorage.setItem(
        "allUsersFavouriteBlogs",
        JSON.stringify(updatedAllUsersFavouriteBlogs)
      );

      let updatedAllUsersLikedBlogs = { ...allUserslikedBlogs };
      for (let user in updatedAllUsersLikedBlogs) {
        updatedAllUsersLikedBlogs[user] = updatedAllUsersLikedBlogs[user].map(
          (blog) => (blog.id === editedBlog.id ? editedBlog : blog)
        );
      }
      setAllUsersLikedBlogs(updatedAllUsersLikedBlogs);
      localStorage.setItem(
        "allUsersLikedBlogs",
        JSON.stringify(updatedAllUsersLikedBlogs)
      );

      setSaveEditedBlog(false);
      setEditedBlog({});
    }
  }, [saveEditedBlog]);

  useEffect(() => {
    if (deleteButtonClicked) {
      let updatedBlogs = blogs;
      let updatedCurrentSessionUserBlogs = updatedBlogs[
        currentSessionUser
      ].filter((blog) => blog.id !== idForDeleteBlog);
      updatedBlogs[currentSessionUser] = updatedCurrentSessionUserBlogs;
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      setBlogs(updatedBlogs);

      let updatedAllUsersFavouriteBlogs = { ...allUsersFavouriteBlogs };
      for (let user in updatedAllUsersFavouriteBlogs) {
        updatedAllUsersFavouriteBlogs[user] = updatedAllUsersFavouriteBlogs[
          user
        ].filter((blog) => blog.id !== idForDeleteBlog);
      }
      setAllUsersFavouriteBlogs(updatedAllUsersFavouriteBlogs);
      localStorage.setItem(
        "allUsersFavouriteBlogs",
        JSON.stringify(updatedAllUsersFavouriteBlogs)
      );

      let updatedAllUsersLikedBlogs = { ...allUserslikedBlogs };
      for (let user in updatedAllUsersLikedBlogs) {
        updatedAllUsersLikedBlogs[user] = updatedAllUsersLikedBlogs[
          user
        ].filter((blog) => blog.id !== idForDeleteBlog);
      }
      setAllUsersLikedBlogs(updatedAllUsersLikedBlogs);
      localStorage.setItem(
        "allUsersLikedBlogs",
        JSON.stringify(updatedAllUsersLikedBlogs)
      );

      setDeleteButtonClicked(false);
      setIdForDeleteBlog("");
    }
  }, [idForDeleteBlog, deleteButtonClicked]);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-7xl mx-auto">
      <button
        onClick={handleCreateNewBlog}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Create New Blog
      </button>

      <h1 className="text-3xl font-bold text-center mt-6 text-gray-800">
        My Blogs
      </h1>

      {/* Blog Grid Layout */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {blogs[currentSessionUser] &&
          blogs[currentSessionUser].map((blog, index) => (
            <RanderUserCreatedBlogs
              key={index}
              blog={blog}
              index={index}
              setDeleteButtonClicked={setDeleteButtonClicked}
              setIdForDeleteBlog={setIdForDeleteBlog}
              editedBlog={editedBlog}
              setEditedBlog={setEditedBlog}
              setSaveEditedBlog={setSaveEditedBlog}
            />
          ))}
      </div>
    </div>
  );
}

export default Profile;
