const { Octokit } = require("octokit");

async function createGitHubPullRequest(
	owner,
	repo,
	organization,
	name,
	defaultBranchOnly,
	accessToken
) {
	const octokit = new Octokit({
		auth: accessToken,
	});
	try {
		let res = {
			message: "",
			status: 200,
		};
		let { data } = await octokit.request(`POST /repos/${owner}/${repo}/forks`, {
			owner: owner,
			repo: repo,
			organization: organization,
			name: name,
			default_branch_only: defaultBranchOnly,
		});
		res.message = data.message;
		res.status = data.status;
		return res;
	} catch (error) {
		return { status: error.status, message: error.message };
	}
}

module.exports = createGitHubPullRequest;
