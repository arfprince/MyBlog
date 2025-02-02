
import { createContext, useContext, useState, useEffect } from "react";

const UserLoginContext = createContext();

export function useAuth() {
    return useContext(UserLoginContext);
}

export function UserLoginProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(
        () => JSON.parse(localStorage.getItem("isLoggedIn")) || false
    );

    // Ensure localStorage updates whenever isLoggedIn changes
    useEffect(() => {
        localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    return (
        <UserLoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </UserLoginContext.Provider>
    );
}
