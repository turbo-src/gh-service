const { Octokit } = require("octokit");

const verify = async function (contributorName, token) {
	if (!contributorName || !token) {
		return { status: 200, verified: false };
	}
	// Case if this is a turboSrc token
	if (contributorName === token) {
		return { status: 200, verified: true };
	}
	try {
		const octokit = new Octokit({ auth: token });
		const res = await octokit.request(`GET /users/${contributorName}`);
		if (contributorName === res.data.login) {
			return { status: 200, verfied: true };
		} else {
			return { status: 200, verified: false };
		}
	} catch (error) {
		return { status: error.status, verified: false, message: error.message };
	}
};

module.exports = verify;
