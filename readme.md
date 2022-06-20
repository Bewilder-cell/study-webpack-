# 基础

##### *学习了一周的web pack,后面很深越学越脱离实际，在日常前端开发中感觉主要是学会loader和plugins在项目中的作用，能够合理的使用官方维护的常用的loader个plugins足够满足我自己的开发。之后我可能会多去结合项目来做一些webpack的优化。重点不是难在知识点而是在项目的应用上*

webpack一般存在于node_modules/.bin/webpack如果我们想要去打包，需要运行node_modules/.bin/webpack.js这个文件或者我们用package.json文件中去定义脚本："build":"webpack".因为package.json默认可以访问到node_modules下面的文件。

Objectives:能够学会独立打包一个多入口的页面应用，了解最常用的webpack中的loader和plugin

多页面入口的优势：https://cloud.tencent.com/developer/article/1607466

webpack如何解析jsx文件呢，es6文件如何去解析，请聊聊你的看法？我不会长大后在学？

 今天面试就到这了，你还有什么想问的呢？再见再见

https://www.bilibili.com/video/BV1vv4y1A77K?p=15

## 简介

![img](https://a634h3dlvi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjJmYjhkMzNkM2Q5ZmFjMjMwZTNiZWU4NTg5NzExNGZfU1VlMnhoRm9ORFVGUlMwakhPQlpnaVh4dFRWM3NpTDZfVG9rZW46Ym94Y25LWDNnRHk3QzQ4ZXVvNXlUODJGUDdkXzE2NTQ3ODE1NDg6MTY1NDc4NTE0OF9WNA)

![img](https://a634h3dlvi.feishu.cn/space/api/box/stream/download/asynccode/?code=YzAwOTAzYjA1NWI2NjBiZmVlMDU5ZTA1NGJmMGM1YjVfTjRVaU5idGRlblAyMVNWUjNlZUFtSlh4OGF2UVFmdnVfVG9rZW46Ym94Y25hVlJWWWs4eVRkb1dTSUtma1I4QTZnXzE2NTQ3ODE1NDg6MTY1NDc4NTE0OF9WNA)



### webpack优势

loder、plugin官方自己维护的非常多，生态强大，项目中可以很好的解决我们多遇到的问题，像vite利用的是rollup去构建的打包工具，采用go语言去编写的打包工具，速度很快。生态不是很多

### webpack基础组成部分

![img](https://a634h3dlvi.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2M3NTNlOGFkNWUyZmIxMGIxNzM3NDJjNWM4YTRkNDNfUFNqYWI5QmZyamtPZGcySlhRN09zSUtCTDRCZjlGcm5fVG9rZW46Ym94Y25vSHV1cFF4RVh4TmxkVXIxTEkxOE1oXzE2NTQ3ODE1NDg6MTY1NDc4NTE0OF9WNA)

### entry入口文件

webpack.config.js

```JavaScript
module.exports = {
  entry: './path/to/my/entry/file.js',
};
```

### 输出(output)

```JavaScript
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js',
  },
};
```

在上面的示例中，我们通过 `output.filename` 和 `output.path` 属性，来告诉 webpack bundle 的名称，以及我们想要 bundle 生成(emit)到哪里。可能你想要了解在代码最上面导入的 path 模块是什么，它是一个 [Node.js 核心模块](https://nodejs.org/api/modules.html)，用于操作文件路径。

### loader

webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 [模块](https://webpack.docschina.org/concepts/modules)，以供应用程序使用，以及被添加到依赖图中。

🌰像node-sass这种loader就能够让loader轻松去处理css文件，运用非常广泛 

loader有两个属性：

- test识别出哪些文件会被转换

- `use` 属性，定义出在进行转换时，应该使用哪个 loader。

```JavaScript
const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js',
  },
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
};
```

重要的是要记住，在 webpack 配置中定义 rules 时，要定义在 `module.rules` 而不是 `rules` 中。为了使你便于理解，如果没有按照正确方式去做，webpack 会给出警告。

### Plugin

loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

🌰像之前用过image-zip等等对资源打包优化等等的一些配置

想要使用一个插件，你只需要 `require()` 它，然后把它添加到 `plugins` 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 `new` 操作符来创建一个插件实例。

```JavaScript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // 用于访问内置插件

module.exports = {
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};
```

在上面的示例中，`html-webpack-plugin` 为应用程序生成一个 HTML 文件，并自动将生成的所有 bundle 注入到此文件中。

### mode

通过选择 `development`, `production` 或 `none` 之中的一个，来设置 `mode` 参数，你可以启用 webpack 内置在相应环境下的优化。其默认值为 `production`。

```JavaScript
module.exports = {
  mode: 'production',
};
```

🌰像安装依赖时我们常常会用 -- save-dev来安装我们所需要的依赖，webpack就会自动识别他并将依赖安装到我们dev版本中而不会装到我们的开发版本中

## 正式开始

![img](https://a634h3dlvi.feishu.cn/space/api/box/stream/download/asynccode/?code=N2ExZTgzZWZhYmRhNjkwNjk0MTA4MzRkODI4YjUzM2JfYW1HOU9aVmdpUXU3ajM2WGJUODRwV2V2cjY3WFVObzJfVG9rZW46Ym94Y25URE5zbjVoU0p5SExLNmg0MVBNUDVlXzE2NTQ3ODE1NDg6MTY1NDc4NTE0OF9WNA)



### 入口起点**entry points**

entry的入口写法entry: string | [string]

在webpack的webpack.config.js中

#### 单个入口写法

```JavaScript
module.exports = {
  entry: './path/to/my/entry/file.js',
};
```

#### 多个入口数组方式的写法

```JavaScript
module.exports = {
  entry: {
    main: './path/to/my/entry/file.js',
    main1:'./src/home/index.js'
  },
};
```

官方解释：

我们也可以将一个文件路径数组传递给 `entry` 属性，这将创建一个所谓的 "multi-main entry"。在你想要一次注入多个依赖文件，并且将它们的依赖关系绘制在一个 "chunk" 中时，这种方式就很有用。



#### 多个入口对象的写法

```JavaScript
module.exports = {
  entry: ['./src/file_1.js', './src/file_2.js'],
  output: {
    filename: 'bundle.js',
  },
};
//对象语法会比较繁琐。然而，这是应用程序中定义入口的最可扩展的方式
```

#### 用于描述入口的对象。你可以使用如下属性：

- `dependOn`: 当前入口所依赖的入口。它们必须在该入口被加载前被加载。

- `filename`: 指定要输出的文件名称。

- `import`: 启动时需加载的模块。

- `library`: 指定 library 选项，为当前 entry 构建一个 library。

- `runtime`: 运行时 chunk 的名字。如果设置了，就会创建一个新的运行时 chunk。在 webpack 5.43.0 之后可将其设为 `false` 以避免一个新的运行时 chunk。

- `publicPath`: 当该入口的输出文件在浏览器中被引用时，为它们指定一个公共 URL 地址。请查看 [output.publicPath](https://webpack.docschina.org/configuration/output/#outputpublicpath)。

webpack.config.js

```JavaScript
module.exports = {
  entry: {
    a2: 'dependingfile.js',
    b2: {
      dependOn: 'a2',
      import: './src/app.js',
    },
  },
```

`runtime` 和 `dependOn` 不应在同一个入口上同时使用，所以如下配置无效，并且会抛出错误：

```JavaScript
module.exports = {
  entry: {
    a2: './a',
    b2: {
      runtime: 'x2',
      dependOn: 'a2',
      import: './b',
    },
  },
};
```

确保 `runtime` 不能指向已存在的入口名称，例如下面配置会抛出一个错误：

```JavaScript
module.exports = {
  entry: {
    a1: './a',
    b1: {
      runtime: 'a1',
      import: './b',
    },
  },
}
```



### 出口output

```JavaScript
单入口文件
module.exports = {
entry: './src/index.js',
output: {
//导出到dist文件夹下的bundle.js文件
    path:path.join(__dirname,'dist'),
    filename: 'bundle.js'
},
mode: 'development',
}
```

多入口文件output的使用

```JavaScript
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
}
```

### loaders

![img](https://a634h3dlvi.feishu.cn/space/api/box/stream/download/asynccode/?code=OTY0NDdhYzI4ZDc3NjQ5ZWMxYmE5NDUzNTE4NjE1NzVfYUJJYVNpczVNQU9mTzNNa21ud2xUUzRyeGFyM3hGWmJfVG9rZW46Ym94Y243Z0dsMmpvajlaUVhuT1RsT0JzMWRvXzE2NTQ3ODE1NDg6MTY1NDc4NTE0OF9WNA)

![img](https://a634h3dlvi.feishu.cn/space/api/box/stream/download/asynccode/?code=MmUyMmM0YzU4ZTI1OGRjODhmODRmNjljZWQ3OGI3N2RfYVhydXNxNk5keElaWDRHMDU1dG9CbGlqaUZ3TlBjdjdfVG9rZW46Ym94Y25wSjJRdDh4NU13MXNJd1REajA5ekRyXzE2NTQ3ODE1NDg6MTY1NDc4NTE0OF9WNA)

```JavaScript
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' },
    ],
  },
};
```

loader的使用方式

在webpack.config.js中可以指定使用的loader

在每个 `import` 语句中显式指定 loader

#### config方式

`module.rules` 允许你在 webpack 配置中指定多个 loader。 这种方式是展示 loader 的一种简明方式，并且有助于使代码变得简洁和易于维护。同时让你对各个 loader 有个全局概览：

loader 从右到左（或从下到上）地取值(evaluate)/执行(execute)。在下面的示例中，从 sass-loader 开始执行，然后继续执行 css-loader，最后以 style-loader 为结束。查看 [loader 功能](https://webpack.docschina.org/concepts/loaders/#loader-features) 章节，了解有关 loader 顺序的更多信息

```JavaScript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // [style-loader](/loaders/style-loader)
          { loader: 'style-loader' },
          // [css-loader](/loaders/css-loader)
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          // [sass-loader](/loaders/sass-loader)
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
};
```

#### 内联方式

可以在 `import` 语句或任何 [与 "import" 方法同等的引用方式](https://webpack.docschina.org/api/module-methods) 中指定 loader。使用 `!` 将资源中的 loader 分开。每个部分都会相对于当前目录解析。

```JavaScript
import Styles from 'style-loader!css-loader?modules!./styles.css';
```

通过为内联 `import` 语句添加前缀，可以覆盖 [配置](https://webpack.docschina.org/configuration) 中的所有 loader, preLoader 和 postLoader：

- 使用 `!` 前缀，将禁用所有已配置的 normal loader(普通 loader)

```JavaScript
import Styles from '!style-loader!css-loader?modules!./styles.css';
```

- 使用 `!!` 前缀，将禁用所有已配置的 loader（preLoader, loader, postLoader）

```JavaScript
import Styles from '!!style-loader!css-loader?modules!./styles.css';
```

- 使用 `-!` 前缀，将禁用所有已配置的 preLoader 和 loader，但是不禁用 postLoaders

```JavaScript
import Styles from '-!style-loader!css-loader?modules!./styles.css';
```

loader 遵循标准 [模块解析](https://webpack.docschina.org/concepts/module-resolution/) 规则。多数情况下，loader 将从 [模块路径](https://webpack.docschina.org/concepts/module-resolution/#module-paths) 加载（通常是从 `npm install`, `node_modules` 进行加载）



### Plugin

插件 是 webpack 的 [支柱](https://github.com/webpack/tapable) 功能。Webpack 自身也是构建于你在 webpack 配置中用到的 相同的插件系统 之上！做loader做不了的事

![img](https://a634h3dlvi.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWEwMjQzNDllZGNkZjhhNjAyZDI3YzBkNjNkMTczYmNfNVhoOUxaWkpJdDlBdzdJZ0RtR0VKYzhNOFVvek5nOEJfVG9rZW46Ym94Y241Z3N3Vkx5RHlyR2UyWXloTmd5dFdmXzE2NTQ3ODE1NDg6MTY1NDc4NTE0OF9WNA)



![img](https://a634h3dlvi.feishu.cn/space/api/box/stream/download/asynccode/?code=MGI0ZGJiNDdhNDQyNTAzNjA0YmY1Y2YzODVmYjg2NDBfeUQyNG1NbHhzWDZPRExHUlBsSkVIb1RZcjA0MEdGRUJfVG9rZW46Ym94Y25FSzB2SG5VRTd3U296VmRnbXNnM01lXzE2NTQ3ODE1NDg6MTY1NDc4NTE0OF9WNA)

由于插件可以携带参数/选项，你必须在 webpack 配置中，向 `plugins` 属性传入一个 `new` 实例。

取决于你的 webpack 用法，对应有多种使用插件的方式。

```JavaScript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // 访问内置的插件
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
};
```

### mode

![img](https://a634h3dlvi.feishu.cn/space/api/box/stream/download/asynccode/?code=ODU1ZDZkZjI4OWRiNDhhMWY4ZGRhZDc3NDNjZmQ0YzlfNVhrSFZtY2FNa1V5YnA2NjJiUWlYcDU3ZERDVTg2ZUZfVG9rZW46Ym94Y25VSGtqeE5zTEtPSm5xc1ZZbGcyTUlnXzE2NTQ3ODE1NDg6MTY1NDc4NTE0OF9WNA)

如果要根据 *webpack.config.js* 中的 mode 变量更改打包行为，则必须将配置导出为函数，而不是导出对象：

```JavaScript
var config = {
  entry: './app.js',
  //...
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }

  if (argv.mode === 'production') {
    //...
  }

  return config;
};
```

## 进阶

### Babel-loader

主要有presets和plugins组成

https://www.jiangruitao.com/webpack/babel-loader/

```JavaScript
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,//排除node_modules中的文件
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-object-rest-spread']
        }
      }
    }
  ]
}
```

babel-loader必不可少，纳闷如何去优化打包速度呢？

- 使用cacheDirectory缓存

- 排除node_modules

- 精确要打包的目录



官方文档对于loader其他配置的解释：

- `cacheDirectory`：默认值为 `false`。当有设置时，指定的目录将用来缓存 loader 的执行结果。之后的 webpack 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程(recompilation process)。如果设置了一个空值 (`loader: 'babel-loader?cacheDirectory'`) 或者 `true` (`loader: 'babel-loader?cacheDirectory=true'`)，loader 将使用默认的缓存目录 `node_modules/.cache/babel-loader`，如果在任何根目录下都没有找到 `node_modules` 目录，将会降级回退到操作系统默认的临时文件目录。

- `不理解cacheIdentifier`：默认是由 `@babel/core` 版本号，`babel-loader` 版本号，`.babelrc` 文件内容（存在的情况下），环境变量 `BABEL_ENV` 的值（没有时降级到 `NODE_ENV`）组成的一个字符串。可以设置为一个自定义的值，在 identifier 改变后，来强制缓存失效。

- `不理解cacheCompression`：默认值为 `true`。当设置此值时，会使用 Gzip 压缩每个 Babel transform 输出。如果你想要退出缓存压缩，将它设置为 `false` -- 如果你的项目中有数千个文件需要压缩转译，那么设置此选项可能会从中收益。

- `不理解customize`: 默认值为 `null`。导出 `custom` 回调函数的模块路径，[例如传入 .custom() 的 callback 函数](https://webpack.docschina.org/loaders/babel-loader/#自定义-loader)。由于你必须创建一个新文件才能使用它，建议改为使用 `.custom` 来创建一个包装 loader。只有在你_必须_继续直接使用 `babel-loader` 但又想自定义的情况下，才使用这项配置。

#### preset与plugins

https://juejin.cn/post/6844903616554221576

### 路径解析

- 相对

```JavaScript
import '../src/file1';
import './file2';
在这种情况下，使用 import 或 require 的资源文件所处的目录，被认为是上下文目录。在 import/require 中给定的相对路径，会拼接此上下文路径，来生成模块的绝对路径。
```

- 绝对



- 模块路径

```JavaScript
import 'module';
import 'module/lib/file';
const path = require('path');

module.exports = {
  //...
  //resolve.alias配置别名
  resolve: {
    alias: {
      Utilities: path.resolve(__dirname, 'src/utilities/'),
      Templates: path.resolve(__dirname, 'src/templates/'),
    },
  },
};
```

在 `resolve.modules` 中指定的所有目录中检索模块。 你可以通过配置别名的方式来替换初始模块路径，具体请参照 `resolve.alias` 配置选项。

### Moudle Fderation

我不会长大后再学

### Target

webpack.config.js

```JavaScript
module.exports = {
  target: 'node',
};
```

官方解释：

在上述示例中，target 设置为 `node`，webpack 将在类 Node.js 环境编译代码。(使用 Node.js 的 `require` 加载 chunk，而不加载任何内置模块，如 `fs` 或 `path`)。

并且每个module只支持一个target，想要导出不同的target文件只能配置多个module来执行

```JavaScript
const path = require('path');
const serverConfig = {
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.node.js',
  },
  //…
};

const clientConfig = {
  target: 'web', // <=== 默认为 'web'，可省略
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.js',
  },
  //…
};

module.exports = [serverConfig, clientConfig];
```

对于初级前端可能也用不到，我node还是初学者，应该不会写到框架层

### Mainifest

超级棒的解释：

一旦你的应用在浏览器中以 `index.html` 文件的形式被打开，一些 bundle 和应用需要的各种资源都需要用某种方式被加载与链接起来。在经过打包、压缩、为延迟加载而拆分为细小的 chunk 这些 webpack `优化` 之后，你精心安排的 `/src` 目录的文件结构都已经不再存在。所以 webpack 如何管理所有所需模块之间的交互呢？这就是 manifest 数据用途的由来……

### 有的图片不能用了



[直接在飞书上写吧](https://a634h3dlvi.feishu.cn/docx/doxcnFgIIAWfwskExaZYcWQavBb)

### 

