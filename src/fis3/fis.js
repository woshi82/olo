var path = require('path');
var fis = require('fis3');

var cwd = process.cwd();
var pkg = require('../../package.json');
var FIS_ENV = require('./env');
var config  = path.join(cwd, 'config.js');


fis.project.setProjectRoot(cwd);

fis.require.paths.unshift(path.join(cwd, 'node_modules'));
fis.require.paths.push(path.join(path.dirname(__dirname), 'node_modules'));


// 默认开启 browserify debug
fis.config.set('settings.preprocessor.browserify', {
    browserify: {
        debug: true
    }
});
// 默认prod模式关闭 browserify debug
fis.config.media('prod').set('settings.preprocessor.browserify', {
    browserify: {
        debug: false
    }
});
// 默认开启 handlebars
fis.match('*.handlebars', {
    isHtmlLike: true,
    rExt: 'html'
});
// 默认开启 sass
fis.match('*.{scss,sass}', {
    parser: fis.plugin('node-sass'),
    useSprite: true,
    rExt: 'css'
});
// 默认开启 csssprites
fis.match('::package', {
    spriter: fis.plugin('csssprites')
});
fis.config.set('settings.spriter.csssprites', {
    layout: 'matrix',
    margin: '15'
});

// 默认开启 autoprefixer
fis.config.set('settings.preprocessor.autoprefixer', {
    browsers: ['Android >= 2.1', 'iOS >= 4', 'ie >= 8', 'firefox >= 15'],
    cascade: true
});


if (FIS_ENV.configPath) {
    try {
        require(FIS_ENV.configPath);
    } catch (e) {
        fis.log.error('Load %s error: %s \n %s', FIS_ENV.configPath, e.message, e.stack);
    }
    fis.emit('conf:loaded');
}

module.exports = fis;
