const { Octokit } = require("octokit");

async function checkGitHubAccessTokenPermissions(
	owner,
	repo,
	accessToken,
	contributorName,
	instanceToken
) {
	const octokit = new Octokit({
		auth: accessToken === contributorName ? instanceToken : accessToken,
	});

	let permissions = {
		status: 200,
		message: "successfully verified access token",
		push_permissions: false,
		public_repo_scopes: false,
	};

	/* Logic if using a turboSrcToken: bypass public_repo_scopes and just
check if contributor owns this repo or is a member of its organization */
	if (accessToken === contributorName) {
		permissions.public_repo_scopes = true;

		if (owner === contributorName) {
			permissions.push_permissions = true;
			return permissions;
		} else {
			try {
				// If the owner of this repo is an organization, check if the contributor is one of its members:
				const { data } = await octokit.request(`GET /repos/${owner}/${repo}`);
				const gitHubRepo = data;
				if (gitHubRepo.owner.type === "Organization") {
					const members = await octokit.request(`GET /orgs/${owner}/members`);
					for (let i = 0; i < members.length; i++) {
						let member = members[i];
						if (member.login === contributorName) {
							permissions.push_permissions = true;
							break;
						}
					}
				}
				return permissions;
			} catch (error) {
				return { status: error.status, message: error.message };
			}
		}
	} else {
		try {
			const scopesRes = await octokit.request(`GET /users/${contributorName}`);

			Promise.resolve(scopesRes).then((object) => {
				if (
					object.headers["x-oauth-scopes"].split(",").includes("public_repo")
				) {
					permissions.public_repo_scopes = true;
				} else {
					permissions.public_repo_scopes = false;
				}
			});

			//Check if user has push permissions to this repo:
			const permissionsRes = await octokit.request(
				`GET /repos/${owner}/${repo}`
			);

			Promise.resolve(permissionsRes).then((object) => {
				if (object.data.permissions.push) {
					permissions.push_permissions = true;
				} else {
					permissions.push_permissions = false;
				}
			});
			return permissions;
		} catch (error) {
			console.log(error);
			return { status: error.status, message: error.message };
		}
	}
}

module.exports = checkGitHubAccessTokenPermissions;
