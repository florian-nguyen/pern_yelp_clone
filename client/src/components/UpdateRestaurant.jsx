import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import { useHistory } from 'react-router';

const UpdateRestaurant = (props) => {
    let history = useHistory();
    const { id } = useParams();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");

    const [priceRange, setPriceRange] = useState("Price Range");

    const { restaurants } = useContext(RestaurantsContext);

    useEffect(() => {
        const fetchData = async () => {
            const response = await RestaurantFinder.get(`/${id}`);

            setName(response.data.data.restaurant.name);
            setLocation(response.data.data.restaurant.location);
            setPriceRange(response.data.data.restaurant.price_range);

        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range: priceRange,
        });
        history.push("/");
    };

    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="form-control" type="text" />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        id="location"
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
                        className="form-control" type="text" />
                </div>

                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <select
                        name="price_range"
                        onChange={(e) => setPriceRange(e.target.value)}
                        value={priceRange}
                        id="price_range"
                        className="form-control">
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>

                <button onClick={handleSubmit} type="submit" className="btn btn-primary" > Submit</button>
            </form>
        </div>
    );
};

export default UpdateRestaurant;;
