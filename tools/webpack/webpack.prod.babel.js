// Important modules this config uses
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

// Configuration
const config = require('../config');

// PostCSS plugins
const cssnext = require('postcss-cssnext');
const postcssReporter = require('postcss-reporter');

module.exports = require('./webpack.base.babel')({
  basename: config.prod.basename,
  // In production, we skip all hot-reloading stuff
  entry: [
    path.join(process.cwd(), 'app/main.js'),
  ],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    publicPath: config.prod.publicPath,
  },

  // We use ExtractTextPlugin so we get a seperate CSS file instead
  // of the CSS being in the JS and injected as a style tag
  cssLoaders: ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader',
    loader: 'css-loader?-autoprefixer&modules&importLoaders=1!postcss-loader',
  }),
  // "-autoprefixer": we don't want to remove the prefixes added by Autoprefixer when minifying
  sassLoaders: ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader',
    loader: 'css-loader?-autoprefixer&modules&importLoaders=1!postcss-loader!sass',
  }),

  // In production, we minify our CSS with cssnano
  postcssPlugins: [
    cssnext(),
    postcssReporter({
      clearMessages: true,
    }),
  ],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      children: true,
      minChunks: 2,
      async: true,
    }),


    // OccurrenceOrderPlugin is needed for long-term caching to work properly.
    // See http://mxs.is/googmv
    new webpack.optimize.OccurrenceOrderPlugin(true),

    // Merge all duplicate modules
    new webpack.optimize.DedupePlugin(),

    // Minify and optimize the JavaScript
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false, // ...but do not show warnings in the console (there is a lot of them)
        screw_ie8: true,
      },
    }),

    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'app/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),

    // Extract the CSS into a seperate file
    new ExtractTextPlugin('[name].[contenthash].css'),

    // Put it in the end to capture all the HtmlWebpackPlugin's
    // assets manipulations and do leak its manipulations to HtmlWebpackPlugin
    new OfflinePlugin({
      publicPath: config.prod.publicPath,
      relativePaths: false,
      caches: {
        main: ['index.html', 'main.*'],
        additional: [':rest:'],
      },
      // Removes warning for about `additional` section usage
      safeToUseOptionalCaches: true,
      // AppCache specific
      AppCache: {
        // Starting from offline-plugin:v3, AppCache by default caches only
        // `main` section. This lets it use `additional` section too
        caches: ['main', 'additional'],
      },
      // ServiceWorker
      ServiceWorker: {
        events: true,
      },
    }),
  ],
});
