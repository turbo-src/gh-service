const assert = require("assert");
const { postCreateIssue } = require("../src/requests");

describe("duplicate ids", function () {
  it("should not create a new issue in the database if the issue/turbosrc_ids are not unique to the repo", async function () {
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
      'issue2',
      '678'
    );
    const issue4 =  await postCreateIssue(
        'joseph/demo',
        'issue4',
        '910'
      );

    assert.equal(issue1, 403, "Failed to prevent duplicate issue/turbosrc_ids for one repo");
    assert.equal(issue2, 403, "Failed to prevent duplicate issue/turbosrc_ids for one repo");
    assert.equal(issue3, 403, "Failed to prevent duplicate issue/turbosrc_ids for one repo");
    assert.equal(issue4, 201, "Failed to create an issue in the database even though the ids are unique to the repo");
  });
});
