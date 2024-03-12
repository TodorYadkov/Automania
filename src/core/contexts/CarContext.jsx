import { createContext, useReducer } from "react";

import { ActionTypes, initialState, reducer } from "../reducers/carReducer.js";

const CarContext = createContext(null);                                                                 // Create a CarContext

const CarContextProvider = ({ children }) => {                                                          // Create a CarContextProvider to manage car-related state
    const [carState, dispatch] = useReducer(reducer, initialState);                                     // Use useReducer to manage state and actions with the carReducer

    const setAllCars = (data) => dispatch({ type: ActionTypes.ALL_CARS, data });                        // Define functions to dispatch actions to modify car state

    const addNewCar = (carData) => dispatch({ type: ActionTypes.ADD_CAR, data: carData });

    const editCar = (carData) => dispatch({ type: ActionTypes.UPDATE_CAR, data: carData });

    const deleteCar = (carData) => dispatch({ type: ActionTypes.DELETE_CAR, data: carData });

    const addAllCarsCount = (count) => dispatch({ type: ActionTypes.ALL_CARS_COUNT, data: count });

    const incrementCarsCount = () => dispatch({ type: ActionTypes.INCREMENT_CARS_COUNT });

    const decrementCarsCount = () => dispatch({ type: ActionTypes.DECREMENT_CARS_COUNT });

    const contextValues = {                                                                             // Construct context values object with state and action functions
        carState,
        setAllCars,
        addNewCar,
        editCar,
        deleteCar,
        addAllCarsCount,
        incrementCarsCount,
        decrementCarsCount,
    };

    return (
        <CarContext.Provider value={contextValues}>
            {children}
        </CarContext.Provider>
    );
};

export { CarContext, CarContextProvider };