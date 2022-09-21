const { Sequelize } = require("sequelize");

const dbUrl =
  process.env.DATABASE_URL ||
  process.env.DOCKER_DB_URL ||
  "postgres://localhost:5432/gh-service";

const db = new Sequelize(dbUrl, {
  logging: false,
});

module.exports = db;
