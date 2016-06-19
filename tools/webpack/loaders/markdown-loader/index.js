const loaderUtils = require('loader-utils');
const markdownIt = require('markdown-it');
const frontMatter = require('front-matter');

// Default options
const defaultOptions = {
  // Enable HTML tags in source
  html: true,

  // Use '/' to close single tags (<br />).
  // This is only for full CommonMark compatibility.
  xhtmlOut: false,

  // Convert '\n' in paragraphs into <br>
  breaks: false,

  // CSS language prefix for fenced blocks. Can be useful for external highlighters.
  langPrefix: 'language-',

  // Autoconvert URL-like text to links
  linkify: true,

  // Enable some language-neutral replacement + quotes beautification
  typographer: true,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externaly.
  // If result starts with <pre... internal wrapper is skipped.
  highlight: () => '',
};

module.exports = function markdownLoader(source) {
  this.cacheable();

  const query = loaderUtils.parseQuery(this.query);
  const configKey = query.config || 'markdownLoader';
  const options = Object.assign({}, defaultOptions, query, this.options[configKey]);
  const md = markdownIt(options);

  const meta = frontMatter(source);
  const body = md.render(meta.body);
  const result = Object.assign({}, meta.attributes, {
    body,
  });

  this.value = result;
  return `module.exports = ${JSON.stringify(result)}`;
};
