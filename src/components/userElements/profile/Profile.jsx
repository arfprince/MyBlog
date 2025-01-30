import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogs } from "../../../context/BlogsContext";
import RanderUserCreatedBlogs from "./randerUserCreatedBlogs";

function Profile() {
  const { blogs, setBlogs } = useBlogs();
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false)
  const [idForDeleteBlog, setIdForDeleteBlog] = useState("")
  const currentSessionUser = JSON.parse(
    localStorage.getItem("currentSessionUser")
  );
  const navigate = useNavigate();
  const handleCreateNewBlog = () => {
    navigate("/newBlog");
  };
  useEffect(() => {
    if (deleteButtonClicked) {
      let updatedBlogs = blogs;
      let updatedCurrentSessionUserBlogs = [];
      
      for (let index = 0; index < updatedBlogs[currentSessionUser].length; index++) {
        if(updatedBlogs[currentSessionUser][index].id!==idForDeleteBlog) {
          updatedCurrentSessionUserBlogs.push(updatedBlogs[currentSessionUser][index]);
        };
      }

      updatedBlogs[currentSessionUser] = updatedCurrentSessionUserBlogs;
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      setBlogs(updatedBlogs);

      setDeleteButtonClicked(false);
      setIdForDeleteBlog("");
    }
  }, [idForDeleteBlog, deleteButtonClicked]);
  
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-6xl mx-auto">
      <button
        onClick={handleCreateNewBlog}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Create New Blog
      </button>

      <h1 className="text-3xl font-bold text-center mt-6 text-gray-800">
        Blog Sections
      </h1>

      <div className="grid grid-cols-3 gap-6 mt-6">
        {/* My Blogs Column */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            My Blogs
          </h2>
          {blogs[currentSessionUser] &&
            blogs[currentSessionUser].map((blog, index) => (
              <RanderUserCreatedBlogs blog={blog} index={index} setDeleteButtonClicked={setDeleteButtonClicked} setIdForDeleteBlog={setIdForDeleteBlog}/>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
