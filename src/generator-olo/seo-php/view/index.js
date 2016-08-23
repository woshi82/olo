'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
    constructor: function (args, options, config) {

        generators.Base.apply(this, arguments);

        this.argument('viewName', { type: String, required: true });
        
        // this.viewName = _.camelCase(this.viewName).toLowerCase();
    },
    // 创建文件结构
    makeProjectDirectoryStructure: function () {


        var viewFilePath = 'views/' + this.viewName;
        var viewFileName = viewFilePath + '/' + this.viewName;
 
        this.copy('index.js', viewFileName + '.js');
        this.template('_index.handlebars', viewFileName + '.handlebars');
        this.copy('index.scss', viewFileName + '.scss');
        this.template('_data-mock.js', viewFileName + '-mock.js');
    }
});
