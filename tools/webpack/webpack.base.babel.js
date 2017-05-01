/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = options => ({
  devtool: options.devtool,
  context: path.resolve(__dirname, '../..'),
  target: 'web', // Make web variables accessible to webpack, e.g. window

  entry: options.entry,

  output: Object.assign({
    path: path.resolve(process.cwd(), 'build'),
  }, options.output), // Merge with env dependent settings

  resolve: {
    modules: ['app', 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.json',
    ],
    mainFields: [
      'jsnext:main',
      'main',
    ],
    unsafeCache: true,
  },

  resolveLoader: {
    alias: {
      markdown: path.resolve(__dirname, './loaders/markdown-loader/index.js'),
      browserconfig: path.resolve(__dirname, './loaders/browserconfig-loader/index.js'),
      speakers: path.resolve(__dirname, './loaders/speakers-loader/index.js'),
      gallery: path.resolve(__dirname, './loaders/gallery-loader/index.js'),
      events: path.resolve(__dirname, './loaders/events-loader/index.js'),
      stands: path.resolve(__dirname, './loaders/stands-loader/index.js'),
    },
    moduleExtensions: ['-loader'],
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      include: path.join(__dirname, '../../app'),
      use: [{
        loader: 'babel-loader',
        options: options.babelQuery,
      }],
    }, {
      test: /\.scss$/,
      loader: options.sassLoaders,
    }, {
      // Transform our own .css files with PostCSS and CSS-modules
      test: /\.css$/,
      exclude: /node_modules/,
      loader: options.cssLoaders,
    }, {
      // Do not transform vendor's CSS with CSS-modules
      // The point is that they remain in global scope.
      // Since we require these CSS files in our JS or CSS files,
      // they will be a part of our compilation either way.
      // So, no need for ExtractTextPlugin here.
      test: /\.css$/,
      include: /node_modules/,
      loaders: ['style-loader', 'css-loader'],
    }, {
      test: /\.md$/,
      loader: 'markdown',
    }, {
      test: /\.ico$/,
      loader: 'file-loader?name=images/[hash].[ext]',
    }, {
      test: /\.(eot|ttf|woff|woff2)$/,
      loader: 'file-loader?name=fonts/[hash].[ext]',
    }, {
      test: /\.(jpe?g|png|gif|svg)$/,
      loaders: [
        'file-loader?name=images/[hash].[ext]',
        {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true,
            },
            optipng: {
              optimizationLevel: 7,
            },
            gifsicle: {
              interlaced: false,
            },
            pngquant: {
              quality: '65-90',
              speed: 4,
            },
          },
        },
      ],
    }, {
      test: /\.html$/,
      loader: 'html-loader',
    }, {
      test: /manifest.json$/,
      loader: 'file-loader?name=manifest.json!web-app-manifest-loader',
    }, {
      test: /speakers\.json$/,
      loader: 'speakers',
    }, {
      test: /gallery\.json$/,
      loader: 'gallery',
    }, {
      test: /events\.json$/,
      loader: 'events',
    }, {
      test: /stands\.json$/,
      loader: 'stands',
    }, {
      test: /browserconfig.xml/,
      loader: 'file-loader?name=browserconfig.xml!browserconfig',
    }],
  },

  plugins: options.plugins.concat([
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
      __BASENAME__: JSON.stringify(options.basename),
    }),

    new CopyWebpackPlugin([
      { from: 'app/static', to: 'static' },
    ]),
  ]),
});
