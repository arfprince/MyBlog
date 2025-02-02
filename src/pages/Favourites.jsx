import { useFavouriteBlogs } from "../context/UsersFavouriteBlogContext";
import RanderFavourites from "../components/userElements/favourites/randerFavourites";
import { useEffect, useState } from "react";

export default function Favourites() {
  const { allUsersFavouriteBlogs, setAllUsersFavouriteBlogs } =
    useFavouriteBlogs();
  const currentSessionUser = JSON.parse(
    localStorage.getItem("currentSessionUser")
  );
  const [removeFavourite, setRemoveFavourite] = useState(false);
  const [deletedFavBlogId, setDeletedFavBlogId] = useState("");
  useEffect(() => {
    let userFavourites = allUsersFavouriteBlogs[currentSessionUser] || [];
    userFavourites = userFavourites.filter(
      (fav) => fav.id !== deletedFavBlogId
    );
    const updatedFavourites = {
      ...allUsersFavouriteBlogs,
      [currentSessionUser]: userFavourites,
    };
    setAllUsersFavouriteBlogs(updatedFavourites);
    localStorage.setItem(
      "allUsersFavouriteBlogs",
      JSON.stringify(updatedFavourites)
    );
    setRemoveFavourite(false);
    setDeletedFavBlogId("");
  }, [removeFavourite, deletedFavBlogId]);
  return (
    <div className="w-2/3 mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        My Favourite Blogs
      </h2>

      {allUsersFavouriteBlogs[currentSessionUser]?.length > 0 ? (
        allUsersFavouriteBlogs[currentSessionUser].map((blog, index) => (
          <RanderFavourites
            blog={blog}
            key={index}
            setRemoveFavourite={setRemoveFavourite}
            setDeletedFavBlogId={setDeletedFavBlogId}
          />
        ))
      ) : (
        <p className="text-gray-500 text-center mt-4">
          No favourite blogs added yet.
        </p>
      )}
    </div>
  );
}
