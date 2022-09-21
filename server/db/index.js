const db = require("./db");
const Repo = require("./Models/Repos");
const Issue = require("./Models/Issues")

// Associations here
Repo.hasMany(Issue)
Issue.belongsTo(Repo)

module.exports = { db, Repo, Issue };
