/**
 * Copy from https://github.com/scrat-team/scrat-command-server
 * 修改了部分细节
 */

'use strict';

var fis = require('./fis');
var childProcess = require('child_process');
var spawn = childProcess.spawn;
var hasbin = require('hasbin');
var nodePath = require('path');

exports.name = 'server';
exports.usage = '<command> [options]';
exports.desc = 'launch nodejs server';
exports.register = function(commander) {

    var live = false;
    var debug;
    var debugBrk;
    var harmony = false;

    function touch(dir){
        if(fis.util.exists(dir)){
            if(!fis.util.isDir(dir)){
                fis.log.error('invalid directory [' + dir + ']');
            }
        } else {
            fis.util.mkdir(dir);
        }
        return fis.util.realpath(dir);
    }

    var root = touch((function(){
        var key = 'FIS_SERVER_DOCUMENT_ROOT';
        if(process.env && process.env[key]){
            var path = process.env[key];
            if(fis.util.exists(path) && !fis.util.isDir(path)){
                fis.log.error('invalid environment variable [' + key + '] of document root [' + path + ']');
            }
            return path;
        } else {
            var projectPath = fis.config.get('base.root') || '';

            return nodePath.join(fis.project.getTempPath('www'),projectPath);
        }
    })());


    function open(path, callback) {
        fis.log.notice('browse ' + path.yellow.bold + '\n');
        var cmd = fis.util.escapeShellArg(path);
        if(fis.util.isWin()){
            cmd = 'start "" ' + cmd;
        } else {
            if(process.env.XDG_SESSION_COOKIE){
                cmd = 'xdg-open ' + cmd;
            } else if(process.env.GNOME_DESKTOP_SESSION_ID){
                cmd = 'gnome-open ' + cmd;
            } else {
                cmd = 'open ' + cmd;
            }
        }
        childProcess.exec(cmd, callback);
    }

    function getPidFile() {
        return fis.project.getTempPath('server/pid');
    }

    /**
     * 获取当前机器的 IP
     */
    function getLoaclIP() {
        var ifaces = require('os').networkInterfaces();
        var ifnames = Object.keys(ifaces);
        var j = 0;
        for (; j < ifnames.length; j++) {
            var ifname = ifnames[j];
            var i = 0;
            for (; i < ifaces[ifname].length; i++) {
                var iface = ifaces[ifname][i];
                if ('IPv4' === iface.family && !iface.internal) {
                    return iface.address;
                }
            }
        }
        return '127.0.0.1';
    }

    /**
     * 获取首页地址
     * @param  {number} envPort 端口
     */
    function getRootUrl(envPort) {
        var fs = require('fs');
        var projectPath = fis.config.get('base.root') || '';
        var viewName = '/index';
        if (!fis.util.exists(nodePath.join(root, projectPath, viewName + '.html'))) {
            try {
                var reg = /\.html$/;
                var projectDir = nodePath.join(root, projectPath);
                viewName = fs.readdirSync(projectDir).filter(function (f) {
                        return reg.test(f);
                    }).shift().replace(reg, '');
            } catch(e) {}
        }

        return 'http://' + getLoaclIP() + ':' + envPort +'/'+ projectPath ;
    }

    function lanuch(){
        var args = [].slice.call(arguments);
        var envPort = fis.config.get('base.port') || 2000;
        var execPath = (fis.util.isWin() ? 'set ' : '') +
                        'PORT=' + envPort + ' ';
        if(live){
            var cmd = 'node-dev' + (fis.util.isWin() ? '.cmd' : '');
            execPath = nodePath.join(__dirname, '../../node_modules', '.bin', cmd);
        } else {
            execPath = process.execPath;
        }

        if(debugBrk){
            args.unshift('--debug-brk=' + (typeof debugBrk === 'number' ? debugBrk : 5858));
        }else if(debug){
            args.unshift('--debug=' + (typeof debug === 'number' ? debug : 5858));
        }
        if(harmony){
            args.unshift('--harmony');
        }
        var childProcess = spawn(execPath, args, { cwd : root });
        childProcess.stderr.pipe(process.stderr);
        childProcess.stdout.pipe(process.stdout);
        process.stderr.write(' ➜ ' + (live ? 'livereload ' : '') + 'server is running\n');

        fis.util.write(getPidFile(), childProcess.pid);
        // open in browser
        require('open')(getRootUrl(envPort));
    }

    function startServer(){
        var execArgs = [];
        if(fis.util.exists(root + '/Procfile')){
            var content = fis.util.read(root + '/Procfile', true);
            var reg = /^web\s*:\s*.*?node\s+(.+)/im;
            var match = content.match(reg);
            execArgs = match && match[1] ? match[1].split(/\s+/g) : ['.'];
        } else if(fis.util.exists(root + '/index.js')){
            execArgs = ['index.js'];
        } else {
            execArgs = ['.'];
        }
        lanuch.apply(null, execArgs);
    }

    function start(){
        var cwd;
        if(fis.util.exists(root + '/server/package.json')){
            cwd = root + '/server';
        } else if(fis.util.exists(root + '/package.json')){
            cwd = root;
        }

        if(cwd){
            var pkg = require(cwd + '/package.json');
            var privateDeps = [].concat(Object.keys(pkg.dependencies|| '') , Object.keys(pkg.devDependencies|| ''));
            // if(privateDeps.length > 0 && !hasbin.sync('cnpm')){
            //     fis.log.error('has private deps(' + privateDeps.join(',') + '), but not found cnpm !\nplz try: npm install cnpm -g --registry=http://registry.npm.alibaba-inc.com\nsee also http://web.npm.alibaba-inc.com/');
            // }else{
                var npm = childProcess.exec(hasbin.sync('cnpm') ? 'cnpm install' : 'npm install', { cwd : cwd });

                npm.stderr.pipe(process.stderr);
                npm.stdout.pipe(process.stdout);
                npm.on('exit', function(code){
                    if(code === 0){
                        startServer();
                    } else {
                        process.stderr.write('launch server failed\n');
                    }
                });
            // }
        } else {
            startServer();
        }
    }

    function stop(callback){
        var tmp = getPidFile();
        if (fis.util.exists(tmp)) {
            var pid = fis.util.fs.readFileSync(tmp, 'utf8').trim();
            var list, msg = '';
            var isWin = fis.util.isWin();
            if (isWin) {
                list = spawn('tasklist');
            } else {
                list = spawn('ps', ['-A']);
            }

            list.stdout.on('data', function (chunk) {
                msg += chunk.toString('utf-8').toLowerCase();
            });

            list.on('exit', function() {
                msg.split(/[\r\n]+/).forEach(function(item){
                    var reg = new RegExp('\\bnode\\b', 'i');
                    if (reg.test(item)) {
                        var iMatch = item.match(/\d+/);
                        if (iMatch && iMatch[0] === pid) {
                            try {
                                process.kill(pid, 'SIGINT');
                                process.kill(pid, 'SIGKILL');
                            } catch (e) {}
                            process.stdout.write('shutdown node process [' + iMatch[0] + ']\n');
                        }
                    }
                });
                fis.util.fs.unlinkSync(tmp);

                if (callback) {
                    callback();
                    // clean('',callback)
                }
            });
        } else {

            if (callback) {
                callback();
                // clean('',callback)
            }
        }
    }
    function clean(all,cb) {
        process.stdout.write(' δ '.bold.yellow);
        var now = Date.now();
        var include = fis.config.get('server.clean.include', null);
        var reg = all ? null : new RegExp('^' + fis.util.escapeReg(root + '/node_modules/'), 'i');
        var exclude = fis.config.get('server.clean.exclude', reg);
        fis.util.del(root, include, exclude);
        process.stdout.write((Date.now() - now + 'ms').green.bold);
        process.stdout.write('\n');
        cb && cb();
    }

    commander
        .option('-a, --all', 'clean all server files')
        .option('-L, --live', 'livereload server')
        .option('--debug [debugPort]', 'enable debug, default port is 5858', parseInt)
        .option('--debug-brk [debugPort]', 'enable debug-brk, default port is 5858', parseInt)
        .option('--harmony', 'enable harmony feature')
        .action(function(){
            var args = Array.prototype.slice.call(arguments);
            var options = args.pop();
            var cmd = args.shift();
            if(root){
                if(fis.util.exists(root) && !fis.util.isDir(root)){
                    fis.log.error('invalid document root [' + root + ']');
                } else {
                    fis.util.mkdir(root);
                }
            } else {
                fis.log.error('missing document root');
            }

            switch (cmd) {
                case 'start':
                    live = options.live;
                    debug = options.debug;
                    debugBrk = options.debugBrk;
                    harmony = options.harmony;
                    stop(start);
                    // start();
                    break;
                case 'stop':
                   stop();
                   break;
                case 'open':
                    open(root);
                    break;
                case 'path':
                    console.log(root);
                    break;
                case 'clean':
                    clean(options.all);
                    break;
                default :
                    commander.help();
            }
        });

    commander
        .command('start')
        .description('start server');

//    commander
//        .command('stop')
//        .description('shutdown server');

    commander
        .command('open')
        .description('open document root directory');

    commander
        .command('clean')
        .description('clean files in document root');
};
