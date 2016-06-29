var path = require('path');
var fis = require('fis3');

var cwd = process.cwd();
var pkg = require('../../package.json');
var FIS_ENV = require('./env');
var config  = path.join(cwd, 'config.js');

// fis.cli.info = pkg;
// fis.cli.name = pkg.name;
fis.project.setProjectRoot(cwd);
fis.set('system.localNPMFolder', path.join(cwd, 'node_modules', pkg.name));
fis.set('system.globalNPMFolder', path.join(__dirname, '../..'));

// 默认开启 browserify debug
fis.config.set('settings.preprocessor.browserify', {
    browserify: {
        debug: true
    }
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
    margin: 10
    // layout: 'matrix'
});
// 默认开启 handlebars
fis.match('*.handlebars', {
    isHtmlLike: true,
    // parser: fis.plugin('biketo-handlebars', {
        // opts: {
        //     ignorePartials: true,
        //     partialRoot: 'src/cmp/',
        //     dataRoot: ['src/cmp/', 'src/views/']
        // },
        // data: { dev: config.development }
    // }),
    rExt: 'html'
});

// prod 模式下进行压缩优化
// fis.media('prod').match('*.js', {
//     useHash: true,
//     // fis-optimizer-uglify-js 插件进行压缩，已内置
//     optimizer: fis.plugin('sm-uglify-js')
// });
// fis.media('prod').match('**/views/**/*.js', {
//     // views目录下的js压缩时得到对应的sourceMap
//     optimizer: fis.plugin('sm-uglify-js', {
//         sourceMap: true
//     })
// });
// fis.media('prod').match('*.{css,less,scss,sass}', {
//     useHash: true,
//     // fis-optimizer-clean-css 插件进行压缩，已内置
//     optimizer: fis.plugin('clean-css')
// });

// /**
//  * `png-compressor` + tinypng 会把图片压坏(不明显)
//  */
// fis.media('prod').match('*.png', {
//   // fis-optimizer-png-compressor 插件进行压缩，已内置
//   optimizer: fis.plugin('png-compressor')
// });


if (FIS_ENV.configPath) {
    try {
        require(FIS_ENV.configPath);
    } catch (e) {
        fis.log.error('Load %s error: %s \n %s', FIS_ENV.configPath, e.message, e.stack);
    }
    fis.emit('conf:loaded');
}

module.exports = fis;
