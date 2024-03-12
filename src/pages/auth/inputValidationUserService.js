import { emailPattern, fullNamePattern } from "../../core/environments/constants.js";

const userFormKeys = {
    email: 'email',
    password: 'password',
    fullName: 'fullName',
};

const inputValidationUserService = (inputName, inputValue) => {
    // Validate email
    if (inputName === userFormKeys.email) {
        if (inputValue === '') {
            return { [inputName]: 'Email is required' };
        }

        if (emailPattern.test(inputValue) === false) {
            return { [inputName]: 'Email is invalid' };
        }

        return { [inputName]: '' };
    }
    // Validate password
    if (inputName === userFormKeys.password) {
        if (inputValue === '') {
            return { [inputName]: 'Password is required' };
        }

        if (inputValue.length < 6) {
            return { [inputName]: 'Password must be at least six characters long' };
        }

        return { [inputName]: '' };
    }
    // Validate full name
    if (inputName === userFormKeys.fullName) {
        if (inputValue === '') {
            return { [inputName]: 'Full name is required' };
        }

        if (fullNamePattern.test(inputValue) === false) {
            return { [inputName]: 'Please fill only first and last name' };
        }

        return { [inputName]: '' };
    }
};

export { inputValidationUserService, userFormKeys };