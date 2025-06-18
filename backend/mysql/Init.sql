-- File to Initialize the MySQL database if it hasn't been initialized yet.
CREATE DATABASE IF NOT EXISTS np_dater;
USE np_dater;

CREATE TABLE IF NOT EXISTS Puzzles (
    puzzle_name VARCHAR(255) PRIMARY KEY,
    puzzle_type INT NOT NULL, -- 0 for grid, 1 for hex. 
    puzzle_data JSON NOT NULL,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);