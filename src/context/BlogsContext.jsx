import { createContext, useContext, useState } from "react";

const BlogsContext = createContext();

// Create a custom hook to use the context
export function useBlogs() {
  return useContext(BlogsContext);
}

export function BlogsProvider({ children }) {
  const [blogs, setBlogs] = useState(JSON.parse(localStorage.getItem("blogs")) || {});

  return (
    <BlogsContext.Provider value={{ blogs, setBlogs }}>
      {children}
    </BlogsContext.Provider>
  );
}
