
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(11)
);

CREATE TABLE "bike" (
    "id" SERIAL PRIMARY KEY,
    "type" VARCHAR
);

CREATE TABLE "dates" (
    "id" SERIAL PRIMARY KEY,
    "dates" DATE
);

CREATE TABLE "user_bike" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user" NOT NULL,
    "bike_id" INT REFERENCES "bike" NOT NULL
);

CREATE TABLE "user_dates" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user" NOT NULL,
    "dates_id" INT REFERENCES "dates" NOT NULL
);

CREATE TABLE "bike_types" (
	"id" SERIAL PRIMARY KEY,
	"type" VARCHAR NOT NULL
);

INSERT INTO "bike_types" ('type')
VALUES ('Mountain'), ('Road'), ('Gravel'), ('BMX'), ('Virtual');