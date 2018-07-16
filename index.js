const getBuildInfo = require('./lib/get-build-info')
const getLog = require('./lib/get-log')
const extractError = require('./lib/extract-error')
const commentTemplate = require('./lib/comment-template')
/**
 * This is the entry point for your Probot App.
 * @param {import('probot').Application} app - Probot's Application class.
 */
module.exports = app => {
  // `context` extracts information from the event
  app.on('status', async context => {
    // Check if the returned context state is a failure
    // && that the failure comes from Travis
    if (
      context.payload.state === 'failure' &&
      context.payload.context === 'continuous-integration/travis-ci/pr'
    ) {
      // get the build info
      let buildInfo = await getBuildInfo(context.payload.target_url)

      // Get the log content
      let log = await getLog(buildInfo.jobs)

      // Extract the relevant info & clean up the log
      let errorMessage = extractError(log)

      // Form a comment by passing the error message and Travis build URL
      let comment = commentTemplate(
        errorMessage,
        context.payload.target_url,
        context.payload.sha,
        context.payload.name,
        buildInfo.pull
      )

      // Post a comment to the Pull Request
      const params = context.issue({
        body: comment,
        number: buildInfo.pull
      })
      return context.github.issues.createComment(params)
    }
  })
}
