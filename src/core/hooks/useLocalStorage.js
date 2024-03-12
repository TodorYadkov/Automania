import { useState } from "react";

import { localStorageKey } from "../environments/constants.js";

const useLocalStorage = () => {                                                                         // Custom hook for interacting with localStorage
    const [currentUserData, setCurrentUserData] = useState(() => (                                      // Use useState to manage current user data stored in localStorage
        JSON.parse(localStorage.getItem(localStorageKey))
    ));

    const setUserData = (userData) => {                                                                 // Function to set user data in localStorage
        const { token, user: { _id, fullName } } = userData;                                            // Extract necessary data from userData object
        const localStorageData = { token, fullName, userId: _id };

        localStorage.setItem(localStorageKey, JSON.stringify(localStorageData));                        // Store user data in localStorage
        setCurrentUserData(localStorageData);                                                           // Update current user data state
    };

    const removeUserData = () => {                                                                      // Function to remove user data from localStorage
        localStorage.removeItem(localStorageKey);                                                       // Clear user data from localStorage
        setCurrentUserData(null);                                                                       // Set current user data state to null
    };

    const getUserData = () => {                                                                         // Function to retrieve user data from localStorage
        const userData = JSON.parse(localStorage.getItem(localStorageKey));                             // Retrieve user data from localStorage
        return userData;
    };

    return {
        currentUserData,
        setUserData,
        removeUserData,
        getUserData,
    };
};

export { useLocalStorage };