import webpack from 'webpack';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import baseConfig from './webpack.base.config';

const config: webpack.Configuration = merge(baseConfig, {
  target: 'electron-renderer',

  resolve: {
    alias: {
      app: '/src/renderer',
      core: '/src/core',
      main: '/src/main',
      adapters: '/src/adapters',
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [ReactRefreshTypeScript()],
            }),
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },

      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              limit: 10000,
            },
          },
        ],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/renderer/index.html',
    }),
    new ReactRefreshWebpackPlugin(),
  ],
});

export default config;
