import { createContext, useContext, useState } from "react";

const FavouriteBlogsContext = createContext();

// Create a custom hook to use the context
export function useFavouriteBlogs() {
  return useContext(FavouriteBlogsContext);
}

export function FavouriteBlogsProvider({ children }) {
  const [allUsersFavouriteBlogs, setAllUsersFavouriteBlogs] = useState(JSON.parse(localStorage.getItem("allUsersFavouriteBlogs")) || {});

  return (
    <FavouriteBlogsContext.Provider value={{ allUsersFavouriteBlogs, setAllUsersFavouriteBlogs }}>
      {children}
    </FavouriteBlogsContext.Provider>
  );
}
