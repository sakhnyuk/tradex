/* eslint-disable @typescript-eslint/no-var-requires */

const { dependencies } = require('../package.json');

module.exports = {
  externals: [...Object.keys(dependencies || {})],

  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  plugins: [],
};
