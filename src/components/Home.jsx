import { useBlogs } from "../context/BlogsContext";
import DisplayBlogsOnHome from "./DisplayBlogsOnHome";
export default function Home() {
  const { blogs } = useBlogs();

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

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(blogs).map(([username, userBlogs]) => (
        <div key={username} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          {/* blog Section */}
          {userBlogs.map((blog, index) => (
            blog.status==="public" && <DisplayBlogsOnHome blog={blog} index={index} key={index}/>
          ))}
        </div>
      ))}
    </div>
  </div>
</div>

  );
}
