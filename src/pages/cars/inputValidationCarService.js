const carFormKeys = {
    brand: 'brand',
    model: 'model',
    price: 'price',
    mainPhoto: 'mainPhoto',
    additionalPhotos: 'additionalPhotos',
};

// Function to validate file size
const validateFileSize = (file) => {
    const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB
    return file.size <= maxSizeInBytes;
};

// Function to validate file type
const validateFileType = (file) => {
    // Allowed file types
    const allowedTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
    return allowedTypes.includes(file.type);
};

// Function to check if a file is already uploaded
const isAlreadyUploaded = (currentFilesArr, alreadyUploadedFilesArr) => {
    return currentFilesArr.some(currentFile => {
        // Check if any file in the current array has the same name as any file in the already uploaded array
        return alreadyUploadedFilesArr.some(alreadyUploadedFile => currentFile.name === alreadyUploadedFile?.name);
    });
};

const inputValidationCarService = (inputName, inputValue, event, formValues) => {
    // Validate brand
    if (inputName === carFormKeys.brand) {
        if (inputValue === '') {
            return { [inputName]: 'Brand is required' };
        }

        if (inputValue.length > 50) {
            return { [inputName]: 'Brand must be less than 50 characters' };
        }

        return { [inputName]: '' };
    }
    // Validate model
    if (inputName === carFormKeys.model) {
        if (inputValue === '') {
            return { [inputName]: 'Model is required' };
        }

        if (inputValue.length > 50) {
            return { [inputName]: 'Model must be less than 50 characters' };
        }

        return { [inputName]: '' };
    }
    // Validate price
    if (inputName === carFormKeys.price) {
        if (inputValue === '') {
            return { [inputName]: 'Price is required' };
        }

        if (isNaN(inputValue)) {
            return { [inputName]: 'Price must be a number' };
        }

        if (inputValue < 0) {
            return { [inputName]: 'Price must be number bigger from zero' };
        }


        if (inputValue > 9999999) {
            return { [inputName]: 'The price cannot exceed 9999999' };
        }

        return { [inputName]: '' };
    }
    // Validate main photo
    if (inputName === carFormKeys.mainPhoto) {
        const fileObj = event.target.files;
        const file = fileObj[0];

        if (!file) {
            return { [inputName]: 'Please select an image' };
        }

        if (!validateFileType(file)) {
            return { [inputName]: 'Please select the correct file type' };
        }

        if (!validateFileSize(file)) {
            return { [inputName]: 'Please select a smaller file' };
        }

        return { [inputName]: '' };
    }
    // Validate additional photos
    if (inputName === carFormKeys.additionalPhotos) {
        const files = Array.from(event.target.files);
        const alreadyUploadedFilesArr = formValues[carFormKeys.additionalPhotos];

        if (isAlreadyUploaded(files, alreadyUploadedFilesArr)) {
            return { [inputName]: 'File is already uploaded' };
        }

        if (files.some(file => !validateFileType(file))) {
            return { [inputName]: 'Please select the correct file type' };
        }

        if (files.some(file => !validateFileSize(file))) {
            return { [inputName]: 'Please select a smaller file' };
        }

        return { [inputName]: '' };
    }
};

export { inputValidationCarService, carFormKeys };