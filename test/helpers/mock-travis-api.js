const nock = require('nock')

const mockBuildRequest = () => {
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
}

const mockJobRequest = () => {
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
      content: 'Hello npm test Puppies and kittens npm ERR!',
      log_parts: [
        {
          content: 'Hello npm test Puppies and kittens npm ERR!',
          final: true,
          number: 0
        }
      ],
      '@raw_log_href': '/v3/job/404106531/log.txt'
    })
}

module.exports = {
  mockBuildRequest,
  mockJobRequest
}
