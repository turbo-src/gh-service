const { Sequelize } = require("sequelize");
const db = require("../db");

const Repo = db.define("repo", {
  repo_id: {
    type: Sequelize.STRING(),
    isUnique: true,
  },
});

module.exports = Repo;
