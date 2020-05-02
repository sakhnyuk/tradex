/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'development',

  output: {
    path: path.resolve(__dirname, '..', 'src/dist'),
    filename: isProd ? '[name].prod.js' : '[name].dev.js',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },

  node: {
    __dirname: false,
    __filename: false,
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  devtool: 'source-map',
  plugins: [],
};
