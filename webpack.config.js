const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {resolve} = require('path');

module.exports = {
  context: resolve('src'),
  entry: {
    'polyfills': './polyfills.ts',
    'vendor': './vendor.ts',
    'main': './main.ts'
  },
  resolve: {
    modules: ['./node_modules'],
    extensions: ['.ts', '.js']
  },
  output: {
    path: resolve('dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
        exclude: [/node_modules/, /\.(spec|e2e)\.ts$/]
      },
      { 
        test: /\.(html|css)$/, 
        loader: 'raw-loader'
      },
    ]
  },
  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      resolve('src'),
      {}
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['main', 'vendor', 'polyfills']
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};
