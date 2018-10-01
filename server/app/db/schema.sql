 CREATE TABLE IF NOT EXISTS users
(
id serial primary key,
email varchar(80) not null unique,
password varchar(80) not null,
name varchar(80) not null,
address varchar(150) not null
);

CREATE TABLE IF NOT EXISTS menu
(
  foodId serial NOT NULL primary key,
  food text not null,
  price varchar(15) not null
);

CREATE TABLE IF NOT EXISTS orders
(
  quantity integer not null,
  id serial NOT NULL primary key,
  timeOrdered varchar(50) not null,
  foodid integer not null REFERENCES menu(foodId) on delete cascade,
  userid integer not null REFERENCES users(id) on delete cascade,
  address varchar(225) not null,
  email varchar(50) not null,
  orderid varchar(225) not null,
  status varchar(15) not null

);


