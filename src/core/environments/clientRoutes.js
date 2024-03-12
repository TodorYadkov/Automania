const clientRoutes = {
    main: '/',
    register: '/register',
    login: '/login',
    catalog: '/catalog',
    addCar: '/add-car',
    editCarMainRoute: '/edit-car/:carId',
    editCarComponentRoute: (carId) => `/edit-car/${carId}`,
    notFound404: '*',
};

export { clientRoutes };