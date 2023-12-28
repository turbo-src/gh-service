const { Octokit } = require("octokit");

async function mergeGitHubPullRequest(owner, repo, pull, accessToken) {
	const octokit = new Octokit({
		auth: accessToken,
	});
	try {
		let res = {
			message: "",
			status: 200,
		};
		let { data } = await octokit.request(
			`PUT /repos/${owner}/${repo}/pulls/${pull}/merge`
		);

		res.message = "pull request merged on GitHub";
		res.status = data.status;
		return res;
	} catch (error) {
		console.log(error);
		return { status: error.status, message: error.message };
	}
}

module.exports = mergeGitHubPullRequest;
