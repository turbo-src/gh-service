const { Octokit } = require("octokit");

async function createGitHubPullRequest(
	owner,
	repo,
	title,
	body,
	forkBranch,
	base,
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
		let { data } = await octokit.request(
			(`POST /repos/${owner}/${repo}/pulls`,
			{
				owner: owner,
				repo: repo,
				title: title,
				body: body,
				head: forkBranch,
				base: base,
			})
		);
		res.message = data.message;
		res.status = data.status;
		return res;
	} catch (error) {
		return { status: error.status, message: error.message };
	}
}

module.exports = createGitHubPullRequest;
