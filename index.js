#!/usr/bin/env node
'use strict';
var generators = require('./src/generators');
var release = require('./src/release');
var server = require('./src/server');

var pkg = require('./package.json');

var olo = require('commander')
    .version(pkg.version);

/**
 * generator-olo嵌入
 */
olo
    .command('init')
    .option('-c, --clean', 'clean olo cached template')
    .description('create a new front-end project')
    .action(function (options) {
        // console.log(options.clean)
        !options.clean? generators('app'): generators('app','clean');
        // generators('app');
    });
olo
    .command('v <name>')
    .alias('view')
    .description('create a new view page')
    .action(function (name) {
        generators('view', name);
    });

olo
    .command('c <name>')
    .alias('cmp')
    .description('create a new component')
    .action(function (name) {
        generators('c', 'create', name);
    });

olo 
    .command('i [cmp]')
    .alias('install')
    .description('install component(s) from git.biketo.com.cn/')
    .action(function (cmp) {
        generators('c', 'i', cmp);
    });
olo 
    .command('f <name>')
    .alias('frame')
    .description('install frame(s) from olo')
    .action(function (name) {
        generators('frame', name);
    });

/**
 * fis3 嵌入(包括node服务嵌入)
 */
 olo
    .command('w')
    .alias('watch')
    .description('build and watch your project with fis3')
    .option('--child-flag', 'hack fis3-release-watch --child-flag')
    .action(function () {
        // server.clean();
        release({
            // c: true,
            w: true,
            L: true
        });
    });
olo
    .command('r [media]')
    .alias('release')
    .description('build your project with fis3')
    .option('-d, --dest <path>', 'release output destination')
    .option('-l, --lint', 'with lint')
    .option('-w, --watch', 'monitor the changes of project')
    .option('-L, --live', 'automatically reload your browser')
    .option('-c, --clean', 'clean compile cache')
    .option('-u, --unique', 'use unique compile caching')
    .option('-r, --root <path>', 'specify project root')
    .option('-f, --file <filename>', 'specify the file path of `fis-conf.js`')
    .option('--child-flag', 'hack fis3-release-watch --child-flag')
    .action(function (media, options) {
        var argv = {};
        if (options.dest) {
            argv.d = options.dest;
        }
        if (options.lint) {
            argv.l = options.lint;
        }
        if (options.watch) {
            argv.w = options.watch;
        }
        if (options.live) {
            argv.L = options.live;
        }
        if (options.clean) {
            argv.c = options.clean;
        }
        if (options.unique) {
            argv.u = options.unique;
        }
        if (options.root) {
            argv.r = options.root;
        }
        if (options.file) {
            argv.f = options.file;
        }
        release(argv, media);
    });

olo
    .command('s')
    .alias('start')
    .option('--live', 'release output destination')
    .description('start server')
    .action(function () {
        // server.stop();
        // server.clean();
        release({
            c: true
        });
        server.start();
    });

olo
    .command('open')
    .description('open server folder')
    .action(function () {
        server.open();
    });

olo
    .command('clean')
    .description('clean server folder')
    .action(function () {
        server.clean();
    });

olo
    .command('stop')
    .description('stop server folder')
    .action(function () {
        server.stop();
    });

olo.parse(process.argv);


if (!process.argv.slice(2).length) {
    olo.outputHelp();
}
