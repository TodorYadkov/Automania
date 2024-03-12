const ActionTypes = {                                                                                   // ActionTypes object contains action types for car-related actions
    ALL_CARS: 'ALL_CARS',                                                                               // Action type for storing all cars
    ADD_CAR: 'ADD_CAR',                                                                                 // Action type for adding a new car
    UPDATE_CAR: 'UPDATE_CAR',                                                                           // Action type for updating a car
    DELETE_CAR: 'DELETE_CAR',                                                                           // Action type for deleting a car
    ALL_CARS_COUNT: 'ALL_CARS_COUNT',                                                                   // Action type for storing the count of all cars
    INCREMENT_CARS_COUNT: 'INCREMENT_CARS_COUNT',                                                       // Action type for incrementing the count of all cars
    DECREMENT_CARS_COUNT: 'DECREMENT_CARS_COUNT',                                                       // Action type for decrementing the count of all cars
};

const initialState = {                                                                                  // initialState object represents the initial state of the car-related data
    [ActionTypes.ALL_CARS]: [],                                                                         // Initial array to store all cars
    [ActionTypes.ALL_CARS_COUNT]: 0,                                                                    // Initial count of all cars
};

const reducer = (state, action) => {                                                                    // reducer function
    switch (action.type) {
        case ActionTypes.ALL_CARS:
            return { ...state, [action.type]: action.data };
        case ActionTypes.ADD_CAR:
            return { ...state, [ActionTypes.ALL_CARS]: [action.data, ...state[ActionTypes.ALL_CARS]] };
        case ActionTypes.UPDATE_CAR:
            return { ...state, [ActionTypes.ALL_CARS]: state[ActionTypes.ALL_CARS].map(c => c._id === action.data._id ? action.data : c) };
        case ActionTypes.DELETE_CAR:
            return { ...state, [ActionTypes.ALL_CARS]: state[ActionTypes.ALL_CARS].filter(c => c._id !== action.data._id) };
        case ActionTypes.ALL_CARS_COUNT:
            return { ...state, [ActionTypes.ALL_CARS_COUNT]: action.data };
        case ActionTypes.INCREMENT_CARS_COUNT:
            return { ...state, [ActionTypes.ALL_CARS_COUNT]: state[ActionTypes.ALL_CARS_COUNT] + 1 };
        case ActionTypes.DECREMENT_CARS_COUNT:
            return { ...state, [ActionTypes.ALL_CARS_COUNT]: state[ActionTypes.ALL_CARS_COUNT] - 1 };

        default:
            return state;
    }
};

export { ActionTypes, initialState, reducer };