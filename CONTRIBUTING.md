# Contributing

When you land commits on the master branch, select the Squash and Merge option.
Add a title and body that follows the conventional-changelog-standard
conventions.

When you're ready to release:

```bash
git checkout master
git pull origin master
npm run release
git push --follow-tags origin master
```
