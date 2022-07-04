import * as path from 'path';
import * as webpack from 'webpack';

const isProd = process.env.NODE_ENV === 'production';

const config: webpack.Configuration = {
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
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
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

export default config;
