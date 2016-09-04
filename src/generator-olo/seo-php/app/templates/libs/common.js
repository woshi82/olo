'use strict';
/**
 * common.js
 * @version 1.0
 * @description 共用初始化
 * @author Xxx
 */
__inline('./jquery.min.js');

/**
 * IE console兼容
 */
if (!window.console && !console.firebug){
    var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];

    window.console = {};
    for (var i = 0; i < names.length; ++i)
        window.console[names[i]] = function() {};
}
/**
 * AJAX错误处理
 */
$(document).ajaxError(function(event,xhr,options,exc){
    switch (xhr.status){
        case(500):
            alert('服务器系统内部错误。');
            break;
        // case(401):
        //     alert("未登录");
        //     break;
        // case(403):
        //     alert("无权限执行此操作");
        //     break;
        case(408):
            alert('网络不给力，再试一次。');
            break;
        default:
            console.log('[ajax]未知错误。');
    }
 });
