# DIGIT-ICT Conference 2016

[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)


## Installation

```bash
npm install
```
## Start

```bash
npm start
```

This will run both `npm run build` and `npm serve:build`.

## Build

```bash
npm run build
```

## Dist

```bash
npm run dist
```

## Serve

```
npm run serve:build
```

```
npm run serve:dist
```

## Lint

```bash
npm run lint
```

## Contributing

When you land commits on your master branch, select the Squash and Merge option.
Add a title and body that follows the conventional-changelog-standard conventions.

When you're ready to release:

```bash
git checkout master
git pull origin master
npm run release
git push --follow-tags origin master
```
