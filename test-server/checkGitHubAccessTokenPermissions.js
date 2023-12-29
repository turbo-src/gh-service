const assert = require("assert");
const { checkGitHubAccessTokenPermissions } = require("../src/requests");
require("dotenv").config();

describe("checkGitHubAccessToken", function () {
	it("Should return the correct permissions for either a turbosrc token or a GitHub access token depending on the repo passed in the arugments", async function () {
		const contributorName = process.env.CONTRIBUTOR_NAME;
		const validRepoName = process.env.REPO_NAME;
		const gitHubAccessToken = process.env.GITHUB_ACCESS_TOKEN;

		const valid = {
			contributorName: contributorName,
			repo: validRepoName,
			owner: contributorName,
			turbosrcToken: contributorName,
			gitHubAccessToken: gitHubAccessToken,
			instanceToken: gitHubAccessToken,
		};
		const invalid = {
			contributorName: "badContributorName",
			owner: "nixOS",
			repo: "nix",
			turbosrcToken: "badTurbosrcToken",
			gitHubAccessToken: "badGitHubToken",
			instanceToken: "badGitHubToken",
		};

		const turbosrcToken = await checkGitHubAccessTokenPermissions(
			valid.owner,
			valid.repo,
			valid.turbosrcToken,
			valid.contributorName,
			valid.instanceToken
		);

		const invalidRepoTurboSrcToken = await checkGitHubAccessTokenPermissions(
			invalid.owner,
			invalid.repo,
			valid.turbosrcToken,
			valid.contributorName,
			valid.instanceToken
		);

		const gitHubToken = await checkGitHubAccessTokenPermissions(
			valid.owner,
			valid.repo,
			valid.gitHubAccessToken,
			valid.contributorName,
			valid.instanceToken
		);

		const invalidRepoGitHubAccessToken =
			await checkGitHubAccessTokenPermissions(
				invalid.owner,
				invalid.repo,
				valid.gitHubAccessToken,
				valid.contributorName,
				valid.instanceToken
			);

		assert.equal(
			turbosrcToken.push_permissions,
			true,
			"turbosrc tokens should have push_permissions if the owner is the same as the user"
		);
		assert.equal(
			turbosrcToken.public_repo_scopes,
			true,
			"turbosrc tokens should automatically have public_repo_scopes because they do not actually merge or close, it is just for demo purposes"
		);

		assert.equal(
			invalidRepoTurboSrcToken.push_permissions,
			false,
			"Failed to register false for a repo the user does not have push access to."
		);
		assert.equal(
			invalidRepoTurboSrcToken.public_repo_scopes,
			true,
			"turbosrc tokens should automatically have public_repo_scopes because they do not actually merge or close, it is just for demo purposes"
		);
		assert.equal(
			gitHubToken.push_permissions,
			true,
			"push permissions should be true if the user's github token has push permissions enabled"
		);
		assert.equal(
			gitHubToken.public_repo_scopes,
			true,
			"public_repo_scopes should be true if the user's github token has those scopes enabled"
		);
		assert.equal(
			invalidRepoGitHubAccessToken.push_permissions,
			false,
			"Failed to return false for push permissions to a repo the contributor does not have access to"
		);
		assert.equal(
			invalidRepoGitHubAccessToken.public_repo_scopes,
			true,
			"Failed to check public repo scopes for a valid GitHub access token, even if the user does not have push permissions to the repo, they still should have public_repo_scopes as true"
		);
	});
});
