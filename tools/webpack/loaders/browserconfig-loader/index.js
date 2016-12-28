const path = require('path');
const steed = require('steed');
const xml2js = require('xml2js');

function resolveResource(loaderContext, resource, callback) {
  if (typeof resource.src !== 'string') {
    return callback(new Error('Missing resource "src" property'));
  }

  const dirname = path.dirname(loaderContext.resourcePath);
  const publicPath = loaderContext.options.publicPath || '';

  // Resolve the resource filename relative to parsed file
  return loaderContext.resolve(dirname, resource.src, (err, filename) => {
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
      resource.src = publicPath + Object.keys(module.assets)[0];
      return callback(null);
    });
  });
}

// Traverse JSON tree
function traverse(loaderContext, obj, callback) {
  const keys = Object.keys(obj);
  steed.map(keys, (key, cb) => {
    if (key === '$' && typeof obj[key] === 'object' && {}.hasOwnProperty.call(obj[key], 'src')) {
      return resolveResource(loaderContext, obj[key], (error) => {
        if (error) {
          return cb(error);
        }

        return traverse(loaderContext, obj[key], cb);
      });
    } else if (obj[key] !== null && typeof obj[key] === 'object') {
      // Going one step down in the object tree
      return traverse(loaderContext, obj[key], cb);
    }
    return cb();
  }, callback);
}


module.exports = function browserconfigLoader(source) {
  const loaderContext = this;
  const callback = loaderContext.async();

  try {
    const parser = new xml2js.Parser();

    // Convert XML to JSON
    return parser.parseString(source, (err, result) => {
      traverse(loaderContext, result, (error) => {
        if (error) {
          return callback(error);
        }

        // Export updated XML object
        const builder = new xml2js.Builder();
        const xml = builder.buildObject(result);
        return callback(null, xml);
      });
    });
  } catch (err) {
    return callback(new Error('Invalid XML provided', err));
  }
};
