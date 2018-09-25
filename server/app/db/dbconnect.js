
const options = {
  promiseLib: promise,
};

const pg = pgp(options);
const connectionString = env.DATABASE_URL;
const db = pg(connectionString);
const scriptPath = path.join(__dirname, 'schema.sql');

const file = new QueryFile(scriptPath);

db.none(file)
  .then(() => console.log('successfully created dabatase'));
export default db;
