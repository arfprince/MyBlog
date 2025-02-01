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
  const [validationErrors, setValidationErrors] = useState({
    title: "",
    content: "",
    image: "",
    readTime: "",
    status: ""
  });

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "title":
        if (!value.trim()) {
          error = "Title is required";
        } else if (value.length < 3) {
          error = "Title must be at least 3 characters long";
        } else if (value.length > 100) {
          error = "Title must be less than 100 characters";
        }
        break;
      case "content":
        if (!value.trim()) {
          error = "Content is required";
        } else if (value.length < 10) {
          error = "Content must be at least 10 characters long";
        } else if (value.length > 5000) {
          error = "Content must be less than 5000 characters";
        }
        break;
      case "image":
        if (!value.trim()) {
          error = "Image URL is required";
        } else if (!value.match(/^(http|https):\/\/[^ "]+$/)) {
          error = "Please enter a valid image URL";
        }
        break;
      case "readTime":
        if (!value.trim()) {
          error = "Read time is required";
        } else if (isNaN(value) || value <= 0) {
          error = "Read time must be a positive number";
        } else if (value > 120) {
          error = "Read time must be less than 120 minutes";
        }
        break;
      case "status":
        if (!value) {
          error = "Please select a status";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter(value);
    const error = validateField(name, value);
    setValidationErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      title: validateField("title", title),
      content: validateField("content", content),
      image: validateField("image", image),
      readTime: validateField("readTime", readTime),
      status: validateField("status", status)
    };

    setValidationErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== "")) {
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
    setValidationErrors({
      title: "",
      content: "",
      image: "",
      readTime: "",
      status: ""
    });
    navigate("/profile");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-4">
        Create a Blog Post
      </h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <input
            onChange={(e) => handleInputChange(e, setTitle)}
            type="text"
            name="title"
            placeholder="Title"
            className={`w-full p-2 border rounded ${
              validationErrors.title ? 'border-red-500' : ''
            }`}
            value={title}
          />
          {validationErrors.title && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <textarea
            onChange={(e) => handleInputChange(e, setContent)}
            name="content"
            placeholder="Content"
            className={`w-full p-2 border rounded h-24 ${
              validationErrors.content ? 'border-red-500' : ''
            }`}
            value={content}
          ></textarea>
          {validationErrors.content && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.content}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            onChange={(e) => handleInputChange(e, setImage)}
            type="text"
            name="image"
            placeholder="Image URL"
            className={`w-full p-2 border rounded ${
              validationErrors.image ? 'border-red-500' : ''
            }`}
            value={image}
          />
          {validationErrors.image && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.image}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            onChange={(e) => handleInputChange(e, setReadTime)}
            type="text"
            name="readTime"
            placeholder="Read time..."
            className={`w-full p-2 border rounded ${
              validationErrors.readTime ? 'border-red-500' : ''
            }`}
            value={readTime}
          />
          {validationErrors.readTime && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.readTime}</p>
          )}
        </div>

        <div className="mb-4">
          <select
            onChange={(e) => handleInputChange(e, setStatus)}
            name="status"
            className={`w-full p-2 border rounded ${
              validationErrors.status ? 'border-red-500' : ''
            }`}
            value={status}
          >
            <option value="">Select a Category</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          {validationErrors.status && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.status}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}