import React, { useState, createContext } from "react";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = props => {

    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const addToRestaurants = (restaurant) => {
        setRestaurants([...restaurants, restaurant]);
    };

    return (
        <RestaurantsContext.Provider
            value={
                {
                    restaurants,
                    setRestaurants,
                    addToRestaurants,
                    selectedRestaurant,
                    setSelectedRestaurant
                }
            }>
            {props.children}
        </RestaurantsContext.Provider>
    );
};