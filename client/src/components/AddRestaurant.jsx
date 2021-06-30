import React, { useState, useContext } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {

    const { addToRestaurants } = useContext(RestaurantsContext);

    const [name, setName] = useState("");
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState("Price Range");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post("/", {
                name,
                location,
                price_range: priceRange,
            });

            addToRestaurants(response.data.data.restaurant);

        } catch (error) {

        }

    };

    return (
        <div className="mb-4">
            <form action="" className="container p-0">
                <div className="form-group row align-items-center justify-content-between">
                    <div className="col">
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="Name" />
                    </div>

                    <div className="col">
                        <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control" placeholder="Location" />
                    </div>

                    <div className="col">
                        <select value={priceRange} onChange={e => setPriceRange(e.target.value)} className="form-select">
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>

                    <div className="col">
                        <button onClick={handleSubmit} className="btn btn-primary w-100">Add</button>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default AddRestaurant;
