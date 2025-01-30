import React, { useState } from "react";

export default function RanderUserCreatedBlogs({
  blog,
  index,
  setDeleteButtonClicked,
  setIdForDeleteBlog,
}) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div>
      <div key={index} className="bg-white p-4 rounded-lg shadow-md mt-4">
        {/* Blog Image */}
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>

        {/* Author and Status */}
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>By {blog.author}</span>
          <span>{blog.status}</span>
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
          <span>read time - {blog.readTime}</span>
        </div>

        {/* Like Count */}
        <div className="mt-4 flex justify-around items-center text-gray-700">
          <span className="mr-2">Likes: {blog.likeCount}</span>
          <button
            onClick={() => {
              setDeleteButtonClicked(true);
              setIdForDeleteBlog(blog.id);
            }}
            className="bg-red-500 text-white text-sm px-4 py-1 rounded-md hover:bg-red-700 focus:outline-none"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
