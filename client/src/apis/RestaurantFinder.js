import axios from 'axios';

// use proxy

const baseURL =
    process.env.NODE_ENV === "production"
        ? "/api/v1/restaurants"
        : `http://localhost:${process.env.PORT || 8080}/api/v1/restaurants`

export default axios.create({
    baseURL,
});