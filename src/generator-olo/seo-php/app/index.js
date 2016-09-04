'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
    constructor: function () {
        
        generators.Base.apply(this, arguments);
        this.oloType = this.options.oloType;
        this.actName = this.options.actName;

    },
    // 创建文件结构
    makeProjectDirectoryStructure: function () {
        this.template('_package.json', 'package.json');
        this.template('_config.json', 'config.json');
        this.copy('.bowerrc', '.bowerrc');
        this.copy('.eslintrc', '.eslintrc');
        this.copy('.editorconfig', '.editorconfig');
        this.copy('gitignore', '.gitignore');

        this.directory('server', 'server');
        this.directory('libs', 'libs');
        this.directory('assets', 'assets');
        this.directory('mock', 'mock');
        this.copy('fis-conf.js', 'fis-conf.js');
        

    }
});
