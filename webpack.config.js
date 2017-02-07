const webpack = require('webpack');
const {resolve} = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const webpackValidator = require('webpack-validator')
const {getIfUtils, removeEmpty} = require('webpack-config-utils')
const OfflinePlugin = require('offline-plugin')

module.exports = env => {
  const {ifProd, ifNotProd} = getIfUtils(env)
  const config = webpackValidator({
    context: resolve('src'),
    entry: {
      'polyfills': './polyfills.ts',
      'vendor': './vendor.ts',
      'main': './main.ts'
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    output: {
      path: resolve('dist'),
      filename: ifProd('bundle.[name].[chunkhash].js', 'bundle.[name].js'),
      pathinfo: ifNotProd(),
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
    plugins: removeEmpty([
      // Workaround for angular/angular#11580
      new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        resolve('src'),
        {}
      ),
      new ProgressBarPlugin(),
      ifProd(new InlineManifestWebpackPlugin()),
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'polyfills'],
      })),
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      new OfflinePlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: ifProd('"production"', '"development"')
        }
      }),
    ]),
  })
  return config;
};
