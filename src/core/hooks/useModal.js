import { useState } from 'react';

const useModal = () => {                                                                                // Custom hook for managing modal state
    const [isShownModal, setIsShownModal] = useState(false);                                            // State variable to track whether the modal is shown or hidden
    const toggleModal = () => {                                                                         // Function to toggle the visibility of the modal
        setIsShownModal(!isShownModal);
    };

    return [isShownModal, toggleModal];                                                                 // Return an array containing the current modal state and the function to toggle the modal
};

export { useModal };