/*
 * @Author: zengyanling
 * @Date: 2017-04-21 13:51:06
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-05-02 15:34:19
 */
/**
 * loaders:
 * handlebars-loader
 */
process.env.NODE_ENV = 'production';
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
    output: {
        path: path.resolve(__dirname, '../output'),
        filename: 'public/js/[name].js?[chunkhash]',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        new ExtractTextPlugin('public/css/[name].css?[contenthash]'),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
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
            inject: false,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            chunksSortMode: 'dependency'
        })
    ]
});
