import { useBlogs } from "../context/BlogsContext";
import DisplayBlogsOnHome from "./DisplayBlogsOnHome";

export default function Home() {
  const { blogs } = useBlogs();

  // Flatten all blogs into a single array and filter only public blogs
  const allPublicBlogs = Object.values(blogs)
    .flat() 
    .filter(blog => blog.status === "public")
    .sort(() => Math.random() - 0.5); 

  return (
    <div className="text-center mt-10">
      {/* Header */}
      <h2 className="text-4xl font-extrabold text-gray-900">
        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">My Blog</span>
      </h2>
      <p className="text-gray-600 mt-2 text-lg">Explore and share your thoughts with the world.</p>

      {/* Blog Container */}
      <div className="p-8 bg-gray-50 rounded-xl shadow-lg max-w-7xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">All Users' Blogs</h1>

        {allPublicBlogs.length === 0 ? (
          <p className="text-lg text-gray-500 text-center">No blogs available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allPublicBlogs.map((blog, index) => (
              <DisplayBlogsOnHome blog={blog} key={blog.id || index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
