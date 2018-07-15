const commentTemplate = require('../lib/comment-template')

const errorLog = `> bot-test@1.0.0 test /home/travis/build/ascott1/bot-test
> echo "Error: no test specified" && exit 1

Error: no test specified`

const expectedResult = `## Travis Failure
Hi neighbor, Travis reports a failure

\`\`\`
${errorLog}
\`\`\`
`

test('It forms a properly formatted comment', () => {
  expect(commentTemplate(errorLog)).toMatch(expectedResult)
})
