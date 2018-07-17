const nock = require('nock')
const getBuildInfo = require('../lib/get-build-info')
const { mockBuildRequest } = require('./helpers/mock-travis-api')

let targetUrl =
  'https://travis-ci.org/ascott1/bot-test/builds/404106530?utm_source=github_status&utm_medium=notification'

describe('Given a Travis Build URL return an object of helpful information', () => {
  beforeAll(() => {
    // Mock the Travis API using nock
    mockBuildRequest()
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
