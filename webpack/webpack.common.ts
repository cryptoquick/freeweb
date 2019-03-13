import * as path from 'path'
import * as webpack from 'webpack'

export default {
  entry: {
    background: path.join(__dirname, '../src/background.ts'),
    index: path.join(__dirname, '../src/index.tsx'),
    options: path.join(__dirname, '../src/options.tsx'),
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'initial',
      name: 'vendor',
    },
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist/js'),
  },
  plugins: [
    // exclude locale files in moment
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
}
