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
