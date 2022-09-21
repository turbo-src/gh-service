const { Sequelize } = require("sequelize");
const db = require("../db");

const Issue = db.define("issue", {
  issue_id: {
    type: Sequelize.STRING(),
  },
  tsrc_id: {
    type: Sequelize.STRING(),
  },
});

module.exports = Issue;
