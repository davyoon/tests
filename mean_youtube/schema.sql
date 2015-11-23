DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS pressure;

CREATE TABLE users (
	users_id INTEGER PRIMARY KEY autoincrement, 
	name TEXT,
	password VARCHAR
);

CREATE TABLE pressure (
	pressure_id INTEGER PRIMARY KEY autoincrement,
	systolic INTEGER,
	dystolic INTEGER,
	user_idp INTEGER,
	FOREIGN KEY(user_idp) REFERENCES users(users_id)
);