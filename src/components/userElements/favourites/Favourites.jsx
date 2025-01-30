import { useFavouriteBlogs } from "../../../context/UsersFavouriteBlogContext";
import RanderFavourites from "./randerFavourites";

export default function Favourites() {
  const { allUsersFavouriteBlogs } = useFavouriteBlogs();
  const currentSessionUser = JSON.parse(localStorage.getItem("currentSessionUser"));

  return (
    <div className="w-2/3 mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        My Favourite Blogs
      </h2>

      {allUsersFavouriteBlogs[currentSessionUser]?.length > 0 ? (
        allUsersFavouriteBlogs[currentSessionUser].map((blog, index) => (
          <RanderFavourites blog={blog} key={index} />
        ))
      ) : (
        <p className="text-gray-500 text-center mt-4">No favourite blogs added yet.</p>
      )}
    </div>
  );
}
