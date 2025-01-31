import React, { useState } from "react";
import { useBlogs } from "../../../context/BlogsContext";
import { useFavouriteBlogs } from "../../../context/UsersFavouriteBlogContext";
import { useLikedBlogs } from "../../../context/UsersLikedBlogContext";
import ReactTimeAgo from "react-time-ago";

export default function RanderUserCreatedBlogs({
  blog,
  index,
  setDeleteButtonClicked,
  setIdForDeleteBlog,
  editedBlog,
  setEditedBlog,
  setSaveEditedBlog,
}) {
  const [showMore, setShowMore] = useState(false);
  const [status, setStatus] = useState(blog.status);
  const { setBlogs } = useBlogs();
  const { allUsersFavouriteBlogs, setAllUsersFavouriteBlogs } = useFavouriteBlogs();
  const { allUserslikedBlogs, setAllUsersLikedBlogs } = useLikedBlogs();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const toggleStatus = () => {
    const newStatus = status === "public" ? "private" : "public";
    setStatus(newStatus);

    const allBlogs = JSON.parse(localStorage.getItem("blogs")) || {};
    const currentSessionUser = JSON.parse(
      localStorage.getItem("currentSessionUser")
    );
    if (allBlogs[currentSessionUser]) {
      allBlogs[currentSessionUser] = allBlogs[currentSessionUser].map((b) =>
        b.id === blog.id ? { ...b, status: newStatus } : b
      );
      setBlogs(allBlogs);
      localStorage.setItem("blogs", JSON.stringify(allBlogs));
    }

    // Update users' favorite blogs
    let updatedAllUsersFavouriteBlogs = { ...allUsersFavouriteBlogs };
    for (let user in updatedAllUsersFavouriteBlogs) {
      let perUserBlogs = updatedAllUsersFavouriteBlogs[user];
      perUserBlogs = perUserBlogs.filter((b) => b.id !== blog.id);
      updatedAllUsersFavouriteBlogs[user] = perUserBlogs;
    }
    setAllUsersFavouriteBlogs(updatedAllUsersFavouriteBlogs);
    localStorage.setItem(
      "allUsersFavouriteBlogs",
      JSON.stringify(updatedAllUsersFavouriteBlogs)
    );

    // Update users' liked blogs
    let updatedAllUsersLikedBlogs = { ...allUserslikedBlogs };
    for (let user in updatedAllUsersLikedBlogs) {
      let perUserBlogs = updatedAllUsersLikedBlogs[user];
      perUserBlogs = perUserBlogs.filter((b) => b.id !== blog.id);
      updatedAllUsersLikedBlogs[user] = perUserBlogs;
    }
    setAllUsersLikedBlogs(updatedAllUsersLikedBlogs);
    localStorage.setItem(
      "allUsersLikedBlogs",
      JSON.stringify(updatedAllUsersLikedBlogs)
    );
  };

  return (
    <>
      {/* Blog Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02]">
        {/* Blog Image */}
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-52 object-cover rounded-lg mb-4"
          />
        )}

        {/* Title */}
        <h3 className="text-2xl font-semibold text-gray-900">{blog.title}</h3>

        {/* Author & Status */}
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>
            By <span className="font-medium text-gray-700">{blog.author}</span>
          </span>
          <button
            onClick={toggleStatus}
            className={`px-3 py-1 rounded-md text-sm font-medium capitalize transition duration-300 ${
              status === "public"
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
          >
            {status}
          </button>
        </div>

        {/* Content Preview */}
        <p className="text-gray-700 mt-4 leading-relaxed">
          {showMore ? blog.content : `${blog.content.substring(0, 100)}...`}
        </p>
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-blue-600 font-medium mt-2 hover:underline"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>

        {/* Time & Read Time */}
        <div className="flex justify-between text-sm text-gray-500 mt-4">
          <span>{new Date(blog.time).toLocaleString()}</span>
          <span>
            <ReactTimeAgo date={new Date(blog.time)} locale="en-US" />
          </span>
          <span>⏳ {blog.readTime} min read</span>
        </div>

        {/* Buttons (Likes, Edit, Delete) */}
        <div className="flex justify-between items-center mt-6">
          <span className="text-gray-700 flex items-center space-x-2">
            <span className="font-medium">❤️ {blog.likeCount}</span>
          </span>

          <div className="flex space-x-3">
            {/* Edit Button */}
            <button
              onClick={() => {
                setIsEditModalOpen(true);
                setEditedBlog(blog);
              }}
              className="bg-blue-500 text-white text-sm px-5 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
            >
              Edit
            </button>

            {/* Delete Button */}
            <button
              onClick={() => {
                setDeleteButtonClicked(true);
                setIdForDeleteBlog(blog.id);
              }}
              className="bg-red-500 text-white text-sm px-5 py-2 rounded-md shadow-md hover:bg-red-600 transition duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Edit Blog Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[450px]">
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              Edit Blog
            </h2>

            {/* Title */}
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={editedBlog.title}
              onChange={(e) =>
                setEditedBlog({ ...editedBlog, title: e.target.value })
              }
              className="w-full p-2 border rounded-md mt-1 focus:ring focus:ring-blue-200"
            />

            {/* Image URL */}
            <label className="block text-sm font-medium text-gray-700 mt-3">
              Image URL
            </label>
            <input
              type="text"
              value={editedBlog.image}
              onChange={(e) =>
                setEditedBlog({ ...editedBlog, image: e.target.value })
              }
              className="w-full p-2 border rounded-md mt-1 focus:ring focus:ring-blue-200"
            />

            {/* Content */}
            <label className="block text-sm font-medium text-gray-700 mt-3">
              Content
            </label>
            <textarea
              value={editedBlog.content}
              onChange={(e) =>
                setEditedBlog({ ...editedBlog, content: e.target.value })
              }
              className="w-full p-2 border rounded-md mt-1 h-28 focus:ring focus:ring-blue-200"
            />

            {/* Buttons */}
            <div className="flex justify-end space-x-4 mt-5">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setSaveEditedBlog(true);
                  setIsEditModalOpen(false);
                }}
                className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
