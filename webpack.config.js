const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');

const plugins = [];
plugins.push(new WebpackNotifierPlugin());

module.exports = {
  name: 'client',
  target: 'node',
  entry: './src/index.js',
  // mode: 'production',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: 'index.js',
    library: 'SfdcOrgCompare',
    publicPath: '/bin/'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    noParse: /update-notifier/,
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: plugins,
  bail: true
};
