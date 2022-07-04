/* eslint-disable @typescript-eslint/no-var-requires */
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import baseConfig from './webpack.base.config';

const config: webpack.Configuration = merge(baseConfig, {
  devtool: 'source-map',

  target: 'electron-main',

  entry: {
    main: './src/main/main.dev.ts',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
});

export default config;
