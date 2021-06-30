import axios from 'axios';

// use proxy

export default axios.create({
    baseURL: "/api/v1/restaurants",
});