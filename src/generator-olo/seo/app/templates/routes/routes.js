'use strict';

/**
 * @module 初始化路由模块
 * @version 1.0
 * @author Hiufan  <Hiufan@biketo.com>
 * @author Zengyanling
 */
var path = require('path'),
    conf = require('./routesConf.json'),
    ctrl = conf['controllers'],
    service = conf['service'],
    ctrlRoot = path.join(__dirname, ctrl.root),
    serviceRoot = path.join(__dirname, service.root),
    ctrlMap = ctrl.map[0],
    serviceMap = service.map[0];

/**
 * 检测对象是否数组类型
 * @param {Object} obj
 * @returns
 */
function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

/**
 * 路由自动注册暴露接口
 * @param {object} app - express()对象
 */
function routes(app) {

    function _init() {
        _registerRoutes(ctrlRoot, ctrlMap);
        _registerRoutes(serviceRoot, serviceMap);
    }

    /**
     * 路由注册器
     * @param {object} root    -   控制器或接口的根目录
     * @param {object} map    -   路由与回调函数的映射表
     * @returns {*}
     */
    function _registerRoutes(root, map) {
        var handler = null; // 存放各个路由所对应的回调函数
        var name = null; // 存放当前获取到的处理函数的名字
        var mode = 'get'; // 默认以get的方式获取
        /**
         * @param {any} route
         */
        var register = function(route) {
            try {
                if (map[route][0] === 'get' || map[route][0] === 'post') {
                    mode = map[route][0];
                    name = map[route][1];
                } else {
                    name = map[route][0];
                }

                handler = require(path.join(root, name) + '.js');
                app[mode](route, handler);
            } catch (e) {
                console.log(e);
                console.log('[Error Location:' + path.join(root, name) + '.js]');
            }
        };

        for (var route in map) {
            register(route);
        }
    }
    _init();
}

module.exports = routes;
