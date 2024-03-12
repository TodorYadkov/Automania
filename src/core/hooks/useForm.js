import { useEffect, useState } from "react";

const useForm = (submitHandler, validateFunction, initialValues) => {                                   // useForm hook is for managing form state, validation and data submission
    const [formValues, setFormValues] = useState(initialValues);                                        // Initial values for form inputs                                      
    const [formErrorMessage, setFormErrorMessage] = useState({});                                       // Object containing validation errors                                     
    const [isInvalidForm, setIsInvalidForm] = useState(true);

    useEffect(() => {                                                                                   // Effect to validate form when form error messages change                                                                                 
        validateForm();                                                                                 // Function to validate form inputs

    }, [formErrorMessage]);

    const onChange = (e) => {                                                                           // Function to handle input changes
        const name = e.target.name;
        const value = e.target.value;

        if (e.target.files) {                                                                           // If input is a file input, validate and update form values accordingly
            const currentErrors = validateFunction(name, value, e, formValues);
            setFormErrorMessage((state) => ({ ...state, ...currentErrors }));
            validateForm();

            if (Object.values(currentErrors).some(e => e === '')) {
                setFormValues((state) => ({ ...state, [name]: [...state[name], ...e.target.files] }));
            }
        } else {
            setFormValues((state) => ({ ...state, [name]: value }));
        }
    };

    const onBlur = (e) => {                                                                             // Function to handle input blur events validate input field
        const name = e.target.name;
        const value = typeof e.target.value === 'string' ? e.target.value.trim() : e.target.value;

        const currentErrors = validateFunction(name, value, e, formValues);
        setFormErrorMessage((state) => ({ ...state, ...currentErrors }));
        validateForm();
    };

    const onFocus = (e) => {                                                                            // Function to handle input focus events and clear error state
        const name = e.target.name;

        setFormErrorMessage((state) => ({ ...state, [name]: '' }));
        validateForm();
    };

    const validateForm = () => {                                                                        // Function to update form validity
        setIsInvalidForm(
            Object.values(formValues).some(value => value === '') ||
            Object.values(formErrorMessage).some(error => error)
        );
    };

    const formReset = () => {                                                                           // Function to reset form values to initial state
        setFormValues(initialValues);
        validateForm();
    };

    const onSubmit = (e) => {                                                                           // Function to handle form submission
        e.preventDefault();
        const trimmedValues = Object.entries(formValues).reduce((acc, [key, value]) => {
            acc[key] = typeof value === 'string' ? value.trim() : value;
            return acc;
        }, {});

        submitHandler(trimmedValues);
    };

    const onDeleteImage = (name, index) => {                                                            // Function to delete an image from the form values
        setFormValues((state) => ({
            ...state,
            [name]: state[name].filter((_, i) => i !== index),
        }));
    };

    const setInitialValues = (newValues) => {                                                           // Set initial values if is needed from component
        setFormValues(newValues);
    };

    return {
        formValues,
        formErrorMessage,
        isInvalidForm,
        formReset,
        onChange,
        onBlur,
        onFocus,
        onSubmit,
        onDeleteImage,
        setInitialValues,
    };
}

export { useForm };