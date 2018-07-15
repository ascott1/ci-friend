/**
 * Creates a template for the GitHub comment
 * @module lib/comment-template
 * @param {string} errorMsg - The error message extracted from Travis
 * @return {string} - The error message template
 */
module.exports = errorMsg => {
  // left outdented to account for template literal whitespace
  return `## Travis Failure
Hi neighbor, Travis reports a failure

\`\`\`
${errorMsg}
\`\`\`
`
}
