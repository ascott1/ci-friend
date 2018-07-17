const nock = require('nock')
const getLog = require('../lib/get-log')
const { mockJobRequest } = require('./helpers/mock-travis-api')

let jobsArray = [
  {
    '@type': 'job',
    '@href': '/v3/job/404106531',
    '@representation': 'minimal',
    id: 404106531
  }
]

describe('Given an array of Travis jobs, extract a job log from the Travis API', () => {
  beforeAll(() => {
    // Mock the API request using nock
    mockJobRequest()
  })
  afterAll(() => {
    nock.restore()
  })
  test('The request successfully returns a log', async () => {
    const log = await getLog(jobsArray)
    expect(log).toBe('Hello npm test Puppies and kittens npm ERR!')
  })
  test('It throws an error if not passed a job', () => {
    expect(() => {
      getLog('blah')
    }).toThrow()
  })
})
