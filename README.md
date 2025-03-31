1. webpack 会默认使用 src/index 文件作为入口文件，dist/main 作为输出文件
2. webpack 会记录模块路径以及模块具体执行方法的映射,开发环境打包后能够清楚看到
3. 生产环境会默认开启 tree-shaking，开发环境不会，开发环境可以通过配置开启，但不建议，因为开发环境要热更新
4. sideEffects 的作用：告诉 webpack 某些模块没有副作用，默认是所有模块都有副作用，只要导入后没有使用相关模块，wepack 会直接 tree-shaking 掉，但如果使用了相关模块，副作用的代码依旧会执行；一般引入 css 文件需要单独告诉为副作用文件（优化的场景是导入未使用且无副作用的情况）
5. TerserPlugin 的作用：压缩或优化代码，具体见 webpack.dev.js
6. devtool:
7. lodash 包本身不能被 tree-shaking, lodash-es 库可以
    1. 保留 es-module 本身的代码，怎么兼容老浏览器呢
        - webpack 会处理 import export，让其兼容老浏览器
    2. 为什么非 ESM 的库，无法 tree-shaking 呢
        - tree-shaking 的依据就是静态导入 import export
8. 按需导入的写法，webpack 如何解析 import 然后 tree-shaking
    - 直接 default 引入还是直接引入部分打包后都只包含使用了的代码
    - 直接引用没有使用且被声明了无副作用的模块会被直接 tree-shaking
9. 动态导入的模块如何 tree-shaking 呢
    - webpack 魔法注释可以为静态分析提供场景，如打包成多语言包：'./locale/${language}'
    - 魔法注释可以配置预加载和预读取，区别为提前加载关键资源与空闲加载下一页的资源，preload & prefetch
    - 若设置了模块没有副作用，副作用的代码会被 tree-shaking 掉
10. webpack 解析图片资源可以使用 file-loader & url-loader 或者内置的 asset
    - file-loader: 将文件输出到指定目录并且返回文件路径
    - url-loader: 在 file-loader 的基础上增加了文件转 base64 的功能
    - asset: webpack5 新增的资源模块语法
        - asset/resource: file-loader
        - asset/inline: 把资源转成 base64 路径
        - asset: 大文件 file-loader, 小文件可以转 base-64
11. 给 css 加前缀，或者使用新的 css 新的语法可以使用 postcss，需要用到一系列相关的包：
    - postcss-loader: webpack 集成 postcss 的方式
    - postcss: 核心库，提供 CSS 解析和处理的底层能力，css 会被转换成 AST,然后通过插件机制对 AST 进行修改，最后转换成 CSS 代码
    - autoprefixer: postcss 插件，通过 browserslist 配置，给浏览器加前缀
    - postcss-preset-env: postcss 插件集合，默认包含 autoprefixer, 可以将新语法转换成兼容性更好的 CSS, 比如嵌套语法，目标是向前兼容
    - cssnano: 压缩和优化 CSS 代码，用于生产环境：
        - 删除注释、空白
        - 合并重复的 CSS 规则
        - 缩短颜色值
    - postcss-modules: postcss 支持模块化的插件，转换类名，防止全局污染，但一般直接使用 css-loader 支持的 modules, 除非项目与 postcss 深度集成
12. 验证 postcss 是否正确配置的方式
    - 检查配置，新版浏览器已经支持，不会添加前缀，可以使用在线工具：https://autoprefixer.github.io/ 验证
    - npx browserlist 可以检查配置的浏览器包含哪些
    - 看打包后的文件是否包含 -webkit- ，或者 -moz- 等前缀
    - 确定构建结果是最新的，缓存清理等
13. 代码构建过程中的代码不一定都打包到最终的 js 文件，只是跟运行时打包的文件才会打包，比如 css-loader, style-loader