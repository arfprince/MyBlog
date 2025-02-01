import { createContext, useContext, useState } from "react";

const UserLoginContext = createContext();

export function useAuth() {
    return useContext(UserLoginContext);
}

export function UserLoginProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedIn")) || false);
    return (
        <UserLoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </UserLoginContext.Provider>
    );
}

