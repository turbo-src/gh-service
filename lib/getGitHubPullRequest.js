const { Octokit } = require("octokit");

async function getGitHubPullRequest(owner, repo, pull, accessToken) {
	const octokit = new Octokit({ auth: accessToken });
	try {
		const res = await octokit.request(
			`GET /repos/${owner}/${repo}/pulls/${pull}`
		);
		return res.data;
	} catch (error) {
		return { status: error.status, message: error.message };
	}
}

module.exports = getGitHubPullRequest;
