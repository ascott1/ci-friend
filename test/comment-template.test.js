const commentTemplate = require('../lib/comment-template')

const errorLog = `> bot-test@1.0.0 test /home/travis/build/ascott1/bot-test
> echo "Error: no test specified" && exit 1

Error: no test specified`

const travisUrl = 'https://travis-ci.org'
const sha = 'a9e658971bcccbd0fded0c146df90b08893bfded'
const name = 'example/example'
const pull = 1

const expectedResult = `## Travis Failure
:wave: Hi neighbor, 
Travis CI [reports](https://travis-ci.org) a failure as of [#a9e658](https://github.com/example/example/pull/1/commits/a9e658971bcccbd0fded0c146df90b08893bfded).

\`\`\`sh
> bot-test@1.0.0 test /home/travis/build/ascott1/bot-test
> echo "Error: no test specified" && exit 1

Error: no test specified
\`\`\`
`

test('It forms a properly formatted comment', () => {
  expect(commentTemplate(errorLog, travisUrl, sha, name, pull)).toMatch(
    expectedResult
  )
})
