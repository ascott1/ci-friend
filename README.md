![ci-friend](logo.png)

> A helper bot for understanding Travis CI build failures. Built with [Probot](https://github.com/probot/probot) :robot:

## Features

ci-friend extracts failing test results from a [Travis CI](https://travis-ci.org/) job log and posts them as a comment to the appropriate pull request.

![screenshot](screenshot.png)

## Current limitations

- Currently only works with `npm test`
- Currently only tested with Jest
- Assumes a single Travis CI job

## Setup

First clone the repostiory, insall the dependencies, and copy the `.env` file:

```sh
git clone git@github.com:ascott1/ci-friend.git
cd ci-friend
npm install
cp .env.example .env
```
Next, follow the steps found at [Configuring a GitHub App](https://probot.github.io/docs/development/#configuring-a-github-app)

Additionally, login to Travis and add your [Travis Token](https://developer.travis-ci.com/authentication) to `.env`

Now you're ready to run your app!

```
npm run dev
```

## Contributing

All contributions and suggestions are welcome!

For suggested improvements, please [file an issue](https://github.com/ascott1/ci-friend/issues).

For direct contributions, please fork the repository and file a pull request. If you've never created a pull request before, welcome! :tada: :smile: [Here is a great tutorial](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github) on how to send one.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## Code of Conduct

In the interest of fostering an open and welcoming environment,the contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

Please be sure to read and adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

[ISC](LICENSE) © 2018 Adam Scott <ascott1@gmail.com>

Cardigan icon by [Artem Kovyazin](https://thenounproject.com/kosmofish/). Used with permission.
