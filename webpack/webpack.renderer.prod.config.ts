/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import CopyPlugin from 'copy-webpack-plugin';
import rendererConfig from './webpack.renderer.config';

const config = merge(rendererConfig, {
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
    new CopyPlugin({ patterns: [{ from: 'src/assets', to: 'assets' }] }),
  ],
});

export default config;
