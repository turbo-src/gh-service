const assert = require("assert");
const { postGetIssueID } = require("../src/requests");

describe("postGetIssueID", function () {
  it("should return a Issue's idbased on their TsrcID", async function () {
    let issueID = await postGetIssueID("joseph/demo", "123");

    assert.equal(
      issueID,
      "issue1",
      "Failed to get a Issue's id based on their TsrcID"
    );
  });
});
