'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
    constructor: function (args, options, config) {

        generators.Base.apply(this, arguments);

        this.argument('frameName', { type: String, required: true });
        
        // this.viewName = _.camelCase(this.viewName).toLowerCase();
    },
    // 创建文件结构
    makeProjectDirectoryStructure: function () {
        var jsPath = 'libs/';
        var cssPath = 'css/';

        switch(this.frameName){
            case 'jq':
            case 'jquery':
                this.copy('jquery.min.js', jsPath + 'jquery.min.js');
                break;
            case 'ejs':
                this.copy('ejs.js', jsPath + 'ejs.js');
                break; 
            case 'zepto':
                this.copy('zepto.min.js', jsPath + 'zepto.min.js');
                break;
            case 'throttle':
                this.copy('throttle.js', jsPath + 'throttle.js');
                break; 
            default:
                this.log('[INFO]olo中暂时没有这个库:'+this.frameName);               
        }
    }
});
