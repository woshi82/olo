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
        this.copy('.bowerrc', '.bowerrc');
        this.copy('.eslintrc', '.eslintrc');
        this.copy('.eslintignore', '.eslintignore');
        this.copy('.editorconfig', '.editorconfig');
        this.template('_package.json', 'package.json');
        this.template('_config.json', 'config.json');
        this.copy('fis-conf.js', 'fis-conf.js');       
        this.copy('gitignore', '.gitignore');
        this.copy('index.html', 'index.html');

        this.directory('libs', 'libs');
        this.directory('assets', 'assets');
        this.directory('components', 'components');
        this.directory('server', 'server');
        this.directory('mock', 'mock');
    }
});
