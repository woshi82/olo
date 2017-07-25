'use strict';

var path = require('path');

module.exports = function (cmd) {
    var yeoman = require('yeoman-environment');
    var env = yeoman.createEnv(),
    	argumentsArray = Array.prototype.slice.call(arguments,0),
    	cleanCacheIndex = argumentsArray.indexOf('clean');
    	
    if (cmd != 'frame') {
	    if (cleanCacheIndex !== -1) {
	    	argumentsArray.splice(cleanCacheIndex, 1);
	    }
	    var gPath = './' + path.join('generator-olo', 'app', 'index.js');
	    env.register(require.resolve(gPath), 'app');
	    env.run('app ' + argumentsArray.join(' '), {
	    	cleanCache:  (cleanCacheIndex !== -1)
	    });
	}else {
		var gPath = './' + path.join('generator-olo', cmd, 'index.js');
	    env.register(require.resolve(gPath), cmd);
	    env.run(Array.prototype.join.call(arguments, ' '));
	}
};
