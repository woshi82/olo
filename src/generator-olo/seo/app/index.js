'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
    constructor: function (args, options, config) {

        generators.Base.apply(this, arguments);

        this.actName = options.actName;
        this.oloType = options.oloType;

    },
    // 创建文件结构
    makeProjectDirectoryStructure: function () {
        this.template('_package.json', 'package.json');
        this.template('_config.json', 'config.json');
        this.copy('app.js', 'app.js');
        this.copy('fis-conf.js', 'fis-conf.js');
        // this.copy('.bowerrc', '.bowerrc');

        this.directory('libs', 'libs');
        this.directory('utils', 'utils');
        this.directory('assets', 'assets');
        this.directory('views', 'views');
        this.directory('components', 'components');
        this.directory('middleware', 'middleware');
        this.directory('service', 'service');
        this.directory('controllers', 'controllers');
        this.directory('routes', 'routes');
    }
});
