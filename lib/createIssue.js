const { Repo, Issue } = require("../server/db");

async function createIssue(
repo_id,
issue_id,
tsrc_id,
) {
  try {
let repo = await Repo.findOne({where:{repo_id: repo_id}, include: {model: Issue}})

if(!repo) {
  repo = await Repo.create({repo_id:repo_id})
}

const data = JSON.stringify(repo, 2,0)
const object = JSON.parse(data)

//Check to see if either ids are not unique to this repo
if(object.issues){
  for(let i = 0; i < object.issues.length; i++) {
    if(object.issues[i].tsrc_id === tsrc_id) {
    return 403
    }
  if(object.issues[i].issue_id === issue_id) {
    return 403
  }
  }
}

const issue = await Issue.create({issue_id: issue_id, tsrc_id: tsrc_id, })
await repo.addIssue(issue.id)

return {status: 201, tsrcID: tsrc_id, issueID: issue_id, message: 'issue created'};
  } catch (error) {
    console.log(error)
    return {status: 500, tsrcID: tsrc_id, issueID: issue_id, message: 'error creating issue'}
  }
}
module.exports = createIssue;
