CREATE TABLE pets (
  id serial PRIMARY KEY,
  name text NOT NULL,
  age INTEGER NOT NULL,
  species text NOT NULL
);

INSERT INTO pets (name, age, species) VALUES
    ('Gunde', 3, 'Swan'),
    ('Hugo', 2, 'Horse'),
    ('Sven', 1, 'Parrot'), 
    ('Britt-Marie', 1, 'Rabbit');