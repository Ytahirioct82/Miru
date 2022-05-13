DROP DATABASE IF EXISTS miru_db;

CREATE DATABASE miru_db;

\c miru_db;

CREATE TABLE activity (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    street_address TEXT,
    city TEXT,
    state TEXT,
    zip_code INT,
    category TEXT,
    image TEXT
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    activity_id INT,
    name TEXT,
    comment TEXT,
    FOREIGN KEY (activity_id) REFERENCES activity(id)
);

