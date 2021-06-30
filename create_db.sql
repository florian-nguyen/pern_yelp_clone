DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range>=1 and price_range<=5)
);

INSERT INTO restaurants (name, location, price_range)
VALUES 
('Las Vegas Hot Dogs', 'Las Vegas', 5),
('L''aile ou la cuisse', 'Paris', 3),
('Oishi Ya', 'Hongo, Tokyo', 5),
('Hakata Mangestu', 'Ueno, Tokyo', 4),
('La madeleine de Proust', 'Toulouse', 3);

CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating <=5 AND rating >=1)
);

INSERT INTO reviews (restaurant_id, name, review, rating)
VALUES 
(1, 'Bobby', 'Really good!', 5),
(1, 'John', 'Awesome restaurant!', 5),
(2, 'Lydia', 'Not that good!', 2),
(3, 'Laurence', 'Never again!', 1),
(3, 'Caroline', 'Average!', 3),
(3, 'Elsie', 'Tasty!', 4),
(4, 'Jean', 'My new headquarters!', 4),
(4, 'Claude', 'A must try!', 4),
(5, 'Charlotte', 'Nice!', 4),
(1, 'Billie', 'Original recipes!', 4),
(2, 'Donald', 'My new favorite place in town!', 5),
(4, 'Sally', 'Yummy!', 5),
(2, 'Clarke', 'Disgusting!', 1),
(1, 'Dewey', 'Hello World!', 3),
(1, 'Reese', 'I love their hummus!', 3);