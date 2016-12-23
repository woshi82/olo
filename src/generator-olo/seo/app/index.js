'use strict';
/**
 * index.js
 * @version [version]
 * @description [入口]
 * @author [Zengyanling(https://github.com/woshi82)]
 */
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
        this.template('_pm2.json', 'pm2.json');
        this.copy('app.js', 'app.js');
        this.copy('fis-conf.js', 'fis-conf.js');
        this.copy('.bowerrc', '.bowerrc');
        
        this.copy('.eslintrc', '.eslintrc');
        this.copy('.editorconfig', '.editorconfig');
        this.copy('gitignore', '.gitignore');
        this.copy('README.md', 'README.md');

        this.directory('libs', 'libs');
        this.directory('assets', 'assets');
        this.directory('views', 'views');
        this.directory('components', 'cmp');
        this.directory('mock', 'mock');

        this.directory('utils', 'utils');
        this.directory('middleware', 'middleware');
        this.copy('service/auth.js', 'service/auth.js');
        this.copy('controllers/index.js', 'controllers/index.js');
        this.copy('routes/init.js', 'routes/init.js');
        this.copy('routes/_conf.json', 'routes/_conf.json');
        
    }
});
