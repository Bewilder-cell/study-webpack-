
const path = require('path');
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
        {test:/.js$/,   //匹配所有.js文件
        use:'babel-loader'},{
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
    }
    ],
   
},
plugins:[
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './dist/index.html'),
    })
]
}