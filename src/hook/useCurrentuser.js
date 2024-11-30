import { useEffect, useState } from "react";
import { decodeToken } from "../helpers/decodeToken";

const useCurrentUser = () => {
    const [userData, setUserData] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const updateUserData = () => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            const { decoded } = decodeToken(token);
            setUserData(decoded);
            setAccessToken(token);
        } else {
            setUserData(null);
            setAccessToken(null);
        }
    };

    useEffect(() => {
        updateUserData();

        // Listen to storage changes
        const handleStorageChange = () => {
            updateUserData();
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return {
        name: userData?.name,
        role: userData?.role,
        token: accessToken,
    };
};

export default useCurrentUser;
