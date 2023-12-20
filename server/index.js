const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { db } = require("./db");
require("dotenv").config();

const { createIssue, getIssueID, getTsrcID, getGitHubPullRequest } = require("../lib");

var schema = buildSchema(`

type Res {
  status: Int!
  tsrcID: String!
  issueID: String!
  message: String!
}

type GitHubPullRequestHead {
  label: String!
  ref: String!
  sha: String!
}

type GitHubPullRequestBase {
  label: String!
  ref: String!
  sha: String!
}

type GitHubPullRequest {
  status: Int!
  message: String!
  issue_url: String!
  number: Int!
  state: String!
  title: String!
  head: GitHubPullRequestHead!
  base: GitHubPullRequestBase!
  merged: Boolean!
  mergeable: Boolean!
}

  type Query {
    createIssue(repo: String, issue_id: String, tsrc_id: String): Res,
    getIssueID(repo: String, tsrc_id: String,): Res,
    getTsrcID(repo: String, issue_id: String): Res,
    getGitHubPullRequest(owner: String, repo: String, pull: Int, accessToken: String): GitHubPullRequest,
  }
`);

var root = {
	createIssue: async (args) => {
		return await createIssue(args.repo, args.issue_id, args.tsrc_id);
	},
	getIssueID: async (args) => {
		return (issueID = await getIssueID(args.repo, args.tsrc_id));
	},
	getTsrcID: async (args) => {
		return await getTsrcID(args.repo, args.issue_id);
	},
	getGitHubPullRequest: async (args) => {
	  return await getGitHubPullRequest(
			args.owner,
			args.repo,
			args.pull,
			args.accessToken
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
