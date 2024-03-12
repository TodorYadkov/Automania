const baseServerUrl = 'https://automania.herokuapp.com';

const serverEndpoints = {
    register: '/user/register',
    login: '/user/login',
    logout: '/user/logout',
    userCheck: '/user/check',
    createCar: '/listing/create',
    getAllCars: '/listing/list',
    getOneCar: (carId) => `/listing/${carId}`,
    editCar: (carId) => `/listing/${carId}`,
    deleteCar: (carId) => `/listing/${carId}`,
    uploadImage: '/file/upload',
};

export {
    baseServerUrl,
    serverEndpoints,
}