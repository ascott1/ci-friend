const nock = require('nock')
const getLog = require('../lib/get-log')

let jobsArray = [
  {
    '@type': 'job',
    '@href': '/v3/job/404106531',
    '@representation': 'minimal',
    id: 404106531
  }
]

describe('Extract helpful info given a Travis Build URL', () => {
  // Mock the API request
  beforeAll(() => {
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
        content: 'Puppies and kittens!',
        log_parts: [
          {
            content: 'Puppies and kittens',
            final: true,
            number: 0
          }
        ],
        '@raw_log_href': '/v3/job/404106531/log.txt'
      })
  })
  afterAll(() => {
    nock.restore()
  })
  test('The request successfully returns a log', async () => {
    const log = await getLog(jobsArray)
    expect(log).toBe('Puppies and kittens!')
  })
})
