import { baseServerUrl } from "../environments/serverEndpoints.js";

const requestHandler = async (method, endpoint, token, data) => {
    const url = baseServerUrl + endpoint;                                                               // Url to request server
    const options = {                                                                                   // Fetch options
        method,
        headers: {},
    };

    if (data instanceof FormData) {                                                                     // Use to sent multipart form data to the server
        options.body = data;                                                                            // Without adding any additional Content-Type
    } else if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    if (token) {                                                                                        // Check for token
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, options);                                                         // Create a request to the server
    if (response.ok === false) {                                                                        // Check if the response is correct
        const error = await response.json();                                                            // The error that occurs must be caught in the component
        throw error;
    }

    return response.json();                                                                             // Return data to the component
};

export { requestHandler };