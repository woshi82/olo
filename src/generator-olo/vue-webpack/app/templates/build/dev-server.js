/*
 * @Author: zengyanling
 * @Date: 2017-04-20 15:24:23
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-04-26 14:58:20
 */
process.env.NODE_ENV = 'development';
var webpack = require('webpack');
var opn = require('opn');
var path = require('path');
var proxyTool = require('yog-devtools');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var express = require('express');
var app = express();
var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
var webpackConfig = require('./webpack.dev.conf');
var compiler = webpack(webpackConfig);
var port = config.dev.port;
var autoOpenBrowser = config.dev.autoOpenBrowser;
var hotMiddleware = webpackHotMiddleware(compiler);
var devMiddleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: {
		colors: true
	},
});
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  })
})
// handle fallback for HTML5 history API
// app.use(require('connect-history-api-fallback')());

app.use(devMiddleware);
app.use(hotMiddleware);

// app.use(path.posix.join('/', 'public'), express.static('./public'));
console.log(path.join(__dirname, '../mock/server.conf'))
app.use(proxyTool({
    view_path: '', // 避免报错。
    rewrite_file: [path.join(__dirname, '../mock/server.conf')],
    data_path: [path.join(__dirname, '../mock')]
}));


var uri = 'http://localhost:' + port + '/';
console.log('> Starting dev server...');

devMiddleware.waitUntilValid(() => {
    console.info("==> 🌎  Open up "+ uri +" in your browser.");
    autoOpenBrowser && opn(uri);
});

app.listen(port)

