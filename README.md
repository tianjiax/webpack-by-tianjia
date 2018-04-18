# [webpack](https://www.webpackjs.com/)
> webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。[引用来自于webpack官网](hhttps://www.webpackjs.com/concepts/)

Webpack有一个不可不说的优点，它把所有的文件都都当做模块处理，JavaScript代码，CSS和fonts以及图片等等通过合适的loader都可以被处理。

### 相关资料
- [webpack教程 阮一峰](https://github.com/ruanyf/webpack-demos)
- [webpack入门](https://segmentfault.com/a/1190000006178770)

### 四个核心概念
> 它是高度可配置的，但是，在开始前你需要先理解四个核心概念：
- [入口(entry)](https://www.webpackjs.com/concepts/#%E5%85%A5%E5%8F%A3-entry-)
- [输出(output)](https://www.webpackjs.com/concepts/#%E5%87%BA%E5%8F%A3-output-)
- [loader](https://www.webpackjs.com/concepts/#loader)
- [插件(plugins)](https://www.webpackjs.com/concepts/#%E6%8F%92%E4%BB%B6-plugins-)

### 相关报错处理

webpack升级到4.0.1以上，执行webpack命令报错：
```
The CLI moved into a separate package: webpack-cli.
Please install 'webpack-cli' in addition to webpack itself to use the CLI.
```
这时候需要全局及本地项目安装webpack-cli便可。


### webpack的插件使用
> 下面附上自己写的简单的一个webpack.config.js文件，希望对你的开发能有帮助。

```js
const webpack = require('webpack');// 引入webpack，为了插件引入方法
const path = require('path');      // 引入path，提供了一些工具函数，用于处理文件与目录的路径

module.exports = {
  // 开启source-map可生成js/less对应位置，方便调试
  // 可console.log查看控制台匹配的js文件在哪里生成
  // 四种模式请自行查询source-map，cheap-module-source-map，eval-source-map，cheap-module-eval-source-map
  devtool: 'source-map',
  // 本地服务器
  // 使用webpack-dev-server --open命令开启
  // 记得npm安装webpack-cli及该服务器包
  devServer: {
    port:'8888',//  设置默认监听端口，如果省略，默认为”8080“
    contentBase: "./",// 本地服务器所加载的页面所在的目录
    historyApiFallback: true,
    // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    // 例如将 http://localhost:8888/111  指向到 http://localhost:8888  首页位置
    inline: true// 实时刷新
  },
  // entry: './src/app.js' // 传入单个
  entry: {
    // app: './src/app.js',
    main: './src/main.js'
  },// 传入数组
  output: {
    filename: 'bundle.js',  // 整合成单个的模块
    // filename: '[name].js',   // 输出对应的名字的js
    path: __dirname + '/static' // 输出路径
  },
  // Loader引入，在 import 或"加载"模块时预处理文件
  module: {
    rules: [
      {
          test: /(\.jsx|\.js)$/,// 匹配正则规则，遇到js时候
          use: {
              loader: "babel-loader", // ES6编译，读取.babelrc配置
              options:{
                presets: ["es2015"]
              }
          },
          // include 表示哪些目录中的 .js 文件需要进行 babel-loader
          include: [
              // path.resolve(__dirname, "/test"),
              path.resolve(__dirname, "/src")
          ],
          exclude: /node_modules/ // exclude 表示哪些目录中的 .js 文件不要进行 babel-loader
      },
      {
          test: /\.css$/, // 匹配正则规则，遇到css时候
          use: [
            // style-loader将所有的计算后的样式加入页面中
            // style-loader 将css插入到页面的style标签 
            { loader: 'style-loader'},
            // css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能
            {
              loader: 'css-loader',
              options: {
                modules:true
                // root: /, // 解析 URLs 路径, URLs 以 / 开头将不会被翻译
                // modules:false, // 启用/禁用 css-modules 模式，目的就是把模块化等等的特点带给css
                // import: true,  // 启用/禁用 @import 处理
                // url:true,  // 启用/禁用 url() 处理
                // minimize: true,  // 启用/禁用 压缩
                // sourceMap:false, // 启用/禁用 Sourcemaps // 必须开启devtool的 'source-map' 或者 'inline-source-map'
                // camelCase:false, // 导出以驼峰化命名的类名
                // importLoaders:0 // 在 css-loader 前应用的 loader 的数
              }
            }
          ]
      },
      // less编译
      {
        test: /\.less$/,
        use: [
          'style-loader',// 将css插入到页面的style标签 
          { loader: 'css-loader', options: { importLoaders: 1 } },// 用类似@import 和 url(...)的方法实现 require()的功能
          'less-loader'// less编译
          // 'style!css' loader中的(!)这个符号用于连接不同的loader的，在这里就是.css文件要被style-loader和css-loader同时处理。
        ]
      },
      // 加载图片文件为"Base64编码"的URL
      // 当超过limit时候自动使用file-loader编译
      // 可用于import图片或者less/css图片
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192     // 大小限制（以字节为单位）
              // mimetype:''  // 为文件指定MIME类型（否则从文件扩展名推断）。默认为extname  
              // fallback:''  // 当文件大于限制时指定文件的默认使用file-loader（以字节为单位）
            }
          }
        ]
      }
    ]
  },
  // 插件
  plugins: [
    // 版权插件
    new webpack.BannerPlugin('版权所有，翻版必究')
  ]
  
};

```
> 对应的package.json

```
{
  "devDependencies": {
    "css-loader": "^0.28.11",
    "file-loader": "^1.1.11",
    "less": "^3.0.1",
    "less-loader": "^4.1.0",
    "style-loader": "^0.20.3",
    "url-loader": "^1.0.1",
    "webpack": "4.5.0",
    "webpack-dev-server": "^3.1.3"
  },
  "scripts": {
    "start": "webpack",
    "server": "webpack-dev-server --open"
  }
}

```

### 代码分割
##### require.ensure
> webpack 在编译时，会静态地解析代码中的 require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。require.ensure 内部依赖于 Promises。 如果你在旧的浏览器中使用 require.ensure 请记得 去 shim Promise. es6-promise polyfill.
http://www.css88.com/doc/webpack2/guides/code-splitting-require/ 

```js
require.ensure(dependencies: String[], callback: function(require), chunkName: String)
// 依赖 dependencies
// 这是一个字符串数组，通过这个参数，在所有的回调函数的代码被执行前，我们可以将所有需要用到的模块进行声明。

// 回调 callback
// 当所有的依赖都加载完成后，webpack会执行这个回调函数。require 对象的一个实现会作为一个参数传递给这个回调函数。因此，我们可以进一步 require() 依赖和其它模块提供下一步的执行。
// chunk名称 chunkName
// chunkName 是提供给这个特定的 require.ensure() 的 chunk 的名称。通过提供 require.ensure() 不同执行点相同的名称，我们可以保证所有的依赖都会一起放进相同的 文件束(bundle)。
```

##### bundle-loader
```js
// 当你引用 bundle 的时候，chunk 会被浏览器加载。
var waitForChunk = require("bundle-loader!./file.js");

// 为了等待 chunk 的加载完成 (而且为了拿到 exports 输出)
// 你需要异步去等待它
waitForChunk(function(file) {
    // 这里可以使用file，就像是用下面的代码require进来一样
    // var file = require("./file.js");
});
// 将 require 包裹在 require.ensure 的代码块中

// Multiple callbacks can be added. They will be executed in the order of addition.
waitForChunk(callbackTwo);
waitForChunk(callbackThree);
// If a callback is added after dependencies were loaded, it will be called immediately.
```
> 当你引用 bundle 的时候，chunk 会被浏览器加载。如果你想它懒加载，请用：

```js
var load = require("bundle-loader?lazy!./file.js");

// bundle 不会被加载，除非你调用了 call 函数
load(function(file) {

});
```