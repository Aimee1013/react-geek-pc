// 自定义对webpack的配置

const path = require('path')
// const { whenProd, getPlugin, pluginByName } = require('@craco/craco')
// const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')


module.exports = {
  // webpack配置
  webpack: {
    // 配置别名
    alias: {
      // 约定使用 @ 来表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src')
    },
    // plugins: {
    //   add: [new AntdDayjsWebpackPlugin()]
    // },
    // cdn配置
    // configure: webpackConfig => {
    //   whenProd(() => {
    //     // 只在生产环境（build）可以对webpack配置进行修改，配置cdn
    //     // 1. 排除这些包不要打包到build文件夹中
    //     webpackConfig.externals = {
    //       'react': 'React',
    //       'react-dom': 'ReactDOM',
    //       'redux': 'Redux',
    //     }
    //     // 2. 需要在index.html中引入被排除的包 HtmlWebpackPlugin
    //     const { isFound, match } = getPlugin(webpackConfig, pluginByName('HtmlWebpackPlugin'))
    //     if (isFound) {
    //       // 配置现成的cdn 资源数组 现在是公共cdn为了测试，无需费用
    //       // 实际开发时，要用公司自己付费购买的cdn服务器
    //       match.userOptions.cdn = {
    //         js: [
    //           'https://cdn.bootcdn.net/ajax/libs/react/17.0.2/umd/react.production.min.js',
    //           'https://cdn.bootcdn.net/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js',
    //           'https://cdn.bootcdn.net/ajax/libs/redux/4.1.0/redux.min.js'
    //         ],
    //         css: []
    //       }
    //     }
    //   })
    //   return webpackConfig
    // }
  }
}