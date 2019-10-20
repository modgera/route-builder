const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: './.env.production',
    }),
    new MiniCssExtractPlugin({
      filename: 'public/styles/[name].bundle.css',
      chunkFilename: '[id].css',
    }),
  ],
  devServer: {
    contentBase: './dist',
  },
};
