const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    // dirname 是当前文件所在目录的路径
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[contenthash].bundle.js",
    clean: true, // 清空上次打包的文件
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /node_modules/, // 排除 node_modules 目录下的文件
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                // { modules: false }, // 不转换 ES6 模块为 CommonJS 模块，保留 ES6 模块语法，方便 tree-shaking(默认值为 false)
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin(), // 清除上次打包的文件
    // 生成 index.html 文件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    // 打包分析
    new BundleAnalyzerPlugin({
      analyzerMode: "server",
      openAnalyzer: false,
    }),
  ],
  resolve: {
    extensions: [".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
};
