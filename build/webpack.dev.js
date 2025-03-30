const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const path = require("path");
// const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  // devtool: "source-map", // 生成 source-map 文件，方便调试，cheap-source-map 只会生成行号，不会生成列号，速度快，体积小
 // 生产环境默认已配置
  optimization: {
    usedExports: true, // tree-shaking，只是用来标记哪些模块是用到的，实际打包时不会删除未使用的代码，开发环境看 tree-shaking 是否生效的标记
    // minimize: true, // 是否压缩代码,包括去除注释和空格等
    // minimizer: [new TerserPlugin({ // 配置更灵活，精确控制代码的压缩和优化
    //   terserOptions: {
    //     compress: {
    //       unused: true, // 删除未使用的代码，显示配置也不一定有用，热更新的原因，只可能删除部分;生成的代码业余 devtool 的配置有关
    //     },
    //   },
    //   extractComments: false, // 是否提取版权信息
    // })],
  },
  devServer: {
    static: path.join(__dirname, "../dist"), // 静态文件目录
    port: 3000,
    hot: true,
    // open: true, // 自动打开浏览器
    historyApiFallback: true, // 支持 history 模式的路由，解决刷新页面 404 的问题
    devMiddleware: {
      writeToDisk: true, // 允许写入到磁盘
    },
  },
});
