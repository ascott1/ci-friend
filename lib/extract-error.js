const stripAnsi = require('strip-ansi')

/**
 * Extracts the error message from a raw Travis log
 * @module lib/extract-error
 * @param {string} log - The raw Travis log
 * @return {string} - The clean error message
 */
module.exports = log => {
  // Strip the logs of ANSI escape codes
  // https://github.com/chalk/strip-ansi
  let cleanLog = stripAnsi(log)
  // Make sure it's an npm test
  if (cleanLog.includes('npm test')) {
    // Split the error log at the npm test results
    let errorLog = cleanLog
      .split('npm test')[1]
      .split('npm ERR!')[0]
      .trim()
    return errorLog
  } else {
    throw new Error('No npm test failures found')
  }
}
