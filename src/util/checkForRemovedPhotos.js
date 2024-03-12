const checkForRemovedPhotos = (currentData, newData) => {
    const newFiles = [];                                                                                // Declare a newFiles array to store only image files
    const unchangedData = [];                                                                           // Declare a unchangedData array to store url string

    if (currentData.length !== 0) {
        currentData.forEach(urlString => {                                                              // Loop through the currentData to check each value
            newData.forEach(objectData => {                                                             // Loop through the newData to check each value
                if (urlString === objectData?.originalUrl) {                                            // Get only available url
                    unchangedData.push(urlString);

                } else if (objectData instanceof File & !newFiles.includes(objectData)) {               // Get only unique new added image files
                    newFiles.push(objectData);
                }
            });
        });

    } else if (newData.length !== 0) {                                                                  // Catch the case when the user not have old additional photo but add new one                                                      
        newData.forEach(file => newFiles.push(file));
    }

    return { unchangedData, newFiles };
};

export { checkForRemovedPhotos }