/* eslint-disable strict */

'use strict';

let defaultConfig = {};

try {
  // eslint-disable-next-line global-require, import/no-unresolved
  defaultConfig = require('./config.local.json');
} catch (e) {
  // eslint-disable-next-line global-require
  defaultConfig = require('./config.dist.json');
}

const Config = {
  dev: defaultConfig.dev,
  prod: defaultConfig.prod,
};

module.exports = Config;
