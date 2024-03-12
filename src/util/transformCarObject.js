const transformCarObject = (obj) => {
    const newObj = { ...obj };                                                                          // Create a shallow copy of the input object
    newObj.mainPhoto = [transformPhotoUrl(newObj.mainPhoto)];                                           // Transform the mainPhoto property

    if (newObj.additionalPhotos && newObj.additionalPhotos.length > 0) {                                // Transform the additionalPhotos property if it's not empty
        newObj.additionalPhotos = newObj                                                                // Transform the additionalPhotos property by mapping each URL to an object and add new property originalUrl
            .additionalPhotos
            .map(urlString => ({ ...transformPhotoUrl(urlString), originalUrl: urlString }));
    }

    return newObj;
}

// Example input: 'https://dev-fidweb.s3.eu-central-1.amazonaws.com/automania/cgNTe0mOD-7wIbxQui2Lr-Group%2019448.png';
// Example output: Group 19448.png
const transformPhotoUrl = (url) => {
    const lastPart = url.split('/').slice(-1)[0];                                                       // Extract the last part of the URL
    const fileNameWithExtension = lastPart.split('-').slice(-1)[0];                                     // Extract the part after the last hyphen
    const decodedName = decodeURIComponent(fileNameWithExtension);                                      // Decode the file name

    return { name: decodedName };
};

export { transformCarObject };