import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogs } from "../../../context/BlogsContext";

export default function CreateNewBlog() {
  const { blogs, setBlogs } = useBlogs();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");
  const [readTime, setReadTime] = useState("");
  const [error, setError] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!title || !content || !image || !status || !readTime) {
      setError("All fields are required.");
      return;
    }

    const currentSessionUser = JSON.parse(
      localStorage.getItem("currentSessionUser")
    );
    let newBlog = {
      title,
      author: `${currentSessionUser.split('@')[0]}`,
      content,
      time: new Date().toISOString(),
      image,
      likeCount: 0,
      readTime,
      status,
      id: `${title}${Math.floor((Math.random() * 1000000000) + 1)}`,
      userName: currentSessionUser
    };
    
    let updatedBlogs = blogs;
    const currentSessionUserBlogs = updatedBlogs[currentSessionUser] || [];
    currentSessionUserBlogs.push(newBlog);
    updatedBlogs[currentSessionUser] = currentSessionUserBlogs;
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    setBlogs(updatedBlogs);
    setTitle("");
    setContent("");
    setImage("");
    setStatus("");
    setReadTime("");
    setError("");
    navigate("/profile");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-4">
        Create a Blog Post
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleFormSubmit}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded mb-2"
          value={title}
        />
        <textarea
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="w-full p-2 border rounded mb-2 h-24"
          value={content}
        ></textarea>
        <input
          onChange={(e) => setImage(e.target.value)}
          type="text"
          placeholder="Image URL"
          className="w-full p-2 border rounded mb-2"
          value={image}
        />
        <input
          onChange={(e) => setReadTime(e.target.value)}
          type="text"
          placeholder="Read time..."
          className="w-full p-2 border rounded mb-2"
          value={readTime}
        />
        <select
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          value={status}
        >
          <option value="">Select a Category</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
