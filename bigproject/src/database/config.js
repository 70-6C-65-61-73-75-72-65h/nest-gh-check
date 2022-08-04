require('dotenv').config();
console.log(process.env.POSTGRES_PASSWORD);
module.exports = {
  development: {
    dialect: process.env.POSTGRES_DIALECT,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  production: {
    dialect: process.env.POSTGRES_DIALECT,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
};
