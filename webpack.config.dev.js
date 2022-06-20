
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 单入口文件
// module.exports = {
// entry: './src/index.js',
// output: {
// //导出到dist文件夹下的bundle.js文件
//     path:path.join(__dirname,'dist'),
//     filename: 'bundle.js'
// },
// mode: 'development',
// }
// 多入口文件
module.exports = {
// watch:true,
//    watchOptions : {
//     exclude: /node_modules/,
//     poll: 1000,//轮询文件是否发生变化的时间，默认1000ms，没秒1000次
//     aggregateTimeout: 500,//见听到文件变化时再过500ms去执行，默认500ms
//    },
entry: {
    index: './src/index.js',
    other: './src/other.js'
},
output: {
//导出到dist文件夹下的bundle.js文件
    path:path.join(__dirname,'dist'),
    //利用[name]占位符来对多入口文件进行命名
    filename: '[name].js'
},
mode: 'development',
module:{
    rules:[
    {  
        test:/.js$/,   //匹配所有.js文件
        use: 'babel-loader?cacheDirectory', // 缓存loader执行结果 发现打包速度已经明显提升了
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src') // 精确指定要处理的目录
    },{
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
    },{
        test:/.(png|jpg|jpeg|gif)$/,
        use:'file-loader'
    }
    ],
   
},
plugins:[
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'dist/index.html'),
    }),new webpack.HotModuleReplacementPlugin()
],
devServer:{
    static:{
      directory:path.join(__dirname,'dist')
    },
    // contentBase: path.join(__dirname, 'dist'),
    hot:true
}
}