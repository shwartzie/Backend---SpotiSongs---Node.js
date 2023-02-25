CREATE TABLE users(
	uid SERIAL PRIMARY KEY,
	username: VARCHAR(255),
	fullname VARCHAR(24),
	password VARCHAR(24),
	email VARCHAR(255),
	likedSongs JSON[]
);