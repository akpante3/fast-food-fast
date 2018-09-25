 CREATE TABLE IF NOT EXISTS users
(
id serial primary key,
email text not null unique,
password text not null,
name text not null,
address text not null
);
CREATE TABLE IF NOT EXISTS orders
(
  quantity integer not null,
  id serial NOT NULL primary key,
  user_Id integer not null REFERENCES users(id),
  timeOrdered text not null,
  foodID integer not null
);