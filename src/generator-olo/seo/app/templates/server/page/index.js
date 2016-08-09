'use strict';

/**
 * @module 首页页面
 * @version 1.0
 * @author Xxx
 */

var request = require('request'),
    eventProxy = require('eventproxy');


module.exports = {
    /**
     * 首页
     */
    'index': [function(req, res) {
        var urls = [{
                name: 'userInfo',
                url: '/api/user'
            },{
                name: 'dynamic',
                url: '/api/dynamic/time'
            }],
            len = urls.length,
            APIDOMAIN = process.env.APIDOMAIN,
            ep = new eventProxy(),
            indexData = {title: '首页'};

        ep.after('getData', len, function(list) {
            for (var i = 0; i < len; i++) {
                for (var attr in list[i]) {
                    indexData[attr] = list[i][attr].data;
                }
            }
            res.render('index', indexData);

        });

        for (var i = 0; i < len; i++) {
            (function(i) {
                request.get({
                    url: APIDOMAIN + urls[i].url,
                    json: true
                }, function(err, response, body) {
                    if (err) {
                        console.log('[ERROR in '+urls[i].url + ']:' + err);
                    } else if (response.statusCode == 200) {
                        var obj = {};
                        obj[urls[i].name] = body;
                        ep.emit('getData', obj);
                    }
                });
            })(i);
        }

    }]
};
