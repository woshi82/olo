'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
    constructor: function (args, options, config) {
        
        generators.Base.apply(this, arguments);
        // console.log(options);

        this.actName = options.actName;
        this.oloType = options.oloType;

    },
    // 创建文件结构
    makeProjectDirectoryStructure: function () {
        this.template('_package.json', 'package.json');
        this.template('_config.json', 'config.json');
        // this.copy('.bowerrc', '.bowerrc');

        this.directory('server', 'server');
        this.directory('libs', 'libs');
        this.directory('assets', 'assets');
        this.copy('fis-conf.js', 'fis-conf.js');
        

    }
});
