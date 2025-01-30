import React from "react";
import { useState } from "react";
import { useFavouriteBlogs } from "../context/UsersFavouriteBlogContext";

function DisplayBlogsOnHome({ blog, index }) {
  const [showMore, setShowMore] = useState(false);
  const {allUsersFavouriteBlogs, setAllUsersFavouriteBlogs} = useFavouriteBlogs();
  const handleSaveBtn = () => {
    const currentSessionUser = JSON.parse(
      localStorage.getItem("currentSessionUser")
    );
    let updateCurrentUserFavouriteBlogs = allUsersFavouriteBlogs[currentSessionUser] || [];
    console.log(updateCurrentUserFavouriteBlogs);
    let flag=0;
    for (let index = 0; index < updateCurrentUserFavouriteBlogs.length; index++) {
      const element = updateCurrentUserFavouriteBlogs[index];
      if(element.id===blog.id)
        flag=1;
    }
    if(flag!==1){
      updateCurrentUserFavouriteBlogs.push(blog);
      setAllUsersFavouriteBlogs({...allUsersFavouriteBlogs, [currentSessionUser]: updateCurrentUserFavouriteBlogs });
      localStorage.setItem("allUsersFavouriteBlogs", JSON.stringify(allUsersFavouriteBlogs));
      alert("Blog added to your favourites!");
    }
  }
  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow-md mt-6 hover:bg-gray-200 transition duration-300">
      {/* Blog Image */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover rounded-lg mb-4 shadow-sm"
        />
      )}

      {/* Title */}
      <h3 className="text-2xl font-semibold text-gray-800">{blog.title}</h3>

      {/* Author and Status */}
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

      {/* Content Preview with "Show More" Toggle */}
      <p className="text-gray-600 mt-3">
        {showMore ? blog.content : `${blog.content.substring(0, 100)}...`}
      </p>
      <button
        onClick={() => setShowMore(!showMore)}
        className="text-blue-500 mt-2 font-medium hover:underline"
      >
        {showMore ? "Show Less" : "Show More"}
      </button>

      {/* Time and Read Time */}
      <div className="flex justify-between text-sm text-gray-500 mt-4">
        <span>{new Date(blog.time).toLocaleString()}</span>
        <span>{blog.readtime} min read</span>
      </div>

      {/* Like, Dislike & Save Buttons */}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex gap-3 text-gray-700">
          <button className="flex items-center gap-1 hover:text-blue-500 transition">
            👍 <span>{blog.likeCount}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-red-500 transition">
            👎
          </button>
        </div>
        <button onClick={handleSaveBtn} className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition">
          Favourite
        </button>
      </div>
    </div>
  );
}

export default DisplayBlogsOnHome;
