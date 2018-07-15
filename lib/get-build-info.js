const request = require('request-promise-native')

/**
 * Retrieves useful information from the Travis /build API
 * @module lib/get-build-info
 * @param {string} buildUrl - A Travis URL provided by the GitHub API
 * @return {object} Helpful API results
 */
module.exports = buildUrl => {
  // Extract the build ID from the target_url provided by GitHub
  let buildId = buildUrl.split('/builds/')[1].split('?')[0]
  // Form a URL for the request
  let requestUrl = `https://api.travis-ci.org/v3/build/${buildId}`

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
  // On success return an object with useful info
  return request(options)
    .then(function (build) {
      return {
        pull: build.pull_request_number,
        build: buildId,
        url: requestUrl,
        jobs: build.jobs
      }
    })
    .catch(function (err) {
      throw new Error(`Error requesting Travis API ${err}`)
    })
}
