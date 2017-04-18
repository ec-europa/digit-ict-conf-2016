/* eslint no-console: off */
const Nightmare = require('nightmare');
require('nightmare-load-filter')(Nightmare);
const vo = require('vo');
const fs = require('fs');
const ncp = require('ncp').ncp;
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const urijs = require('urijs');
const cheerio = require('cheerio');
const express = require('express');
const rewrite = require('express-urlrewrite');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const publicPath = require('../config.js').prod.publicPath;

const domain = 'http://localhost:3000';

const urlsBucket = new Set();
const parsedUrls = new Set();

const dist = '.tmp'; // Output directory

const whitelist = {
  protocol: [
    /https?/i,
  ],
  host: [
    /localhost:3000(:\d*)?/i,
  ],
  // Only accept .html or URLs without extensions
  suffix: [
    /^$/,
    /html/,
  ],
};

const blacklist = {
  path: [],
};

function urlToAbsolute(url = '') {
  // Transorm relative path into absolute
  if (url.indexOf('/') === 0) {
    return domain + url;
  }
  return url;
}

function filterUrl(url) {
  // eslint-disable-next-line no-param-reassign
  url = urlToAbsolute(url);

  const uriObject = urijs(url);
  const path = uriObject.path();
  const protocol = uriObject.protocol();
  const host = uriObject.host();
  const suffix = uriObject.suffix();

  return whitelist.protocol.some(protocolRegex => protocol.match(protocolRegex)) &&
    whitelist.host.some(hostRegex => host.match(hostRegex)) &&
    whitelist.suffix.some(suffixRegex => suffix.match(suffixRegex)) &&
    !blacklist.path.some(pathRegex => path.match(pathRegex));
}

function cleanURL(URL) {
  return URL
    .replace(/^\s*/, '')
    .replace(/^\((.*)\)$/, '$1')
    .replace(/&amp;/gi, '&')
    .replace(/&#38;/gi, '&')
    .replace(/&#x00026;/gi, '&')
    .split('#')
    .shift()
    .trim();
}

// Entry URLs
urlsBucket.add(urlToAbsolute(publicPath).toLowerCase());

function* run() {
  // eslint-disable-next-line new-cap
  const nightmare = Nightmare({
    show: false,
    webPreferences: {
      images: false,
      webgl: false,
      webaudio: false,
      partition: 'nopersist',
    },
  });

  yield nightmare
    .viewport(1366, 768)
    .on('crashed', () => {
      console.log('CRASHED');
    });

  while (urlsBucket.size > 0) {
    // Pull next URL from bucket
    const url = urlsBucket.values().next().value;
    urlsBucket.delete(url);
    parsedUrls.add(url);

    console.log(`Opening ${url}`);

    yield nightmare
      .filter({
        urls: ['*://europa.eu/webtools/*'],
      }, (details, cb) => cb({ cancel: true }))
      .goto(url)
      .wait(100);

    const page = yield nightmare
      .evaluate(() => ({
        uri: window.location.pathname,
        content: `<!doctype html>${document.documentElement.outerHTML}`,
      }));

    if (url !== urlToAbsolute(page.uri)) {
      console.log('Redirection caught');
      parsedUrls.add(urlToAbsolute(page.uri).toLowerCase());
    }

    console.log(`Page evaluated: ${page.uri}`);

    if (page.content) {
      console.log('Remaining:', urlsBucket.size);
      console.log('Parsed', parsedUrls.size);

      // Get all links
      const $ = cheerio.load(page.content);
      const links = $('a');
      $(links).each((i, link) => {
        if ($(link).attr('href')) {
          const testedUrl = cleanURL($(link).attr('href')).toLowerCase();
          if (testedUrl && filterUrl(testedUrl) && parsedUrls.has(urlToAbsolute(testedUrl)) === false && urlsBucket.has(urlToAbsolute(testedUrl)) === false) {
            urlsBucket.add(urlToAbsolute(testedUrl));
          }
        }
      });

      // Guess filename
      const uri = urijs(page.uri).pathname();

      let dirname = uri.substr(1, uri.lastIndexOf('/') - 1);
      let filename = uri.substring(uri.lastIndexOf('/') + 1);
      // Force extension rewriting
      if (filename.lastIndexOf('.') > -1) {
        filename = `${filename.substr(0, filename.lastIndexOf('.'))}.html`;
      } else {
        filename = 'index.html';
        dirname = uri.substr(1);
      }

      if (filename.trim('/').length === 0) {
        filename = 'index.html';
      }

      const dir = `${dist}/${dirname}`.replace(publicPath, '/');

      // Finally, write the result
      mkdirp.sync(dir);
      fs.writeFile(`${dir}/${filename}`, page.content, 'utf8', () => {
        console.log(`-> ${dir}/${filename} written`);
      });
    } else {
      console.log('No content received!');
    }
  }

  yield nightmare.end();
}


const app = express();

app.use(rewrite(`${publicPath}*`, '/$1'));
app.use(history({
  index: '/index.html',
}));
app.use(serveStatic('./build'));
const server = app.listen(3000);

vo(run)((err) => {
  if (err) {
    console.log(err);
    throw err;
  }

  server.close();

  // Merge
  ncp(dist, 'build', (copyErr) => {
    if (copyErr) {
      throw copyErr;
    }

    rimraf(dist, (rmErr) => {
      if (rmErr) {
        throw rmErr;
      }

      console.log('done!');
      process.exit(0);
    });
  });
});
