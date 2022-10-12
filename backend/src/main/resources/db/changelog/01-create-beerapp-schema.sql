--liquibase formatted sql

--changeset rozbergs@gmail.com:1 runAlways:true
DROP TABLE IF EXISTS beer_flavours;
DROP TABLE IF EXISTS beers;
DROP TABLE IF EXISTS flavours;
DROP TABLE IF EXISTS manufacturers;
DROP TABLE IF EXISTS origin_countries;
DROP TABLE IF EXISTS beer_types;

CREATE TABLE flavours (
   id BIGINT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(63) NOT NULL
);

CREATE TABLE manufacturers (
   id BIGINT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(127) NOT NULL,
   description VARCHAR(511),
   image_link VARCHAR(511)
);

CREATE TABLE origin_countries (
   id BIGINT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(63) NOT NULL,
   description VARCHAR(511)
);

CREATE TABLE beer_types (
   id BIGINT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(63) NOT NULL,
   description VARCHAR(511)
);

CREATE TABLE beers (
   id BIGINT AUTO_INCREMENT PRIMARY KEY,
   beer_type_id BIGINT NOT NULL,
   origin_country_id BIGINT NOT NULL,
   manufacturer_id BIGINT NOT NULL,
   name VARCHAR(63) NOT NULL,
   description VARCHAR(511),
   image_link VARCHAR(511),
   is_craft BOOLEAN NOT NULL,
   abv REAL NOT NULL,
   average_rating REAL,
   bitterness REAL,
   colour REAL,
   wort_density REAL,
   lower_serve_temperature INT,
   higher_serve_temperature INT,
   FOREIGN KEY(beer_type_id) REFERENCES beer_types(id) ON DELETE CASCADE,
   FOREIGN KEY(origin_country_id) REFERENCES origin_countries(id) ON DELETE CASCADE,
   FOREIGN KEY(manufacturer_id) REFERENCES manufacturers(id) ON DELETE CASCADE
);

CREATE TABLE beer_flavours (
   id BIGINT AUTO_INCREMENT PRIMARY KEY,
   beer_id BIGINT NOT NULL,
   flavour_id BIGINT NOT NULL,
   FOREIGN KEY(beer_id) REFERENCES beers(id) ON DELETE CASCADE,
   FOREIGN KEY(flavour_id) REFERENCES flavours(id) ON DELETE CASCADE
);
--rollback DROP TABLE beer_flavours; 
--rollback DROP TABLE beers;
--rollback DROP TABLE flavours; 
--rollback DROP TABLE manufacturers; 
--rollback DROP TABLE origin_countries; 
--rollback DROP TABLE beer_types; 
