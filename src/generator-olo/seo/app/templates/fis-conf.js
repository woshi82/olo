/**
 * fis-conf.js
 * @version : 1.0.0
 * @description fis3 settings
 */

'use strict';

var configFile = require('./config.json'),
    config = null,
    urlRoot = null;

if(process.argv.indexOf('prod') == -1){
    process.env.NODE_ENV = 'dev';
    config = configFile.dev;
}else {
    process.env.NODE_ENV = 'prod';
    config = configFile.prod;
}
urlRoot = config.ROOT?'/'+config.ROOT:'';

fis.set('base.urlRoot', urlRoot);
fis.set('base.port',config.PORT || 8000);
fis.set('base.root', config.ROOT);
fis.set('base.static',config.ROOT + '/public');
fis.set('new date', Date.now());


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

fis.match('*',{
    release: '${base.root}/$0',
});
fis.match(/^\/cmp\/([^\/]+)\/(.*)(\.scss|js)$/,{
    release: false
});
fis.match('libs/**',{
    release: false
});
fis.match(/^\/libs\/((common|statistics)\.js)$/,{
    release: '${base.static}/$1',
    url:'${base.urlRoot}/$1'
});
fis.match(/^\/assets\/(.*)$/,{
    release: '${base.static}/$1',
    url:'${base.urlRoot}/$1'
});
fis.match(/^\/assets\/scss\/(.*)$/,{
    release: false
});
fis.match(/^\/assets\/scss\/((.*)\.htc)$/, {
    release: '${base.static}/$1'
});

fis.match(/^\/views\/([^\/]+)\/(.*)$/, {
    release: 　 '/${base.static}/$2',
    url:'${base.urlRoot}/$2'
});
fis.match(/^\/views\/([^\/]+)\/(.*)\.js$/, {
    release: 　 '/${base.static}/$2',
    url:'${base.urlRoot}/$2',
    preprocessor: fis.plugin('browserify')
});
fis.match(/^\/views\/([^\/]+)\/\1.handlebars$/,{
    release: '${base.root}/views/$1'
});
fis.match(/^\/views\/layouts\/(([^\/]+)\/)*(.*)\.handlebars$/,{
    release: '${base.root}/views/layouts/$3'
});


// prod 模式下进行压缩优化

fis.media('prod').match('mock/**',{
    release: false
});
fis.media('prod').match(/^\/views\/([^\/]+)\/(.*)\.js$/, {
    query: '?=t' + fis.get('new date'),
    optimizer: fis.plugin('uglify-js')
});
fis.media('prod').match('*.{css,less,scss,sass}', {
    query: '?=t' + fis.get('new date'),
    optimizer: fis.plugin('clean-css')
});
fis.media('prod').match('*.png', {
    optimizer: fis.plugin('png-compressor',{type: 'pngquant'})
});
