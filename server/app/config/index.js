const env = process.env.NODE_ENV || 'development';
console.log(process.env.PORT);

module.exports = {
  development: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  test: {
    DATABASE_URL: process.env.DATABASE_URL_TEST,
  },
  production: {
    DATABASE_URL: process.env.DATABASE_URL
  }
}[env];
