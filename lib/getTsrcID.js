const { Repo, Issue } = require("../server/db");

async function getTsrcID(repo_id, issue_id) {
  try {
    const repo = await Repo.findOne({
      where: { repo_id: repo_id },
      include: { model: Issue }} );

      const data = JSON.stringify(repo,2,0)
      const object = JSON.parse(data)

      for (let i = 0; i < object?.issues.length; i++) {
				if (object.issues[i].issue_id === issue_id) {
					return {
						status: 200,
						tsrcID: object.issues[i].tsrc_id,
						issueID: issue_id,
						message: "tsrc id found",
					};
				}
			}
			return {
				status: 404,
				tsrcID: "",
				issueID: issue_id,
				message: "tsrc id not found",
			};
  } catch (error) {
    console.log(error);
    return {status: 500, tsrcID: tsrc_id, issueID: issue_id, message: 'error getting tsrcID'};
  }
}

module.exports = getTsrcID;
