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
        this.copy('gitignore', '.gitignore');
        this.copy('index.hbs', 'index.hbs');

        this.directory('store', 'store');
        this.directory('mock', 'mock');
        this.directory('libs', 'libs');
        this.directory('config', 'config');
        this.directory('build', 'build');
        this.directory('components', 'components');
        this.directory('assets', 'assets');
    }
});
