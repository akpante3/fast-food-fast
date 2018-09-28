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
  foodId serial NOT NULL primary key on delete cascade,
  food text not null,
  price varchar(15) not null,
);

CREATE TABLE IF NOT EXISTS orders
(
  quantity integer not null,
  id serial NOT NULL primary key on delete cascade,
  timeOrdered varchar(50) not null,
  foodid integer not null REFERENCES menu(foodId),
  userid integer not null REFERENCES users(id),
  address varchar(225) not null,
  email varchar(50) not null,
  orderid varchar(225) not null,
  status varchar(15) not null

);


