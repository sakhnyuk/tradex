/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const merge = require('webpack-merge');
const { spawn } = require('child_process');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

const baseConfig = require('./webpack.renderer.config');

const port = 2003;

module.exports = merge.smart(baseConfig, {
  plugins: [
    new ErrorOverlayPlugin(),
    new webpack.HotModuleReplacementPlugin({
      multiStep: false,
    }),
  ],
  entry: {
    renderer: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:${port}/`,
      'webpack/hot/only-dev-server',
      require.resolve('../src/renderer/index.tsx'),
    ],
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devServer: {
    port,
    compress: true,
    noInfo: true,
    stats: 'errors-only',
    inline: true,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false,
    },
    before() {
      if (process.env.START_HOT) {
        console.log('Starting main process');
        spawn('npm', ['run', 'start-main-dev'], {
          shell: true,
          env: process.env,
          stdio: 'inherit',
        })
          .on('close', code => process.exit(code))
          .on('error', spawnError => console.error(spawnError));
      }
    },
  },
});
