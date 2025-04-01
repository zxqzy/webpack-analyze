const common = require('./webpack.common')
const { merge } = require('webpack-merge')

module.exports = () =>
  merge(common, {
    mode: 'production',
    optimization: {
      runtimeChunk: 'single', // 将运行时代码提取到单独的文件中，默认是 false
      splitChunks: {
        // chunks: "all", // 将所有的 chunk 都进行分离
        chunks: 'async', // 只对异步加载的 chunk 进行分离, 默认是 async
        // chunks: "initial", // 只对初始加载的 chunk 进行分离
        // minSize: 0, // 最小尺寸，默认是 30kb
        // maxSize: 0, // 最大尺寸，默认是 0，表示不限制
        // minChunks: 2, // 最小 chunk 数量，默认是 1 - 高版本已失效
        maxAsyncRequests: 30, // 最大异步请求数量，默认是 30
        maxInitialRequests: 30, // 最大初始请求数量，默认是 30
        automaticNameDelimiter: '~', // 自动命名分隔符，默认是 ~
        cacheGroups: {
          vendors: {
            chunks: 'initial',
            test: /[\\/]node_modules[\\/]/, // 匹配 node_modules 目录下的文件
            name: 'vendors', // 打包后的文件名
            priority: -10, // 优先级，数字越大越优先
            reuseExistingChunk: true, // 重用已存在的 chunk
            enforce: true, // 强制打包
          },
          asyncVendors: {
            chunks: 'async',
            test: /[\\/]node_modules[\\/]/, // 匹配 node_modules 目录下的文件
            name: 'asyncVendors', // 打包后的文件名
            priority: -10, // 优先级，数字越大越优先
            reuseExistingChunk: true, // 重用已存在的 chunk
            enforce: true, // 强制打包
          },
          commons: {
            minChunks: 2,
            name: 'commons', // 打包后的文件名
            priority: -10,
            reuseExistingChunk: true,
            enforce: true, // 强制打包
          },
        },
      },
    },
  })
