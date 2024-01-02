const { Octokit } = require("octokit");

async function getGitHubPullRequest(owner, repo, pull, accessToken) {
	const octokit = new Octokit({
		auth: accessToken,
	});
	try {
		let res = {
			message: "",
			status: 200,
			issue_url: "",
			number: 0,
			state: "",
			title: "",
			head: {
				label: "",
				ref: "",
				sha: "",
				repo: {
					git_url: "",
				},
			},
			base: {
				label: "",
				ref: "",
				sha: "",
			},
			merged: "",
			mergeable: "",
		};
		let { data } = await octokit.request(
			`GET /repos/${owner}/${repo}/pulls/${pull}`
		);
		res.message = "pull request found";
		res.issue_url = data.issue_url;
		res.number = data.number || 111;
		res.state = data.state;
		res.title = data.title;
		res.head.label = data.head.label;
		res.head.ref = data.head.ref;
		res.head.sha = data.head.sha;
		res.base.label = data.base.label;
		res.base.ref = data.base.ref;
		res.base.sha = data.base.sha;
		res.merged = data.merged;
		res.mergeable = data.mergeable;
		res.head.repo.git_url = res.head.repo.git_url;
		return res;
	} catch (error) {
		console.log(error);
		return { status: error.status, message: error.message };
	}
}

module.exports = getGitHubPullRequest;
