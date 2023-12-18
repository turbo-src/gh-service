const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { db } = require("./db");
require("dotenv").config();

const { createIssue, getIssueID, getTsrcID } = require("../lib");

var schema = buildSchema(`

type Res {
  status: Int!
  tsrcID: String!
  issueID: String!
  message: String!
}

type GitHubUser {
  login: String!
  id: Int!
  node_id: String!
  avatar_url: String!
  gravatar_id: String!
  url: String!
  html_url: String!
  followers_url: String!
  following_url: String!
  gists_url: String!
  starred_url: String!
  subscriptions_url: String!
  organizations_url: String!
  repos_url: String!
  events_url: String!
  received_events_url: String!
  type: String!
  site_admin: Boolean!
}

type GitHubRepository {
  id: Int!
  node_id: String!
  name: String!
  full_name: String!
  private: Boolean!
  owner: GitHubUser!
  html_url: String!
  description: String
  fork: Boolean!
  url: String!
  forks_url: String!
  keys_url: String!
  collaborators_url: String!
  teams_url: String!
  hooks_url: String!
  issue_events_url: String!
  events_url: String!
  assignees_url: String!
  branches_url: String!
  tags_url: String!
  blobs_url: String!
  git_tags_url: String!
  git_refs_url: String!
  trees_url: String!
  statuses_url: String!
  languages_url: String!
  stargazers_url: String!
  contributors_url: String!
  subscribers_url: String!
  subscription_url: String!
  commits_url: String!
  git_commits_url: String!
  comments_url: String!
  issue_comment_url: String!
  contents_url: String!
  compare_url: String!
  merges_url: String!
  archive_url: String!
  downloads_url: String!
  issues_url: String!
  pulls_url: String!
  milestones_url: String!
  notifications_url: String!
  labels_url: String!
  releases_url: String!
  deployments_url: String!
  created_at: String!
  updated_at: String!
  pushed_at: String!
  git_url: String!
  ssh_url: String!
  clone_url: String!
  svn_url: String!
  homepage: String
  size: Int!
  stargazers_count: Int!
  watchers_count: Int!
  language: String
  has_issues: Boolean!
  has_projects: Boolean!
  has_downloads: Boolean!
  has_wiki: Boolean!
  has_pages: Boolean!
  has_discussions: Boolean!
  forks_count: Int!
  mirror_url: String
  archived: Boolean!
  disabled: Boolean!
  open_issues_count: Int!
  license: GitHubLicense!
  allow_forking: Boolean!
  is_template: Boolean!
  web_commit_signoff_required: Boolean!
  topics: [String!]
  visibility: String!
  forks: Int!
  open_issues: Int!
  watchers: Int!
  default_branch: String!
}

type GitHubLicense {
  key: String!
  name: String!
  spdx_id: String!
  url: String
  node_id: String!
}

type GitHubPullRequestHead {
  label: String!
  ref: String!
  sha: String!
  user: GitHubUser!
  repo: GitHubRepository!
}

type GitHubPullRequestBase {
  label: String!
  ref: String!
  sha: String!
  user: GitHubUser!
  repo: GitHubRepository!
}

type GitHubLinks {
  self: GitHubLink!
  html: GitHubLink!
  issue: GitHubLink!
  comments: GitHubLink!
  review_comments: GitHubLink!
  review_comment: GitHubLink!
  commits: GitHubLink!
  statuses: GitHubLink!
}

type GitHubLink {
  href: String!
}

type GitHubPullRequest {
  url: String!
  id: Int!
  node_id: String!
  html_url: String!
  diff_url: String!
  patch_url: String!
  issue_url: String!
  number: Int!
  state: String!
  locked: Boolean!
  title: String!
  user: GitHubUser!
  body: String!
  created_at: String!
  updated_at: String!
  closed_at: String
  merged_at: String
  merge_commit_sha: String!
  assignee: GitHubUser
  assignees: [GitHubUser!]!
  requested_reviewers: [GitHubUser!]!
  draft: Boolean!
  commits_url: String!
  review_comments_url: String!
  review_comment_url: String!
  comments_url: String!
  statuses_url: String!
  head: GitHubPullRequestHead!
  base: GitHubPullRequestBase!
  _links: GitHubLinks!
  author_association: String!
  auto_merge: Boolean
  active_lock_reason: String
  merged: Boolean!
  mergeable: Boolean!
  rebaseable: Boolean!
  mergeable_state: String!
  merged_by: GitHubUser
  comments: Int!
  review_comments: Int!
  maintainer_can_modify: Boolean!
  commits: Int!
  additions: Int!
  deletions: Int!
  changed_files: Int!
}

  type Query {
    createIssue(repo: String, issue_id: String, tsrc_id: String): Res,
    getIssueID(repo: String, tsrc_id: String,): Res,
    getTsrcID(repo: String, issue_id: String): Res,
    getGitHubPullRequest(owner: String, repo: String, pull: Number, accessToken: String): GitHubPullRequest,
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
