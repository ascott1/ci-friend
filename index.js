const getBuildInfo = require('./lib/get-build-info')
const getLog = require('./lib/get-log')
const extractError = require('./lib/extract-error')
const commentTemplate = require('./lib/comment-template')
/**
 * This is the entry point for your Probot App.
 * @param {import('probot').Application} app - Probot's Application class.
 */
module.exports = app => {
  app.on('status', async context => {
    // `context` extracts information from the event, which can be passed to
    // GitHub API calls.
    // Check if the returned context state is a failure
    if (context.payload.state === 'failure') {
      // Check that the failure is part of a Pull Request
      // Check that the failure comes from Travis

      // get the build info
      let buildInfo = await getBuildInfo(context.payload.target_url)

      // Get the log content
      let log = await getLog(buildInfo.jobs)

      // Extract the relevant info & clean up the log
      let errorMessage = extractError(log)

      // Form a comment
      let comment = commentTemplate(errorMessage)

      // Post a comment to the Pull Request
      const params = context.issue({
        body: comment,
        number: buildInfo.pull
      })
      return context.github.issues.createComment(params)
    }
  })
}
