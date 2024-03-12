import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext.jsx";

const useAuthContext = () => {                                                                          // Custom hook to access the AuthContext
    const context = useContext(AuthContext);                                                            // Use useContext to get the current context value from AuthContext
    return context;                                                                                     // Return the context value
};

export { useAuthContext };