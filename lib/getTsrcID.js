const { Repo, Issue } = require("../server/db");

async function getTsrcID(repo_id, issue_id) {
  try {
    const repo = await Repo.findOne({
      where: { repo_id: repo_id },
      include: { model: Issue }} );

      const data = JSON.stringify(repo,2,0)
      const object = JSON.parse(data)

      for(let i = 0; i < object.issues.length; i++) {
      if(object.issues[i].issue_id === issue_id)
      return object.issues[i].tsrc_id
      }

  } catch (error) {
    console.log(error);
    return 500;
  }
}

module.exports = getTsrcID;
