const assert = require("assert");
const { postCreateIssue } = require("../src/requests");

describe("postCreateIssue", function () {
  it("should create a new issue in the database", async function () {
  const issue1 =  await postCreateIssue(
    'joseph/demo',
    'issue1',
    '123'
    );
    const issue2 =  await postCreateIssue(
      'joseph/demo',
      'issue2',
      '345'
    );
    const issue3 =  await postCreateIssue(
      'joseph/demo',
      'issue3',
      '678'
    );

    assert.equal(issue1, 201, "Failed to create an issue");
    assert.equal(issue2, 201, "Failed to create an issue");
    assert.equal(issue3, 201, "Failed to create an issue");
  });
});
