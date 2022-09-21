const { Repo, Issue } = require("../server/db");

async function createIssue(
repo_id,
issue_id,
tsrc_id,
) {
  try {
let repo = await Repo.findOne({where:{repo_id: repo_id}})

if(!repo) {
  repo = await Repo.create({repo_id:repo_id})
}

const issue = await Issue.create({issue_id: issue_id, tsrc_id: tsrc_id, })
await repo.addIssue(issue.id)

    return 201;
  } catch (error) {
    console.log(error)
    return 500
  }
}
module.exports = createIssue;
