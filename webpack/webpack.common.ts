import * as path from 'path'
import * as webpack from 'webpack'

export default {
  entry: {
    index: path.join(__dirname, '../src/index.tsx'),
    options: path.join(__dirname, '../src/options.tsx'),
    background: path.join(__dirname, '../src/background.ts'),
  },
  output: {
    path: path.join(__dirname, '../dist/js'),
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    // exclude locale files in moment
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
}
