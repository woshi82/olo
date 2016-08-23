'use strict';

var path = require('path');

module.exports = function (cmd) {
    var yeoman = require('yeoman-environment');
    var env = yeoman.createEnv(),
    	oloType = '';
    if (cmd != 'app' && cmd != 'frame') {
    	oloType = require(path.join(process.cwd(),'package.json')).type || 'seo';
    }
    var gPath = './' + path.join('generator-olo',oloType, cmd, 'index.js');
    env.register(require.resolve(gPath), cmd);
    env.run(Array.prototype.join.call(arguments, ' '));
};
