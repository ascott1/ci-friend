const { Application } = require('probot')
const plugin = require('..')
const nock = require('nock')
const successPayload = require('./fixtures/status.success')
const failPayload = require('./fixtures/status.failure')
const pendingPayload = require('./fixtures/status.pending')
const {
  mockBuildRequest,
  mockJobRequest
} = require('./helpers/mock-travis-api')

describe('Given a GitHub status state, the application properly responds', () => {
  let app
  let github

  beforeEach(() => {
    // Create an `Application` instance
    app = new Application()
    // Initialize the app
    app.load(plugin)
    // Mock out the GitHub API
    // https://probot.github.io/docs/testing/
    github = {
      issues: {
        createComment: jest.fn().mockReturnValue(Promise.resolve({}))
      }
    }
    app.auth = () => Promise.resolve(github)

    // Mock the Travis API requests using nock
    mockBuildRequest()
    mockJobRequest()
  })

  afterEach(() => {
    nock.restore()
  })

  test('Given a failing Travis status, it posts a comment', async () => {
    await app.receive({ event: 'status', payload: failPayload })
    expect(github.issues.createComment).toHaveBeenCalled()
  })

  test('Given a successful Travis build, it does not post a comment', async () => {
    await app.receive({ event: 'status', payload: successPayload })
    expect(github.issues.createComment).not.toHaveBeenCalled()
  })

  test('Given a pending Travis build, it does not post a comment', async () => {
    await app.receive({ event: 'status', payload: pendingPayload })
    expect(github.issues.createComment).not.toHaveBeenCalled()
  })
})
