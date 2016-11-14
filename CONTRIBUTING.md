# Contributing

## Merge

When you land commits on the master branch, select the Squash and Merge option.
Add a title and body that follow the [conventional-changelog-standard
conventions](https://github.com/conventional-changelog/conventional-changelog-angular/blob/master/convention.md).

## Release

In order to alter GitHub's release and to attach the changelog to it, you need
to [setup a token first](https://github.com/conventional-changelog/conventional-github-releaser#setup-token-for-cli).

When you're ready to release, just type:

```bash
npm run release
```

This will pull the latest changes from `master`, create a new tag based on the
commits messages, generate the changelog, push the new tag to GitHub and
make a release with the changes. All in a single command! :bowtie:
