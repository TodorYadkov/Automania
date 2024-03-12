import { useContext } from "react";

import { CarContext } from "../contexts/CarContext.jsx";

const useCarContext = () => {                                                                           // Custom hook to access the CarContext
    const context = useContext(CarContext);                                                             // Use useContext to get the current context value from CarContext
    return context;                                                                                     // Return the context value
};

export { useCarContext };