 CREATE TABLE IF NOT EXISTS users
(
id serial primary key,
email text not null unique,
password text not null,
name text not null,
address text not null
);

CREATE TABLE IF NOT EXISTS menu
(
  foodId serial NOT NULL primary key,
  food text not null
);

CREATE TABLE IF NOT EXISTS orders
(
  quantity integer not null,
  id serial NOT NULL primary key,
  timeOrdered character(50) not null,
  foodId integer not null REFERENCES menu(foodId),
  userid integer not null REFERENCES users(id),
  address character(225) not null,
  email character(50) not null,
  orderid character(225) not null,
  status character(15) not null

);


