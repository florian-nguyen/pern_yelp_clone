const path = require("path")
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./db/index");

const morgan = require("morgan");
const { response } = require("express");

const app = express();

app.use(morgan("dev"));

app.use(cors());

// Will append the JSON parameters sent by the client to the body as 'req.body'
app.use(express.json());

// Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
	try {
		//const results = await db.query(`SELECT * FROM restaurants ORDER BY name`);
		const restaurantRatingsData = await db.query('SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id=reviews.restaurant_id ORDER BY name')
		res.json({
			status: "success",
			results: restaurantRatingsData.rows.length,
			data: {
				restaurants: restaurantRatingsData.rows,
			},
		});
	} catch (err) {
		console.log(err);
	}
});

// Get a single restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
	console.log(req.params.id);
	try {
		// NEVER USE QUERIES WITH PARAMETERS IN TEMPLATE STRINGS = VULNERABLE TO INJECTION ATTACKS
		// INSTEAD, USE PARAMETRIZED QUERIES LIKE BELOW:
		// const results = await db.query(`SELECT * FROM restaurants WHERE id = ${req.params.id}`);
		// const restaurant = await db.query(`SELECT * FROM restaurants WHERE id = $1`, [
		// 	req.params.id,
		// ]);

		const restaurant = await db.query(`SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id=reviews.restaurant_id WHERE id = $1`, [
			req.params.id,
		]);

		const reviews = await db.query(`SELECT * FROM reviews WHERE restaurant_id = $1`, [
			req.params.id,
		]);

		res.status(200).json({
			status: "success",
			data: {
				restaurant: restaurant.rows[0],
				reviews: reviews.rows,
			},
		});
	} catch (err) {
		console.log(err);
	}
});

// Create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
	try {
		// RETURNING will allow us to retrieve the newly added record from Postgres
		const results = await db.query(
			`INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *`,
			[req.body.name, req.body.location, req.body.price_range],
		);

		res.status(201).json({
			status: "success",
			data: {
				restaurant: results.rows[0],
			},
		});
	} catch (err) {
		console.log(err);
	}
});

// Update restaurants
app.put("/api/v1/restaurants/:id", async (req, res, next) => {
	try {
		const results = await db.query(
			`UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id=$4 RETURNING *`,
			[req.body.name, req.body.location, req.body.price_range, req.params.id],
		);

		res.status(200).json({
			status: "success",
			data: {
				restaurant: results.rows[0],
			},
		});
	} catch (err) {
		console.log(err);
	}
});

// Delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
	try {
		const reviews = await db.query(
			`DELETE FROM reviews WHERE restaurant_id = $1`,
			[req.params.id],
		)

		const results = await db.query(
			`DELETE FROM restaurants WHERE id = $1`,
			[req.params.id],
		);

		res.status(204).json({
			status: "success",
		});
	} catch (err) {
		console.log(err);
	}
});

// Add a new review
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
	try {
		const newReview = await db.query(`INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *`, [req.params.id, req.body.name, req.body.review, req.body.rating])

		res.status(201).json({
			status: "success",
			data: {
				review: newReview.rows[0]
			}
		})
	} catch (error) {
		console.error(error)
	}
})

app.get("*", (req, res) => {
	console.log(__dirname)
	console.log(path.join(__dirname, "client/build/index.html"));
	res.sendFile(path.join(__dirname, "client/build/index.html"));
	res.end();
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`Server running and listening on port ${port}...`);
});

