require('dotenv').config();

console.log(process.env.USERNAME)
console.log(process.env.PASSWORD)
module.exports = {
  development: {
    username: 'pggcvpyn',
    password: '_yFVWCbs1T_z9tLYys68q-lmhRoAhYm9',
    database: 'pggcvpyn',
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
