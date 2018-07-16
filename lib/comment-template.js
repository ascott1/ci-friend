/**
 * Creates a template for the GitHub comment
 * @module lib/comment-template
 * @param {string} errorMsg - The error message extracted from Travis
 * @return {string} - The error message template
 */
module.exports = (errorMsg, travisUrl, sha, repoName, pull) => {
  // shorten the sha
  let shortSha = sha.substring(0, 6)
  // create the link to the commit's URL in the context of the PR
  let commitUrl = `https://github.com/${repoName}/pull/${pull}/commits/${sha}`

  // left outdented to account for template literal whitespace
  return `## Travis Failure
:wave: Hi neighbor, 
Travis CI [reports](${travisUrl}) a failure as of [#${shortSha}](${commitUrl}).

\`\`\`sh
${errorMsg}
\`\`\`
`
}
