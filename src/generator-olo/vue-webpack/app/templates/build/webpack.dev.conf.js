/*
 * @Author: zengyanling
 * @Date: 2017-04-21 13:51:06
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-05-02 15:34:27
 */

var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
/**
 * loaders:
 * handlebars-loader
 */
module.exports = merge(baseWebpackConfig, {
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // 更多配置： https://github.com/jantimon/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: '!!handlebars-loader!index.hbs',
            favicon: 'assets/images/favicon.ico',
            files: {
                js: ['output/main.js', 'output/flexible.js'],
                chunks: {
                    main: {
                        entry: 'output/main.js'
                    },
                    flexible: {
                        entry: 'output/flexible.js'
                    },
                }

            },
            inject: false
        }),
        new FriendlyErrorsPlugin()
    ]
});
