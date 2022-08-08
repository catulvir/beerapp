DROP TABLE IF EXISTS beerFlavours;
DROP TABLE IF EXISTS flavours;
DROP TABLE IF EXISTS manufacturers;
DROP TABLE IF EXISTS originCountries;
DROP TABLE IF EXISTS beerTypes;
DROP TABLE IF EXISTS beers;

CREATE TABLE flavours (
   id INT NOT NULL PRIMARY KEY,
   name VARCHAR(32) NOT NULL
);

CREATE TABLE manufacturers (
   id INT NOT NULL PRIMARY KEY,
   name VARCHAR(64) NOT NULL
);

CREATE TABLE originCountries (
   id INT NOT NULL PRIMARY KEY,
   name VARCHAR(32) NOT NULL
);

CREATE TABLE beerTypes (
   id INT NOT NULL PRIMARY KEY,
   name VARCHAR(32) NOT NULL,
   description VARCHAR(64)
);

CREATE TABLE beers (
   id INT NOT NULL PRIMARY KEY,
   beerTypeId INT NOT NULL,
   originCountryId INT NOT NULL,
   name VARCHAR(64) NOT NULL,
   description VARCHAR(64),
   abv INT NOT NULL,
   rating INT,
   bitterness INT,
   colour INT,
   wortDensity INT,
   lowerServeTemperature INT,
   higherServeTemperature INT,
   FOREIGN KEY(beerTypeId) REFERENCES beerTypes(id) ON DELETE CASCADE,
   FOREIGN KEY(originCountryId) REFERENCES originCountries(id) ON DELETE CASCADE
);
