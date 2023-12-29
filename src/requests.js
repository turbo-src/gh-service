const superagent = require("superagent");
require("dotenv").config();

const port =
	process.env.NODE_ENV === "fly"
		? "https://namespace-db.fly.dev"
		: "http://localhost:4004";

var root = {
	postCreateIssue: async (repo, issue_id, tsrc_id) => {
		const res = await superagent
			.post(`${port}/graphql`)
			.send({
				query: `{ createIssue(repo: "${repo}", issue_id: "${issue_id}", tsrc_id: "${tsrc_id}") {status, tsrcID, issueID, message} }`,
			})
			.set("accept", "json");
		const json = JSON.parse(res.text);
		return json.data.createIssue;
	},
	postGetIssueID: async (repo, tsrc_id) => {
		const res = await superagent
			.post(`${port}/graphql`)
			.send({
				query: `{ getIssueID(repo: "${repo}", tsrc_id: "${tsrc_id}") {status, tsrcID, issueID, message} }`,
			})
			.set("accept", "json");
		const json = JSON.parse(res.text);
		return json.data.getIssueID;
	},
	postGetTsrcID: async (repo, issue_id) => {
		const res = await superagent
			.post(`${port}/graphql`)
			.send({
				query: `{ getTsrcID(repo: "${repo}", issue_id: "${issue_id}") {status, tsrcID, issueID, message} }`,
			})
			.set("accept", "json");
		const json = JSON.parse(res.text);
		return json.data.getTsrcID;
	},
	getGitHubPullRequest: async (owner, repo, pull, accessToken) => {
		const res = await superagent
			.post(`${port}/graphql`)
			.send({
				query: `{ getGitHubPullRequest(owner: "${owner}", repo: "${repo}", pull: ${pull}, accessToken: "${accessToken}")
        {
          status,
          message,
          url,
          id,
          issue_url,
          number,
          state,
          locked,
          title,
          user {
            login,
            id,
          },
          head {
            label,
            ref,
            sha,
          },
          base {
            label,
            ref,
            sha,
          },
          mergeable,
          rebaseable,
          mergeable_state,
        }
      }`,
			})
			.set("accept", "json");
		const json = JSON.parse(res.text);
		return json.data.getGitHubPullRequest;
	},
	mergeGitHubPullRequest: async (owner, repo, pull, accessToken) => {
		const res = await superagent
			.post(`${port}/graphql`)
			.send({
				query: `{ mergeGitHubPullRequest(owner: "${owner}", repo: "${repo}", pull: "${pull}", accessToken: "${accessToken}") {status, message} }`,
			})
			.set("accept", "json");
		const json = JSON.parse(res.text);
		return json.data.mergeGitHubPullRequest;
	},
	closeGitHubPullRequest: async (owner, repo, pull, accessToken) => {
		const res = await superagent
			.post(`${port}/graphql`)
			.send({
				query: `{ closeGitHubPullRequest(owner: "${owner}", repo: "${repo}", pull: "${pull}", accessToken: "${accessToken}") {status, message} }`,
			})
			.set("accept", "json");
		const json = JSON.parse(res.text);
		return json.data.mergeGitHubPullRequest;
	},
	checkGitHubAccessTokenPermissions: async (
		owner,
		repo,
		accessToken,
		contributorName,
		instanceToken = ""
	) => {
		const res = await superagent
			.post(`${port}/graphql`)
			.send({
				query: `{ checkGitHubAccessTokenPermissions(owner: "${owner}", repo: "${repo}", accessToken: "${accessToken}", contributorName: "${contributorName}", instanceToken: "${instanceToken}") { status, message, public_repo_scopes, push_permissions } }`,
			})
			.set("accept", "json");
		const json = JSON.parse(res.text);
		return json.data.checkGitHubAccessTokenPermissions;
	},
	verify: async (contributorName, token) => {
		const res = await superagent
			.post(`${port}/graphql`)
			.send({
				query: `{ verify(contributorName: "${contributorName}", token: "${token}") { status, verified } }`,
			})
			.set("accept", "json");
		const json = JSON.parse(res.text);
		return json.data.verify;
	},
};

module.exports = root;
