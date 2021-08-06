BEGIN TRANSACTION;

INSERT into users (name, email,entries,joined, pet, age) values('John', 'john@gmail.com', 5, '2021-07-07', 'cat', 28);
INSERT into login (hash, email) values('$2a$10$CwdNGGM.Nf3LvZy.raFQJugJ6Bw6ZZd8SpWqC9ywmpJKDUogHPkFS', 'john@gmail.com');

COMMIT;