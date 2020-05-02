/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');

const baseConfig = require('./webpack.renderer.config');

module.exports = merge.smart(baseConfig, {
  mode: 'production',

  target: 'electron-preload',

  devtool: 'source-map',

  entry: {
    renderer: require.resolve('../src/renderer/index.tsx'),
  },

  output: {
    path: path.join(__dirname, '..', 'src/dist'),
    filename: 'renderer.prod.js',
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG_PROD: false,
      E2E_BUILD: false,
    }),

    // Add assets to dist folder for resoling images in prod
    new CopyPlugin([{ from: 'src/assets', to: 'assets' }]),
  ],
});
