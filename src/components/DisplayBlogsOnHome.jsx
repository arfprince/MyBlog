import React, { useState, useEffect } from "react";
import ReactTimeAgo from "react-time-ago";
import { useFavouriteBlogs } from "../context/UsersFavouriteBlogContext";
import { useLikedBlogs } from "../context/UsersLikedBlogContext";
import { useBlogs } from "../context/BlogsContext";
import { Link } from "react-router-dom";

function DisplayBlogsOnHome({ blog }) {
  const [showMore, setShowMore] = useState(false);
  const { allUsersFavouriteBlogs, setAllUsersFavouriteBlogs } =
    useFavouriteBlogs();
  const { allUserslikedBlogs, setAllUsersLikedBlogs } = useLikedBlogs();
  const { blogs, setBlogs, setSingleDetailedBlog } = useBlogs();
  const [isFavourite, setIsFavourite] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const currentSessionUser = JSON.parse(
    localStorage.getItem("currentSessionUser")
  );

  useEffect(() => {
    const userFavourites = allUsersFavouriteBlogs[currentSessionUser] || [];
    setIsFavourite(userFavourites.some((fav) => fav.id === blog.id));
    const userLikedBlogs = allUserslikedBlogs[currentSessionUser] || [];
    setIsLiked(userLikedBlogs.some((liked) => liked.id === blog.id));
  }, [allUsersFavouriteBlogs, allUserslikedBlogs, blog.id, currentSessionUser]);

  const toggleFavourite = () => {
    let userFavourites = allUsersFavouriteBlogs[currentSessionUser] || [];
    if (isFavourite) {
      userFavourites = userFavourites.filter((fav) => fav.id !== blog.id);
    } else {
      userFavourites.push(blog);
    }
    const updatedFavourites = {
      ...allUsersFavouriteBlogs,
      [currentSessionUser]: userFavourites,
    };
    setAllUsersFavouriteBlogs(updatedFavourites);
    localStorage.setItem(
      "allUsersFavouriteBlogs",
      JSON.stringify(updatedFavourites)
    );

    setIsFavourite(!isFavourite);
  };

  const toggleLike = () => {
    let updatedCurrentBlog = {
      ...blog,
      likeCount: isLiked ? blog.likeCount - 1 : blog.likeCount + 1,
    };
    let userLikedBlogs = allUserslikedBlogs[currentSessionUser] || [];

    if (isLiked) {
      userLikedBlogs = userLikedBlogs.filter((liked) => liked.id !== blog.id);
    } else {
      userLikedBlogs.push(updatedCurrentBlog);
    }
    let likedBloggerBlogs = blogs[blog.userName] || [];
    let updatedLikedBloggerBlogs = likedBloggerBlogs.map((b) =>
      b.id === blog.id ? updatedCurrentBlog : b
    );

    setBlogs({ ...blogs, [blog.userName]: updatedLikedBloggerBlogs });
    localStorage.setItem(
      "blogs",
      JSON.stringify({ ...blogs, [blog.userName]: updatedLikedBloggerBlogs })
    );

    const updatedLikedBlogs = {
      ...allUserslikedBlogs,
      [currentSessionUser]: userLikedBlogs,
    };
    setAllUsersLikedBlogs(updatedLikedBlogs);
    localStorage.setItem(
      "allUsersLikedBlogs",
      JSON.stringify(updatedLikedBlogs)
    );

    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow-md mt-6 hover:bg-gray-200 transition duration-300">
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover rounded-lg mb-4 shadow-sm"
        />
      )}

      <h3 className="text-2xl font-semibold text-gray-800">{blog.title}</h3>

      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span>
          By <span className="font-medium text-gray-700">{blog.author}</span>
        </span>
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            blog.status === "public"
              ? "bg-green-200 text-green-700"
              : "bg-red-200 text-red-700"
          }`}
        >
          {blog.status}
        </span>
      </div>

      <p className="text-gray-600 mt-3">
        {showMore ? blog.content : `${blog.content.substring(0, 100)}...`}
      </p>
      {/* <button
        onClick={() => setShowMore(!showMore)}
        className="text-blue-500 mt-2 font-medium hover:underline"
      >
        {showMore ? "Show Less" : "Show More"}
      </button> */}
      <Link
        to={`/${blog.id}`} // Dynamically use the blog.id for the URL
        className="text-blue-500 mt-2 font-medium hover:underline"
        onClick={()=> setSingleDetailedBlog(blog)}
      >
        Show Details
      </Link>

      <div className="flex justify-between text-sm text-gray-500 mt-4">
        <span>{new Date(blog.time).toLocaleString()}</span>
        <span>
          <ReactTimeAgo date={new Date(blog.time)} locale="en-US" />
        </span>
        <span>⏳ {blog.readTime} mins read</span>
      </div>

      <div className="mt-4 flex justify-between items-center">
        {/* Like Button */}
        {currentSessionUser && (
          <button
            onClick={toggleLike}
            className={`px-5 py-2 rounded-lg transition flex items-center gap-1 ${
              isLiked
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 hover:bg-gray-400"
            } text-white`}
          >
            👍 {blog.likeCount}
          </button>
        )}

        {/* Favourite Button */}
        {currentSessionUser && (
          <button
            onClick={toggleFavourite}
            className={`px-5 py-2 rounded-lg transition ${
              isFavourite
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            } text-white`}
          >
            {isFavourite ? "Unfavourite" : "Favourite"}
          </button>
        )}
      </div>
    </div>
  );
}

export default DisplayBlogsOnHome;
