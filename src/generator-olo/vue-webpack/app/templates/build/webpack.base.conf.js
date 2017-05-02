/*
 * @Author: zengyanling
 * @Date: 2017-04-23 22:46:46
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-05-02 14:10:47
 */
/**
 * loaders:
 * vue-loader、babel-loader、 file-loader、 css-loader、sass-loader
 */
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var px2rem = require('postcss-flexible');
// var postcssScss = require('postcss-scss');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        main: process.env.NODE_ENV === 'production' ? './components/main.js' : ['webpack-hot-middleware/client', './components/main.js'],
        flexible: './libs/flexible.js'
    },
    output: {
        path: path.resolve(__dirname, '../output'),
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            page: path.resolve(__dirname, '../components/page'),
            component: path.resolve(__dirname, '../components/component'),
            scss: path.resolve(__dirname, '../assets/scss')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
                options: {
                    postcss: {
                        plugins: [
                            autoprefixer(),
                            px2rem({ remUnit: 75 }) // TODO: 根据设计图更改
                        ],
                        options: {
                            // parser: postcssScss
                        }
                    },
                    loaders: {
                        scss: process.env.NODE_ENV === 'production' ?
                            ExtractTextPlugin.extract({
                                use: ['css-loader', 'sass-loader',{
                                    loader: 'sass-loader',
                                    options: {
                                        data: `@import "~${path.resolve('assets/scss/common.scss')}";`
                                    }
                                }],
                                fallback: 'vue-style-loader'
                            }) :
                            ['vue-style-loader', 'css-loader', {
                                loader: 'sass-loader',
                                options: {
                                    data: `@import "~${path.resolve('assets/scss/common.scss')}";`
                                }
                            }]
                            // ['vue-style-loader', 'css-loader', 'sass-loader']
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    // useRelativePath: true,
                    // name: 'img/[name].[hash:7].[ext]'
                    name: 'public/img/[name].[ext]'
                    // name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            // {
            //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            //     loader: 'file-loader',
            //     options: {
            //         limit: 10000,
            //         name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            //     }
            // }
        ]
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),

        // new webpack.NoErrorsPlugin()
    ]
};
