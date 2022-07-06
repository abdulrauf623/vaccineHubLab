CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY ,
    password   TEXT NOT NULL, 
    first_name TEXT NOT NULL UNIQUE, 
    last_name TEXT NOT NULL
);