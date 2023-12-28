const createIssue = require("./createIssue");
const getIssueID = require("./getIssueID");
const getTsrcID = require("./getTsrcID");
const getGitHubPullRequest = require("./getGitHubPullRequest");
const mergeGitHubPullRequest = require("./mergeGitHubPullRequest");
const closeGitHubPullRequest = require("./closeGitHubPullRequest");
const checkGitHubAccessTokenPermissions = require("./checkGitHubAccessTokenPermissions");

module.exports = {
	createIssue,
	getIssueID,
	getTsrcID,
	getGitHubPullRequest,
	mergeGitHubPullRequest,
	closeGitHubPullRequest,
	checkGitHubAccessTokenPermissions,
};
