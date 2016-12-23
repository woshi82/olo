/**
 * fis-conf.js
 * @version : 1.0.0
 * @description fis3 settings
 */

'use strict';

var configFile = require('./config.json'),
	config = process.argv.indexOf('prod') !== -1 ?configFile.prod:configFile.dev;

config.root?fis.set('base.urlRoot', '/'+config.root):fis.set('base.urlRoot', '');


process.env.port = configFile.port || 8000;
process.env.root = config.root || '';

fis.set('new date', Date.now());
fis.set('base.port',process.env.port);
fis.set('base.root', config.root);
fis.set('base.static',config.root + '/public');
fis.set('charset', 'gb2312');

fis.match('*.handlebars', {
    isHtmlLike: true,
    rExt: 'html'
});

// 默认开启 handlebars
fis.match('*.handlebars', {
    isHtmlLike: true,
    rExt: 'html',
    parser: fis.plugin('biketo-handlebars', {
        opts: {
            ignorePartials: true,
            partialRoot: 'cmp/',
            dataRoot: ['cmp/', 'views/'],
            helpers: {

            }
        },
        data: { dev: config.dev }
    })
});

fis.match('*', {
    release: false
});
fis.match(/^\/mock\/(.*)$/, {
    release: '/${base.root}/mock/$1'
});
fis.match(/^\/server\/(.*)$/, {
    release: '/${base.root}/server/$1'
});
fis.match('package.json', {
    release: '/${base.root}/package.json'
});
fis.match(/^\/assets\/(([^\/]+)\/)*(.*)$/, {
    release: '/${base.static}/$3'

});
fis.match(/^\/assets\/scss\/(.*)$/, {
    release: false
});
// fis.match(/^\/assets\/scss\/((.*)\.htc)$/, {
//     release: '${base.static}/$1'
// });


fis.match(/^\/(([^\/]+)\/)*images\/(.*)$/, {
    release: '/${base.static}/images/$3'
});
fis.match(/^\/libs\/((common).*)\.js$/, {
    release: '/${base.static}/$1.js'
});

fis.match(/^\/views\/([^\/]+)\/(.*)$/, {
    release: 　 '/${base.static}/$2'
});
fis.match(/^\/views\/([^\/]+)\/(.*)\.js$/, {
    release: 　 '/${base.static}/$2',
    preprocessor: fis.plugin('browserify')
});
fis.match(/^\/views\/([^\/]+)\/\1-mock.js$/, {
    release: false
});
fis.match(/^\/views\/([^\/]+)\/\1.handlebars$/, {
    release: '/${base.root}/$1'
});
// prod 模式下进行压缩优化
fis.media('prod').match('*.js', {
    // useHash: true,
    query: '?=t' + fis.get('new date'),
    optimizer: fis.plugin('uglify-js'),
     charset: fis.get('charset')
});
fis.media('prod').match('*.{css,less,scss,sass}', {
    // useHash: true,
    query: '?=t' + fis.get('new date'),
    optimizer: fis.plugin('clean-css'),
     charset: fis.get('charset')
});
fis.media('prod').match('*.png', {
    optimizer: fis.plugin('png-compressor',{type: 'pngquant'})
});
