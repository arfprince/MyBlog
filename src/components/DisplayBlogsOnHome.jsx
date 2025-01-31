import React from "react";
import { useState,useEffect } from "react";
import { useFavouriteBlogs } from "../context/UsersFavouriteBlogContext";
import { useLikedBlogs } from "../context/UsersLikedBlogContext";
import { useBlogs } from "../context/BlogsContext";

function DisplayBlogsOnHome({ blog, index, key }) {
  const [showMore, setShowMore] = useState(false);
  const {allUsersFavouriteBlogs, setAllUsersFavouriteBlogs} = useFavouriteBlogs();
  const {allUserslikedBlogs, setAllUsersLikedBlogs} = useLikedBlogs();
  const {blogs, setBlogs} = useBlogs();
  const [saveButtonClicked, setSavedButtonClicked] = useState(false);
  const [likeButtonClicked, setLikeButtonClicked] = useState(false);
  
  const currentSessionUser = JSON.parse(
    localStorage.getItem("currentSessionUser")
  );

  useEffect(()=>{
    if(saveButtonClicked){
      let updateCurrentUserFavouriteBlogs = allUsersFavouriteBlogs[currentSessionUser] || [];
      let flag = updateCurrentUserFavouriteBlogs.some(element => element.id === blog.id) ? 1 : 0;

      if(!flag){
        updateCurrentUserFavouriteBlogs.push(blog);
        const newAllUsersFavouriteBlogs = {...allUsersFavouriteBlogs, [currentSessionUser]: updateCurrentUserFavouriteBlogs };
        setAllUsersFavouriteBlogs(newAllUsersFavouriteBlogs);
        localStorage.setItem("allUsersFavouriteBlogs", JSON.stringify(newAllUsersFavouriteBlogs));
        alert("Blog added to your favourites!");
        setSavedButtonClicked(false);
      }
    }
    if(likeButtonClicked){
      let updatedCurrentUserLikedBlogs = allUserslikedBlogs[currentSessionUser] || [];
      let flag = updatedCurrentUserLikedBlogs.some(element => element.id === blog.id) ? 1 : 0;

      if(!flag){
        let updatedCurrentBlog = { ...blog, likeCount: blog.likeCount + 1 };
        let likedBloggerBlogs = blogs[blog.userName] || [];
        let updatedLikedBloggerBlogs = likedBloggerBlogs.map(b => b.id === blog.id ? updatedCurrentBlog : b);
        if (!likedBloggerBlogs.some(b => b.id === blog.id)) {
          updatedLikedBloggerBlogs.push(updatedCurrentBlog);
        }
        setBlogs({ ...blogs, [blog.userName]: updatedLikedBloggerBlogs });
        localStorage.setItem("blogs", JSON.stringify({ ...blogs, [blog.userName]: updatedLikedBloggerBlogs }));
      
        updatedCurrentUserLikedBlogs.push(updatedCurrentBlog);
        const newAllUsersLikedBlogs = {...allUserslikedBlogs, [currentSessionUser]: updatedCurrentUserLikedBlogs };
        setAllUsersLikedBlogs(newAllUsersLikedBlogs);
        localStorage.setItem("allUsersLikedBlogs", JSON.stringify(newAllUsersLikedBlogs));
        alert("Blog liked successfully!");
        setLikeButtonClicked(false);
      }
    }
  },[saveButtonClicked, likeButtonClicked])

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
        <span>read time - {blog.readTime} </span>
      </div>

      {/* Like, Dislike & Save Buttons */}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex gap-3 text-gray-700">
          <button onClick={()=> setLikeButtonClicked(true)} className="flex items-center gap-1 hover:text-blue-500 transition">
            👍 <span>{blog.likeCount}</span>
          </button>
        </div>
        <button onClick={()=> setSavedButtonClicked(true)} className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition">
          Favourite
        </button>
      </div>
    </div>
  );
}

export default DisplayBlogsOnHome;
