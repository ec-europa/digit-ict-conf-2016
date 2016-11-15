# DIGIT-ICT Conference 2016

[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)

## Installation

We recommend to use [Yarn](https://yarnpkg.com/) in order to install the
dependencies:

```bash
yarn install
```

## Configure

You can override the default config (`tools/config.dist.json`) by creating your
 own `tools/config.local.json` file. Don't forget to update the manifest
`start_url` property in `public/manifest.json`.

## Start

During development, use the following command to build the website and start
the development server:

```bash
npm start
```

## Build

Generate the static website with:

```bash
npm run build
```

Note that it will read the configuration from ./tools/config.local.json and if
this file doesn't exist, it will fall back to ./tools/config.dist.json.

## Lint

```bash
npm run lint
```

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md).
