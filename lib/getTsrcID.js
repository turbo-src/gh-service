const { Repo } = require("../server/db");

async function getTsrcID(repo_id, issue_id) {
  try {
    const repo = await Repo.findOne({
      where: { repo_id: repo_id },
      include: { model: Issue }} );
    
   const data = JSON.stringify(repo,2,0)
  
   for(let i = 0; i < data.issues.length; i++) {
    if(data.issues[i].issue_id === issue_id)
    return data.issues[i].tsrc_id
   }

  } catch (error) {
    console.log(error);
    return 500;
  }
}

module.exports = getTsrcID;
