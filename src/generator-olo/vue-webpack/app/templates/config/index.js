/*
 * @Author: zengyanling
 * @Date: 2017-04-25 21:57:04
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-04-28 16:31:14
 */

var path = require('path')
module.exports = {
    prod: {
        env: require('./prod.env'),
    },
    dev: {
        env: require('./dev.env'),
        port: 9000,
        autoOpenBrowser: true,
    }
};
