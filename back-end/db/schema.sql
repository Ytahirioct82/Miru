DROP DATABASE IF EXISTS miru_db;

CREATE DATABASE miru_db;

\c miru_db;

CREATE TABLE activity (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    street_address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip_code INT NOT NULL,
    category TEXT NOT NULL,
    image TEXT
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    activity_id INT,
    name TEXT,
    comment TEXT,
    FOREIGN KEY (activity_id) REFERENCES activity(id)
);

CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    content TEXT,
    fileName TEXT,
    contentType TEXT,
    length VARCHAR,
    activity_id INT,
    FOREIGN KEY (activity_id) REFERENCES activity(id)
);

