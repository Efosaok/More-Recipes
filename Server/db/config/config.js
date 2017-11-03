require('dotenv').config();

module.exports = {
  development: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.USERNAME,
    host: 'babar.elephantsql.com',
    dialect: 'postgres',
    port: 5432,
  },
  production: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.USERNAME,
    host: 'babar.elephantsql.com',
    dialect: 'postgres',
  },
};
