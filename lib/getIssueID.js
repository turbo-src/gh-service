const { Repo, Issue } = require("../server/db");

async function getIssueID(repo_id, tsrc_id) {
  try {
    const repo = await Repo.findOne({
      where: { repo_id: repo_id },
      include: { model: Issue }} );

  const data = JSON.stringify(repo,2,0)
  const object = JSON.parse(data)

  for(let i = 0; i < object.issues.length; i++) {
   if(object.issues[i].tsrc_id === tsrc_id)
   return {status: 200, tsrcID: tsrc_id, issueID: object.issues[i].issue_id, message: 'issue id found'};
  }

  } catch (error) {
    console.log(error);
    return {status: 500, tsrcID: tsrc_id, issueID: issue_id, message: 'error getting issueID'};
    ;
  }
}

module.exports = getIssueID;
