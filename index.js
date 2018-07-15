const getBuildInfo = require('./lib/get-build-info.js')
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

      // Read the log
      // Extract the relevant info & clean it up

      // Post a comment to the PR
      const params = context.issue({
        body: 'It failed! :dragon:',
        number: buildInfo.pull
      })
      return context.github.issues.createComment(params)
    }

    // If the status not a failure return?
  })
}
