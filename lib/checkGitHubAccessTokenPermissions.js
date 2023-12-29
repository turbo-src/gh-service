const { Octokit } = require("octokit");

async function checkGitHubAccessTokenPermissions(
	owner,
	repo,
	accessToken,
	contributorName,
	instanceToken
) {
	/* 
	push_permissions: a user can push to the repo in question
	public_repo_scopes: if the user's access token has permitted it to access public repos

	- Both need to be true to merge or close pull requests with a user's access token.
	- If it is a turboSrc token, we bypass the above and just check whether the repo belongs to the user because
	  a turbosrc token does not permit live merging/closing. It is just for demonstration.
	*/

	let tokenType;
	let octokit;

	if (accessToken === contributorName) {
		tokenType = "turbosrcToken";
	} else {
		tokenType = "gitHubAccessToken";
	}

	let permissions = {
		status: 200,
		message: `successfully verified ${tokenType} token`,
		push_permissions: false,
		public_repo_scopes: false,
	};

	switch (tokenType) {
		case "turbosrcToken":
			permissions.public_repo_scopes = true;
			if (owner === contributorName) {
				permissions.push_permissions = true;
				return permissions;
			} else {
				try {
					octokit = new Octokit({
						auth: instanceToken,
					});
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
					return {
						...permissions,
						status: error.status,
						message: error.message,
					};
				}
			}
		case "gitHubAccessToken":
			try {
				octokit = new Octokit({
					auth: accessToken,
				});
				const scopesRes = await octokit.request(
					`GET /users/${contributorName}`
				);
				Promise.resolve(scopesRes).then((object) => {
					if (
						object.headers["x-oauth-scopes"].split(", ").includes("repo") ||
						object.headers["x-oauth-scopes"].split(", ").includes("public_repo")
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
				return { ...permissions, status: error.status, message: error.message };
			}
		default:
			return {
				...permissions,
				status: 500,
				message: "unknown access token type",
			};
	}
}

module.exports = checkGitHubAccessTokenPermissions;
