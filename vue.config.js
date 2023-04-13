const path = require("path");
const IS_PROD = ['production'].includes(process.env.NODE_ENV);
const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: true,
  publicPath: "./", //测试 http://test.api.network.com/
  indexPath: 'index.html',
  outputDir: 'dist',
  assetsDir:IS_PROD?"resources/network":'',
  productionSourceMap: !IS_PROD,
  chainWebpack: config => {
    //config.resolve.extensions = ['.js','.vue','.json','.less']
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"));
    return config;
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/css/config.less')]
    }
  },

  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    compress: true,
    host: "0.0.0.0",
    port: "8082",
    open: true,
    hotOnly: true,
    disableHostCheck: true,
    proxy: {
      "/api/": {
        pathRewrite: {
          "^/api/": "/"
        },
        // target: 'http://192.168.50.55:9092', //设置你调用的接口域名和端口号 别忘了加http
        // target: 'http://123.57.159.197:9095/', //设置你调用的接口域名和端口号 别忘了加http
        target: 'https://api.shugecloud.com/',
        changeOrigin: true //这里设置是否跨域
      },
    }
  },
  configureWebpack: config=>{
    const plugins = [];
    if(IS_PROD){
      plugins.push(
        new CopyWebpackPlugin({
          patterns:[
            {
              from: path.resolve(__dirname,'public/favicon.png'),
              to:path.resolve(__dirname,'dist/resources')
            }
          ]
        })
      )
    }
    config.plugins = [...config.plugins,...plugins];
  }
};
