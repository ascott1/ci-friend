const request = require('request-promise-native')

module.exports = jobs => {
  // For now, we're only going to retrieve the log from the first job
  // It is possible that there are multiple jobs that run against a build

  let jobId = jobs[0].id

  // build the request URL
  let requestUrl = `https://api.travis-ci.org/v3/job/${jobId}/log`

  // Set the parameters for the request to the Travis API
  // https://developer.travis-ci.com/gettingstarted
  let options = {
    uri: requestUrl,
    headers: {
      'Travis-API-Version': 3,
      Authorization: 'token ' + process.env.TRAVIS
    },
    json: true
  }

  // Make the request to the Travis API
  // On success return the raw Travis log content
  return request(options)
    .then(function (log) {
      return log.content
    })
    .catch(function (err) {
      throw new Error(`Error requesting Travis API ${err}`)
    })
}
