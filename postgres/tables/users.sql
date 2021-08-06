BEGIN TRANSACTION;

CREATE TABLE users (
  id serial PRIMARY KEY,
  name VARCHAR(100) NULL,
  email text NOT NULL,
  entries bigint default 0,
  joined timestamp  NOT NULL, 
  pet text,
  age smallint default 0
);

COMMIT; 