const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise");
require("dotenv").config();

mysql
  .createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  })
  .then((connection) => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`);
  })
  .catch((err) => console.error("Unable to connect to the database:", err));

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Unable to connect to the database:", err));

module.exports = sequelize;
