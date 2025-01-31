import { createContext, useContext, useState } from "react";

const LikedBlogContext = createContext();

export function useLikedBlogs(){
    return useContext(LikedBlogContext);
}

export function LikedBlogsProvider({children}){
    const [allUserslikedBlogs, setAllUsersLikedBlogs] = useState(JSON.parse(localStorage.getItem("allUsersLikedBlogs")) || {});

    return (
        <LikedBlogContext.Provider value={{allUserslikedBlogs, setAllUsersLikedBlogs}}>
            {children}
        </LikedBlogContext.Provider>
    );
}