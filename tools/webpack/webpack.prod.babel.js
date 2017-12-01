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
  entry: [path.join(process.cwd(), 'app/main.jsx')],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    publicPath: config.prod.publicPath,
  },

  // We use ExtractTextPlugin so we get a seperate CSS file instead
  // of the CSS being in the JS and injected as a style tag
  cssLoaders: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader?-autoprefixer&modules&importLoaders=1!postcss-loader',
  }),
  // "-autoprefixer": we don't want to remove the prefixes added by Autoprefixer when minifying
  sassLoaders: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader?-autoprefixer&modules&importLoaders=1!postcss-loader!sass',
  }),

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        publicPath: config.prod.publicPath,
        postcss: [
          cssnext(),
          postcssReporter({
            clearMessages: true,
          }),
        ],
      },
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      children: true,
      minChunks: 2, // Infinity
      async: true,
    }),

    // Minify and optimize the JavaScript
    new webpack.optimize.UglifyJsPlugin({
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
      production: true,
    }),

    // Extract the CSS into a seperate file
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
    }),

    // Put it in the end to capture all the HtmlWebpackPlugin's
    // assets manipulations and do leak its manipulations to HtmlWebpackPlugin
    new OfflinePlugin({
      publicPath: config.prod.publicPath,
      relativePaths: false,
      caches: {
        main: ['index.html', 'main.*'],
        additional: ['*.chunk.js', ':rest:'],
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
