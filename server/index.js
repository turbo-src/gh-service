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
    createIssue(repo: String, issue_id: String, tsrc_id: String): String,
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
    return issueID = await getIssueID(
      args.repo,
      args.tsrc_id
    );
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

// Will clear database data on npm start with {force: true}:
// db.sync({force:true})

// Will NOT clear database data on npm start:
db.sync().then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

