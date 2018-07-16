const { Application } = require('probot')
const plugin = require('..')
const nock = require('nock')
const successPayload = require('./fixtures/status.success')
const failPayload = require('./fixtures/status.failure')
const pendingPayload = require('./fixtures/status.pending')

describe('It handles events', () => {
  let app
  let github

  beforeEach(() => {
    app = new Application()
    app.load(plugin)
    github = {
      issues: {
        createComment: jest.fn().mockReturnValue(Promise.resolve({}))
      }
    }
    app.auth = () => Promise.resolve(github)

    nock('https://api.travis-ci.org')
      .get('/v3/build/404106530')
      .reply(200, {
        id: 404106530,
        pull_request_number: 6,
        jobs: [
          {
            '@type': 'job',
            '@href': '/v3/job/404106531',
            '@representation': 'minimal',
            id: 404106531
          }
        ]
      })

    nock('https://api.travis-ci.org')
      .get('/v3/job/404106531/log')
      .reply(200, {
        '@type': 'log',
        '@href': '/v3/job/404106531/log',
        '@representation': 'standard',
        '@permissions': {
          read: true,
          cancel: false,
          restart: false,
          debug: false,
          delete_log: false
        },
        id: 295733617,
        content: 'npm test FAIL ',
        log_parts: [
          {
            content: 'Hello npm test Puppies and kittens npm ERR!',
            final: true,
            number: 0
          }
        ],
        '@raw_log_href': '/v3/job/404106531/log.txt'
      })
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
