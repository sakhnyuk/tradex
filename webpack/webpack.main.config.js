/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const baseConfig = require('./webpack.base.config');

module.exports = merge.smart(baseConfig, {
  mode: 'development',
  target: 'electron-main',
  entry: {
    main: './src/main/main.dev.ts',
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        use: 'node-loader',
      },
      // {
      //   test: /\.[jt]sx?$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: 'babel-loader',
      //       options: {
      //         cacheDirectory: true,
      //       },
      //     },
      //     'ts-loader',
      //   ],
      // },
      {
        test: /\.ts(x?)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  output: {
    path: path.join(__dirname, '..', 'dist'),
    libraryTarget: 'commonjs2',
    filename: '[name].dev.js',
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin({
      reportFiles: ['src/main/**/*'],
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
});
