import { useCallback, useState } from "react";

import { useAuthContext } from "./useAuthContext.js";
import { requestHandler } from "../api/requestHandler.js";

const useApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const { getToken } = useAuthContext();

    const fetchData = useCallback(async (method, endpoint, requestData) => {                            // Use to fetch data from server
        try {                                                                                           // useCallback is used to memoized the function on re-renders
            setIsLoading(true);
            setError(null);
            const response = await requestHandler(method, endpoint, getToken, requestData);             // Call requestHandler to send request to the server
            setData(response);                                                                          // Save data in state to be used in different component
            return response;                                                                            // Return the response data
        } catch (error) {
            setError(error);                                                                            // Set entire error object to be used in component to display error message
            throw error;                                                                                // Throw error to parent component if is needed
        } finally {
            setIsLoading(false);
        }

    }, [getToken]);

    const closeErrorAlertHandler = useCallback(() => setError(null), []);                               // Reset error state to hide error alert

    return {
        isLoading,
        data,
        error,
        closeErrorAlertHandler,
        get: useCallback(async (endpoint) => fetchData('GET', endpoint), [fetchData]),                  // Use to make different request to the server
        post: useCallback(async (endpoint, data) => fetchData('POST', endpoint, data), [fetchData]),    // useCallback is used to avoid creating a new one on each re-render
        put: useCallback(async (endpoint, data) => fetchData('PUT', endpoint, data), [fetchData]),
        delete: useCallback(async (endpoint) => fetchData('DELETE', endpoint), [fetchData])
    };
};

export { useApi };