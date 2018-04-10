const webpack = require('webpack');// 引入webpack，为了插件引入方法
const path = require('path');      // 引入path，提供了一些工具函数，用于处理文件与目录的路径

module.exports = {
  // entry: './src/app.js' // 传入单个
  entry: {
    // app: './src/app.js',
    main: './src/main.js'
  },// 传入数组
  output: {
    filename: 'bundle.js', 	// 整合成单个的模块
    // filename: '[name].js',		// 输出对应的名字的js
    path: __dirname + '/static' // 输出路径
  },
  // Loader引入，在 import 或"加载"模块时预处理文件
  module: {
    rules: [
      {
          test: /(\.jsx|\.js)$/,// 匹配正则规则，遇到js时候
          use: {
              loader: "babel-loader" // ES6编译
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
	          { loader: 'style-loader' },
	          // css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能
	          {
	            loader: 'css-loader',
	            options: {
                modules:true
                // root: /, // 解析 URLs 路径, URLs 以 / 开头将不会被翻译
                // modules:false, // 启用/禁用 css-modules 模式
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
  // 开启source-map可生成js/less对应位置，方便调试
  // 可console.log查看控制台匹配的js文件在哪里生成
  // 四种模式请自行查询source-map，cheap-module-source-map，eval-source-map，cheap-module-eval-source-map
  // devtool: 'source-map',
  // 本地服务器
  // 使用webpack-dev-server --open命令开启
  // 记得npm安装webpack-cli及该服务器包
  devServer: {
    port:'8888',//  设置默认监听端口，如果省略，默认为”8080“
    contentBase: "./",// 本地服务器所加载的页面所在的目录
    historyApiFallback: true,// 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    inline: true// 实时刷新
  }
};

