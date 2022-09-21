const assert = require("assert");
const { postGetTsrcID } = require("../src/requests");

describe("postGetTsrcID", function () {
  it("should return a tsrcID based on an issueID", async function () {
    const tsrcID = await postGetTsrcID("joseph/demo", "issue2");

    assert.equal(
      tsrcID,
      "345",
      "Failed to get an issue's tsrc id based on their issue id"
    );
  });
});
