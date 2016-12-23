/**
 * fis-conf.js
 * @version : 1.0.0
 * @description fis3 settings
 */

'use strict';

var configFile = require('./config.json'),
	config = process.argv.indexOf('prod') !== -1 ?configFile.prod:configFile.dev;

config.root?fis.set('base.urlRoot', '/'+config.root):fis.set('base.urlRoot', '');

process.env.port = config.port || 8000;
process.env.root = config.root || '';

fis.set('base.port', process.env.port);
fis.set('base.root', process.env.root);
fis.set('base.static', '/public');

fis.config.set('settings.preprocessor.vue-tmpl', {
    browserify: {
        debug: process.env.NODE_ENV !== 'production',
        paths: ['libs/', 'components/', 'components/component/']
    }
});

fis
	.match('::package', {
	    postpackager: fis.plugin('loader'),
	})
	.match(/^\/assets\/images\/(.*)$/, {
	    release: '/${base.static}/images/$1'
	})
	.match('**/*.scss', {
	    rExt: 'css',
	    parser: fis.plugin('node-sass'),
	    preprocessor: fis.plugin('autoprefixer'),
	    spriter: fis.plugin('csssprites'),
	    packTo: '/${base.static}/all.css'
	})
	.match(/^\/components\/(main\.js)/, {
	    preprocessor: fis.plugin('vue-tmpl'),
	    release: '/${base.static}/$1'
	});

//生产环境下CSS、JS压缩合并
fis.set('new date', Date.now());
fis.media('prod')
	.hook('relative')
	.match('**', {
	    relative: true,
	    deploy: [
	        fis.plugin('skip-packed', {
	            skipPackedToAIO: true
	        }),
	        fis.plugin('local-deliver', {
	            to: 'output'
	        })
	    ]
	})
    .match(/^\/components\/(main\.js)/, {
        query: '?t=' + fis.get('new date'),
        preprocessor: fis.plugin('vue-tmpl',{
        	relativeTo: 'index.html'
        }),
        optimizer: fis.plugin('uglify-js')
    })
    .match('**.scss', {
        query: '?t=' + fis.get('new date'),
        optimizer: fis.plugin('clean-css')
    })
    .match('*.png', {
        optimizer: fis.plugin('png-compressor', { type: 'pngquant' })
    })
    .match(/^\/(package|config)\.json/, {
        release: false
    })
    .match(/^\/(mock|libs|server)\/.*/, {
        release: false
    })
    .match(/^\/components\/(([^\/])+\/)+.*\.(js|html)/, {
        release: false
	})
    ;

