const path = require('path');
const steed = require('steed');

function resolveResource(loaderContext, resource, callback) {
  if (typeof resource.picture !== 'string') {
    return callback(new Error('Missing resource "picture" property'));
  }

  const dirname = path.dirname(loaderContext.resourcePath);
  const publicPath = loaderContext.options.publicPath || '';

  // Resolve the resource filename relative to parsed file
  return loaderContext.resolve(dirname, resource.picture, (err, filename) => {
    if (err) {
      return callback(err);
    }

    // Ensure Webpack knows that the resource is a dependency
    if (loaderContext.dependency) {
      loaderContext.dependency(filename);
    }

    // Asynchronously pass the resource through the loader pipeline
    return loaderContext.loadModule(filename, (error, source, map, module) => {
      if (error) {
        return callback(error);
      }

      // Update the resource src property to match the generated filename
      // eslint-disable-next-line no-param-reassign
      resource.picture = publicPath + Object.keys(module.assets)[0];
      return callback(null);
    });
  });
}

// Traverse JSON tree
function traverse(loaderContext, speakers, callback) {
  steed.map(speakers, (speaker, cb) =>
    resolveResource(loaderContext, speaker, (error) => {
      if (error) {
        return cb(error);
      }
      return cb(null);
    })
  , callback);
}

module.exports = function speakersLoader(source) {
  if (this.cacheable) {
    this.cacheable();
  }

  const loaderContext = this;
  const callback = loaderContext.async();

  try {
    const value = typeof source === 'string' ? JSON.parse(source) : source;
    this.value = [value];
    return traverse(loaderContext, value, (error) => {
      if (error) {
        return callback(error);
      }
      return callback(null, `module.exports = ${JSON.stringify(value, undefined, '\t')};`);
    });
  } catch (err) {
    return callback(new Error('Invalid JSON provided', err));
  }
};
