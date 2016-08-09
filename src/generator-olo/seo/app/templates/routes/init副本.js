'use strict';

/**
 * @module 初始化路由的模块
 * @version 1.0
 * @author Zengyanling
 * @param {Object} app - express()对象
 */


var path = require('path'),
    fs = require('fs');


/** 路由配置函数 */
module.exports = function(app) {

    // 需要配置文件
    var pagePath = path.join(__dirname, '../controllers'),
        apiPath = path.join(__dirname, '../service'),
        pageSettings = require(path.join(pagePath, '_page.json')),
        apiSettings = require(path.join(apiPath, '_api.json'));

    setRoute(pageSettings, pagePath, 'get');
    setRoute(apiSettings, apiPath, 'post');

    // 不用配置文件
    // setRouteNoSetting(path.join(__dirname,'../controllers/'),'get');
    // setRouteNoSetting(path.join(__dirname,'../service/'),'post');

    /**
     * setRouteNoSetting 设置路由(无配置文件)
     * @param {String} rootPath    - 需要配置路由的文件路径
     * @param {String} defaultMode - 默认路由方式
     */
    function setRouteNoSetting(rootPath, defaultMode) {
        var fileName = '',
            oDetails = null, //文件内容
            aPath = [],
            sPath = '',
            mode = null;
        fs.readdirSync(rootPath).forEach(function(item) {
            if (!!item.match(/\.js$/)) {
                fileName = item.replace(/.js/, '');
                try{
                    oDetails = require(rootPath + item);
                }catch(err){
                    console.log('[ERROR in init.js]:'+(rootPath + item)+'出现错误\n'+ err);
                }
                for (var attr in oDetails) {
                    if (!!attr.match(/\|/)) {
                        sPath =  attr.split('|').slice(-1)[0];
                        //路由设置为／无须处理
                        if (sPath !== '/') {
                            aPath = sPath.split('/');
                            _faultTolerant(aPath);
                            sPath = '/' + aPath.join('/');
                        }
                        mode = _setRouteType(oDetails[attr], defaultMode);
                        app[mode](sPath, oDetails[attr]);
                    } else {
                        sPath = attr;
                        //路由设置为／无须处理
                        if (sPath !== '/') {
                            aPath =  attr.split('/');
                            _faultTolerant(aPath);
                            sPath = '/' + fileName + '/' + aPath.join('/');
                        } else {
                            sPath = '/' + fileName;
                        }
                        mode = _setRouteType(oDetails[attr], defaultMode);
                        app[mode](sPath, oDetails[attr]);
                    }
                }
            }
        });

        /**
         * _faultTolerant 路由容错,去除首尾空元素
         * @param  {Array} obj - 数组
         */
        function _faultTolerant(obj) {
            !obj[0] && obj.shift();
            !obj.slice(-1)[0] && obj.pop();
        }

        /**
         * _isArray 数组类型判断
         * @param  {Array} obj - 数组
         */
        function _isArray(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        }

        /**
         * _setRouteType 设置路由方式
         * @param  {Object} - 路由函数
         * @param  {String} - 默认路由方式
         * @return {String} - 路由方式
         */
        function _setRouteType(obj, defaultMode) {
            var mode = defaultMode;
            if (_isArray(obj) && (obj[0] === 'get' || obj[0] === 'post')) {
                mode = obj[0];
                obj.shift();
            }
            return mode;
        }
    }





    /**
     * setRoute 设置路由(有配置文件)
     * @param {Object} settings    - 路由配置文件
     * @param {String} rootPath    - 需要配置路由的文件路径
     * @param {String} defaultMode - 默认路由方式
     */
    function setRoute(settings, rootPath, defaultMode) {
        var fileName = null,
            sPath = '',
            aPath = [],
            oFiles = {};

        for (var attr in settings) {
            if (!!attr.match(/\|/)) {
                var _aSplit =  attr.split('|');
                sPath = _aSplit.slice(-1)[0];
                _getFile(_aSplit[0]);
                //路由设置为／无须处理
                if (sPath !== '/') {
                    aPath = sPath.split('/');
                    _faultTolerant(aPath);
                    sPath = '/' + aPath.join('/');
                }
                _recurSetRoute(sPath, settings[attr]);
            } else {
                _getFile(attr, settings[attr]);
            }

        }

        /**
         * _getFile 获取文件内容(获取文件名、依赖)
         * @param  {String} sFileName - 带有文件名的字符串
         * @param  {Object} routeDet  - 对应配置文件的右半部分
         */
        function _getFile(sFileName, routeDet) {
            var _aFileName = null;
            if (!!sFileName && sFileName !== '/') {
                _aFileName = sFileName.split('/');
                _faultTolerant(_aFileName);
                fileName = _aFileName[0];
                if (!oFiles[fileName]) {
                    var _path = path.join(rootPath, fileName) + '.js';
                    try{
                        oFiles[fileName] = require(_path);
                    }catch(err){
                        console.log('[ERROR in init.js]:'+ _path +'出现错误\n'+ err);
                    }
                }
                if (!!routeDet) {
                    sPath = '/' + _aFileName.join('/');
                    _recurSetRoute(sPath, routeDet);
                }
            } else {
                console.log('[ERROR in init.js]:找不到路由文件,请在配置文件中配置存在的文件名');
            }
        }

        /**
         * _recurSetRoute 递归检索配置文件设置路由
         * @param  {String} routePath - 路由路径
         * @param  {Object} routeDet  - 对应配置文件的右半部分
         */
        function _recurSetRoute(routePath, routeDet) {
            var _aPathCh = null,
                _routePathCh = null;

            // 获取路由目标函数、方式
            var _mode = defaultMode,
                _routeFn = null;
            if (typeof routeDet === 'string') {
                _routeFn = oFiles[fileName][routeDet];
            } else if (_isArray(routeDet)) {
                if (routeDet[0] === 'get' || routeDet[0] === 'post') {
                    _mode = routeDet[0];
                    _routeFn = oFiles[fileName][routeDet[1]];
                } else {
                    _routeFn = oFiles[fileName][routeDet[0]];
                }
            } else {
                // 进行递归
                for (var chAttr in routeDet) {
                    //路由设置为／无须处理
                    if (chAttr !== '/') {
                        _aPathCh = chAttr.split('/');
                        _faultTolerant(_aPathCh);
                        _routePathCh = routePath + '/'+_aPathCh.join('/');
                    } else {
                        _routePathCh = routePath + chAttr;
                    }
                    _recurSetRoute(_routePathCh, routeDet[chAttr]);
                }
                return false;
            }
            // 设置路由
            app[_mode](routePath, _routeFn);
        }

        /**
         * _faultTolerant 路由容错,去除首尾空元素
         * @param  {Array} obj - 数组
         */
        function _faultTolerant(obj) {
            !obj[0] && obj.shift();
            !obj.slice(-1)[0] && obj.pop();
        }

        /**
         * _isArray 数组类型判断
         * @param  {Array} obj - 数组
         */
        function _isArray(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        }
    }

};
