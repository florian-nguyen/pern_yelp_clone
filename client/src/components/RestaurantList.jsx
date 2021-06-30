import React, { useEffect, useContext } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useHistory } from 'react-router-dom';
import StarRating from './StarRating';

const RestaurantList = (props) => {

    const { restaurants, setRestaurants } = useContext(RestaurantsContext);
    let history = useHistory();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/"); // Added to the end of baseURL defined in RestaurantFinder

                setRestaurants(response.data.data.restaurants);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    // let history = useHistory();

    const handleUpdate = (e, id) => {
        // To prevent propagating the click event to the parent component, which would send redirect us on the detail page of the restaurant
        e.stopPropagation();

        history.push(`/restaurants/${id}/update`);
    };

    const handleDelete = async (e, id) => {
        try {

            e.stopPropagation();

            await RestaurantFinder.delete(`/${id}`);
            setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleRestaurantSelect = id => {
        history.push(`/restaurants/${id}`);
    };

    const renderRating = (restaurant) => {

        if (!restaurant.count) {
            return <span className="text-warning">0 reviews</span>
        }
        return (
            <div className="d-flex justify-content-center align-items-center">
                <StarRating rating={restaurant.average_rating} />
                <span className="text-warning px-2 fw-bolder">{restaurant.count}</span>
            </div>
        );
    };

    return (
        <div className="list-group">
            <table className="table table-dark table-hover">
                <thead>
                    <tr className="fw-bolder text-center">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>

                <tbody>
                    { // Check that the restaurants variable is loaded before using map
                        restaurants && restaurants.map(restaurant => {
                            return (
                                <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                                    <td className="text-center">{restaurant.name}</td>
                                    <td className="text-center">{restaurant.location}</td>
                                    <td className="text-center">{"$".repeat(restaurant.price_range)}</td>
                                    <td className="text-center">
                                        {
                                            renderRating(restaurant)
                                        }
                                    </td>
                                    <td className="text-center">
                                        <button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button>
                                    </td>
                                    <td className="text-center">
                                        <button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default RestaurantList;
