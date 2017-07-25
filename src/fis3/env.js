var path = require('path');
var cwd = process.cwd();

var FIS_ENV = {
    cwd: cwd,
    configPath: path.join(cwd, 'fis-conf.js'),
    configBase: cwd
};

module.exports = FIS_ENV;
