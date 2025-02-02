import { useLikedBlogs } from "../context/UsersLikedBlogContext";
import RanderLiked from "../components/userElements/lastTenLikes/randerLiked";

export default function LastTenLikes() {
  let userLastTenLikedBlogs = [];
  const currentSessionUser = JSON.parse(
    localStorage.getItem("currentSessionUser")
  );
  const { allUserslikedBlogs } = useLikedBlogs();

  if (
    allUserslikedBlogs[currentSessionUser] &&
    allUserslikedBlogs[currentSessionUser].length <= 10
  ) {
    userLastTenLikedBlogs = allUserslikedBlogs[currentSessionUser];
  } else if (allUserslikedBlogs[currentSessionUser]) {
    userLastTenLikedBlogs = allUserslikedBlogs[currentSessionUser].slice(-10);
  }

  return (
    <div className="w-2/3 mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        My liked Blogs
      </h2>

      {userLastTenLikedBlogs?.length > 0 ? (
        userLastTenLikedBlogs.map((blog, index) => (
          <RanderLiked blog={blog} key={index} />
        ))
      ) : (
        <p className="text-gray-500 text-center mt-4">
          No liked blogs added yet.
        </p>
      )}
    </div>
  );
}
