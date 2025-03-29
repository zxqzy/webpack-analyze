const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    // dirname 是当前文件所在目录的路径
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].bundle.js',
    clean: true,
  },
  plugins: [
    new CleanWebpackPlugin(), // 清除上次打包的文件
    // 生成 index.html 文件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    // 打包分析
    new BundleAnalyzerPlugin({
      analyzerMode: "server",
      openAnalyzer: "true",
    }),
  ],
};
