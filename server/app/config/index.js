const env = process.env.NODE_ENV || 'development';

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
