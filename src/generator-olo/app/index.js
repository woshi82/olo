
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


        this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: defaultName
        },  {
            type: 'list',
            name: 'type',
            message: 'What type of scrat project to init?',
            choices: [{
                name: 'seo',
                value: 'seo'
            }, {
                name: 'seo-php',
                value: 'seo-php'
            }]
        }], function(answers) {
            // {
            //     name: 'webapp',
            //     value: 'webapp'
            // }
            this.actName = answers.name;
            this.oloType = answers.type;
            console.log("../"+this.oloType+"/app");
            this.composeWith("olo:seo", {
                options: {
                    actName: this.actName,
                    oloType: this.oloType
                }
                // args: [this.appname]
            }, {
                local: require.resolve("../"+this.oloType+"/app")
            });
            done();
        }.bind(this));
    }
});
