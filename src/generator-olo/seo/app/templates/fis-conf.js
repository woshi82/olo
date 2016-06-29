'use strict';
var configFile = require('./config.json'),
	config = process.argv.indexOf('prod') !== -1 ?configFile.prod:configFile.dev;

config.root?fis.set('base.urlRoot', '/'+config.root):fis.set('base.urlRoot', '');

process.env.port = configFile.port || 3000;
process.env.root = config.root || '';

fis.set('base.port',process.env.port);
fis.set('base.root', config.root);
fis.set('base.static',config.root + '/public');


fis.match('*',{
	release: '${base.root}/$0',
});
fis.match(/^\/assets\/(.*)$/,{
	release: '${base.static}/$1',
	url:'${base.urlRoot}/$1'
});
fis.match(/^\/assets\/scss\/(.*)$/,{
	release: false
});
fis.match(/^\/views\/([^\/]+)\/(.*)$/,{
	release: '${base.static}/$2',
	preprocessor: fis.plugin('browserify'),
	url:'${base.urlRoot}/$2'
});


fis.match(/^\/views\/([^\/]+)\/\1.handlebars$/,{
	release: '${base.root}/views/$1'
});
fis.match(/^\/views\/layouts\/(([^\/]+)\/)*(.*)\.handlebars$/,{
	release: '${base.root}/views/layouts/$3'
});
// prod 模式下进行压缩优化
fis.media('prod').match('*.js', {
    // useHash: true,
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