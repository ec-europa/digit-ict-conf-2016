# DIGIT-ICT Conference 2016

[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)

## Installation

### OS Requirements

```bash
yum install libpng-devel
apt-get install libpng-dev
```

### Install depedencies

```bash
npm install
```

## Configure

You can override the default config (`tools/config.dist.json`) by creating your
 own `tools/config.local.json` file. Don't forget to update the manifest
`start_url` property in `public/manifest.json`.

## Start

```bash
npm start
```

This will run both `npm run build` and `npm serve:build`.

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md).
