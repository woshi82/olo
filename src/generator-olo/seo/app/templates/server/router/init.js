/**
 * 初始化路由的模块
 * @module router/init
 * @param {Object} app - express()对象
 */
/**
* '/about': {
*     '/': about,
*     '/member': member,
*     '/member/:type': type,
* },
* '/about/member':member,
* '/detail': {
*     '/:id': detail,
* },
*
* '/detail/:id':detail,
* '/channel':channel
*"/content": {
*        "/":["get","content"],
*        "/praise":["post","praise"]
*    }
*/


var path = require('path'),
    pagePath = path.join(__dirname,'./page'),
    apiPath = path.join(__dirname,'./api'),
    pages = require(path.join(pagePath, 'page.json')),
    apis = require(path.join(apiPath, 'api.json')),
    extName = '.js';

/** 路由配置函数 */
module.exports = function(app) {
    var aRouter = aDepth = [],
        iD = -1,
        route = depth = name = null,
        oInit = {};
        
        setRoute('page',pages,pagePath,'get');
        setRoute('api',apis,apiPath);
    /**
    * 设置路由
    *
    * @param {String} type - 页面路由或者API路由
    * @param {Object} config  - 路由配置项
    * @param {String|Object} config.a  - 路由路径,可以进行拼接
    * @param {String|*} config.a.b  - 路由接口,接口名称。默认查找的文件是以父路由‘／’对应的接口名称为文件名的文件。
    * @param {String} configPath - 依赖函数公共路径
    * @param {String} mode - 路由GET／POST
    * @returns {*}
    */
    function setRoute(type,config,configPath,mode){
        for (var a in config) {
        
            if (isArray(config[a]) || typeof config[a] == 'string') {
                route = a;
                if(type == 'api'){
                    name = config[a][1]; 
                    mode = config[a][0]; 
                }else {
                    name = config[a]; 
                }
                if (a == '/') {
                    depth = config[a];

                } else {
                    aRouter = a.split('/');
                    aRouter.shift();
                    depth = aRouter[0];
                }
                try {
                    aDepth[++iD] = require(path.join(configPath, depth)+extName);
                    app[mode](route,aDepth[iD][name]);

                } catch (e) {
                    console.log('第一次捕获出现错误:' + e);
                }
            } else {
                depth = a;
                try {
                    aDepth[++iD] = require(path.join(configPath, depth)+extName);
                    getInit(type,config[a], a,mode);

                } catch (e) {
                    console.log('第二次捕获出现错误:' + e);
                    
                }
            }

        }
    }
    /**
    * 路由初始化
    * 
    * @param {String} type    -   页面路由或者API路由
    * @param {Object} obj     -   路由子配置项
    * @param {Object} prevA   -   依赖函数具体路径
    * @param {String} mode    -   路由GET／POST
    * @returns {*}
    */
    function getInit(type,obj, prevA,mode) {
        for (var b in obj) {
            if (isArray(obj[b]) || typeof obj[b] == 'string') {
                route = path.join(prevA, b);

                if(type == 'api'){
                    name = obj[b][1]; 
                    mode = obj[b][0]; 
                }else {
                    name = obj[b]; 
                }
                app[mode](route,aDepth[iD][name]);

            } else {
                getInit(type,obj[b], b,mode);
            }
        }
    }
    function isArray(obj) {  
        return Object.prototype.toString.call(obj) === '[object Array]';   
    }

};




