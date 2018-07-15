const nock = require('nock')
const getBuildInfo = require('../lib/get-build-info')

let targetUrl =
  'https://travis-ci.org/ascott1/bot-test/builds/404106530?utm_source=github_status&utm_medium=notification'

describe('Extract helpful info given a Travis Build URL', () => {
  beforeAll(() => {
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
  })
  afterAll(() => {
    nock.restore()
  })
  test('The request successfully returns expected values', async () => {
    const buildInfo = await getBuildInfo(targetUrl)
    expect(typeof buildInfo).toBe('object')
    expect(buildInfo.build).toBe('404106530')
    expect(buildInfo.url).toBe('https://api.travis-ci.org/v3/build/404106530')
    expect(buildInfo.jobs[0].id).toBe(404106531)
  })
})
