import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogs } from "../../../context/BlogsContext";

export default function CreateNewBlog() {
  const { blogs, setBlogs } = useBlogs();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");
  const [readTime, setReadTime] = useState("");
  const handleFornSubmit = (e) => {
    e.preventDefault();
    let newBlog = {
      title,
      author,
      content,
      time: new Date().toISOString(),
      image,
      likeCount: 0,
      readTime,
      status,
      id: `${title}${Math.floor((Math.random() * 1000000000) + 1)}`
    };
    console.log(newBlog);
    
    let updatedBlogs = blogs;
    const currentSessionUser = JSON.parse(
      localStorage.getItem("currentSessionUser")
    );
    const currentSessionUserBlogs = updatedBlogs[currentSessionUser] || [];
    currentSessionUserBlogs.push(newBlog);
    updatedBlogs[currentSessionUser] = currentSessionUserBlogs;
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    setBlogs(updatedBlogs);
    setTitle("");
    setContent("");
    setAuthor("");
    setImage("");
    setStatus("");
    navigate("/profile");
  };
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-4">
        Create a Blog Post
      </h2>
      <form onSubmit={handleFornSubmit}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          onChange={(e) => setAuthor(e.target.value)}
          type="text"
          placeholder="Author"
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="w-full p-2 border rounded mb-2 h-24"
        ></textarea>
        <input
          onChange={(e) => setImage(e.target.value)}
          type="text"
          placeholder="Image URL"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          onChange={(e) => setReadTime(e.target.value)}
          type="text"
          placeholder="read time..."
          className="w-full p-2 border rounded mb-2"
        />
        <select
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded mb-2"
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
