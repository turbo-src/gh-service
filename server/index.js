const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { db } = require("./db");
require("dotenv").config();

const {
  createIssue,
  getIssueID,
  getTsrcID,
} = require("../lib");

var schema = buildSchema(`
  type Query {
    createIssue(repo: String, tsrc_id: String, issue_id: String): String,
    getIssueID(repo: String, tsrc_id: String,): String,
    getTsrcID(repo: String, issue_id: String): String,
  }
`);

var root = {
  createIssue: async (args) => {
    return await createIssue(
      args.repo,
      args.issue_id,
      args.tsrc_id
    );
  },
  getIssueID: async (args) => {
    let issueID = await getIssueID(
      args.repo,
      args.tsrc_id
    );
    return issueID;
  },
  getTsrcID: async (args) => {
    return await getTsrcID(
      args.repo,
      args.issue_id,
    );
  },
};

const port = process.env.PORT || 4004;

const app = express();

app.listen(port);
console.log(
  `Namespace Server: Running a GraphQL API server on port ${port}/graphql`
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

try {
  //Will delete data delete data from db on npm start:
  db.sync({ force: true });

  //Will not delete data from db on npm start:
  // db.sync();

  db.authenticate();
  console.log(
    "Connection to the Postgres database has been established successfully."
  );
} catch (error) {
  console.error("Unable to connect to the Postgres database:", error);
}
