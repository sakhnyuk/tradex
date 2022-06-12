import * as webpack from 'webpack';
import 'webpack-dev-server';
import { merge } from 'webpack-merge';
import { spawn } from 'child_process';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import rendererConfig from './webpack.renderer.config';

const port = 2003;

const config: webpack.Configuration = merge(rendererConfig, {
  devtool: 'source-map',

  plugins: [
    // new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],

  entry: {
    renderer: [require.resolve('../src/renderer/index.tsx')],
  },

  devServer: {
    port,
    compress: true,
    hot: true,
    historyApiFallback: true,

    client: {
      logging: 'warn',
      overlay: {
        warnings: true,
        errors: true,
      },
    },

    setupMiddlewares: (middlewares) => {
      if (process.env.START_HOT) {
        console.log('Starting main process');
        spawn('npm', ['run', 'start-main-dev'], {
          shell: true,
          env: process.env,
          stdio: 'inherit',
        })
          .on('close', (code) => process.exit(code || 0))
          .on('error', (spawnError) => console.error(spawnError));
      }

      return middlewares;
    },
  },
});

export default config;
