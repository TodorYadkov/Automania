import { createContext } from 'react';

import { useLocalStorage } from '../hooks/useLocalStorage.js';

const AuthContext = createContext(null);                                                                // Create AuthContext

const AuthContextProvider = ({ children }) => {                                                         // Create an AuthContextProvider to manage authentication state
    const localStorageManager = useLocalStorage();                                                      // Use custom hook to interact with localStorage
    const { setUserData, removeUserData, getUserData, currentUserData } = localStorageManager;          // Destructure required functions and data from localStorage hook

    const token = currentUserData?.token || getUserData()?.token;                                       // Extract token from local state or from localStorage                                   
    const userId = currentUserData?.userId || getUserData()?.userId;                                    // Extract userId from local state or from localStorage
    const fullName = currentUserData?.fullName || getUserData()?.fullName;                              // Extract fullName from local state or from localStorage    

    const contextValues = {                                                                             // Construct context values object with authentication-related data and functions
        getToken: token,
        getName: fullName,
        getUserId: userId,
        getUserData: currentUserData || getUserData(),
        isLoggedIn: !!token,
        addLocalStorageData: (userData) => setUserData(userData),
        clearLocalStorageData: () => removeUserData(),
    };

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };