
'use strict';

var generators = require('yeoman-generator');
var chalk = require('chalk');
var _ = require('lodash');



module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);

    },

    // 询问 活动名称
    promptActName: function() {
        var done = this.async();
        var defaultName = _.kebabCase(this.appname); // Default to current folder name
        var defaultType = '';

        // 读取 package.json 设置默认值
        try {
            var PACKAGE_JSON_PATH = './package.json';
            var packageContent = this.fs.readJSON(PACKAGE_JSON_PATH);
            defaultName = packageContent.name;
            defaultType = packageContent.olotype;
            // defaultGitHost = packageContent.biketo.git;
        } catch (e) {
            // console.log(e);
        }
        
        var done = this.async();    
        this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: defaultName
        },  {
            type: 'list',
            name: 'type',
            message: 'What type of olo project to init?',
            choices: [{
                name: 'seo',
                value: 'seo'
            }, {
                name: 'seo-php',
                value: 'seo-php'
            }]
        }]).then(function(answers) {
            this.log(answers);
            
            this.actName = answers.name;
            this.oloType = answers.type;
            this.composeWith("olo:"+this.oloType, {
                options: {
                    oloType: this.oloType,
                    actName: this.actName
                }
            }, {
                local: require.resolve("../"+this.oloType+"/app")
            });
            done();
        }.bind(this));
    }
});
