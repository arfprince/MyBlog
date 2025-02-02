import { createContext, useContext, useState } from "react";

const BlogsContext = createContext();

// Create a custom hook to use the context
export function useBlogs() {
  return useContext(BlogsContext);
}

export function BlogsProvider({ children }) {
  const [blogs, setBlogs] = useState(JSON.parse(localStorage.getItem("blogs")) || {});
  const [singleDetailedBlog,setSingleDetailedBlog] =  useState({});
  return (
    <BlogsContext.Provider value={{ blogs, setBlogs, singleDetailedBlog, setSingleDetailedBlog}}>
      {children}
    </BlogsContext.Provider>
  );
}
