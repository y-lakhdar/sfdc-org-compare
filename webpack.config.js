const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  name: 'client',
  target: 'node',
  entry: './src/index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: 'index.js',
    library: 'SfdcOrgCompare',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    publicPath: '/bin/'
  },
  resolve: {
    extensions: ['.js']
  },
  externals: {
    'cli-table': 'cli-table',
    'extract-zip': 'extract-zip',
    'fs-extra': 'fs-extra',
    'recursive-readdir': 'recursive-readdir',
    chalk: 'chalk',
    commander: 'commander',
    inquirer: 'inquirer',
    underscore: 'underscore'
  },
  module: {
    noParse: /update-notifier/,
    rules: [
      {
        test: /\.js$/,
        exclude: [/(node_modules)/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new WebpackNotifierPlugin(),
    new CopyPlugin([{ from: path.resolve(__dirname, 'client-global.js'), to: path.resolve(__dirname, 'bin', 'client-global.js') }])
  ],
  bail: true
};
