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
      {
        test: /\.css$/,
        use: [
          "style-loader", // 将 CSS 插入到 DOM 中
          "css-loader", // 解析 CSS 文件
          "postcss-loader", // 处理 CSS 前缀
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     postcssOptions: {
          //       plugins: [
          //         [
          //           "postcss-preset-env",
          //           {
          //             stage: 0, // 使用最新的 CSS 特性
          //             autoprefixer: true, // 自动添加浏览器前缀
          //             features: {
          //               "nesting-rules": true, // 支持嵌套规则
          //             },
          //           },
          //         ],
          //       ],
          //     },
          //   },
          // },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
       use: [
          {
            loader: "url-loader",
            options: {
              limit: 8 * 1024, // 小于 8kb 的图片转为 base64 格式，大于 8kb 的图片使用 file-loader 转为文件格式
              name: "[name].[hash:8][ext]", // 图片输出路径
              outputPath: "assets/images", // 图片输出路径
              // esModule: false, // 使用 CommonJS 模块语法，解决图片路径问题
            },
          },
          // {
          //   loader: "image-webpack-loader",
          //   options: {
          //     webp: {
          //       quality: 75,
          //     },
          //   },
          // }, // 待验证
        ],
        // type: "asset",
        // generator: {
        //   filename: "assets/images/[name].[hash:8][ext]", // 图片输出路径
        // },
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 8 * 1024, // 小于 8kb 的图片转为 base64 格式
        //   },
        // },
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
