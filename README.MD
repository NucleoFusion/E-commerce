TO SET UP POSTGRES:-

    1. In Postgres (https://www.postgresql.org/)
        a. Create Database E-comm ( CREATE DATABASE e-comms; )
        b. Create a Table users in E-comm ( CREATE TABLE users (
                                                id SERIAL PRIMARY KEY,
                                                username VARCHAR(50),
                                                email TEXT,
                                                password TEXT
        ); )
        c. Create tabble for product catalog ( CREATE TABLE Product (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50),
            price BIGINT,
            description TEXT,
            Applicable_discounts TEXT
        ); )
        d.Create a table addresses ( CREATE TABLE address (
            id SERIAL PRIMARY KEY,
            cust_id INT REFERENCES users(id),
            Address1 TEXT,
            Address2 TEXT,
            Address3 TEXT,
            Address4 TEXT,
            Address5 TEXT
        ); )
        e.Create Table cart ( CREATE TABLE cart (
            id SERIAL PRIMARY KEY,
            cust_id INT REFERENCES users(id),
            products TEXT
        ); )
    2. Create .env file with environment variables for
        a. Postgres Password => PG_PASS
        b. Postgres Host => PG_HOST
        c. Postgres User => PG_USER
        d. Postgres Port => PG_PORT
        e. Postgres Database => PG_DB
        f. Session Secret => SESSION_SECRET (set to any string for now)
