
'use strict';

var generators = require('yeoman-generator');
var remote = require('yeoman-remote');
var rimraf = require('rimraf');
var chalk = require('chalk');
var _ = require('lodash');
var path =  require('path');
var fs =  require('fs');
// var util = require('util');
var generatorRoot = path.join( __dirname, '../');

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);
        this.argument('cmdType', { type: String, required: true });
        this.spawnArgument = arguments[0].slice(1);
    },
    prepare: function(){
        if (this.cmdType === 'app') {
            this._initPrompt();
        }else {
            this._otherOperate();
        }
    },
    _otherOperate: function(){
        try {
            var PACKAGE_JSON_PATH = './package.json';
            var packageContent = this.fs.readJSON(PACKAGE_JSON_PATH);
            this.actName = packageContent.name;
            this.oloType = packageContent.type;
        } catch (e) {
            this.log(
                '\n' +
                chalk.red('请初始化项目:  ') +
                ' ' + 
                chalk.blue('olo init 或 olo init -c')
            );
            return;
        };

        this._getTemplate(function (err, template) {
            if (err) return done(err);
            this.composeWith('olo:'+this.oloType, {
                options: {
                    oloType: this.oloType,
                    actName: this.actName
                },
                arguments: this.spawnArgument
            }, {
                local: require.resolve('../'+this.oloType+'/'+ this.cmdType)
            });
        });

        

    },
    _initPrompt: function(){
        var done = this.async();
        var defaultName = _.kebabCase(this.appname); // Default to current folder name
        var defaultType = '';

        // 读取 package.json 设置默认值
        try {
            var packageContent = this.fs.readJSON('./package.json');
            defaultName = packageContent.name;
            defaultType = packageContent.type;
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
            message: 'What type of olo project to init?',
            choices: [{
                name: 'seo',
                value: 'seo'
            }, {
                name: 'seo-php',
                value: 'seo-php'
            }, {
                name: 'vue',
                value: 'vue'
            }]
        }]).then(function(answers) { 
            this.actName = answers.name;
            this.oloType = answers.type;

            this._getTemplate(function (err, template) {
                if (err) return done(err);
                this.composeWith("olo:"+this.oloType, {
                    options: {
                        oloType: this.oloType,
                        actName: this.actName
                    }
                }, {
                    local: require.resolve("../"+this.oloType+"/app")
                });
                done();
            });
        }.bind(this));
    },
    _getTemplate: function(callback){
        var _this = this;
        var cacheTemplate = path.resolve(generatorRoot, this.oloType),
            archive = 'https://codeload.github.com/woshi82/olo-template-' + this.oloType + '/tar.gz/master';

        callback = callback || function () {};
        if (this.options.cleanCache) {
            this.log(
                '\n' +
                chalk.yellow('[getTemplate] clean cache template')
            );
            rimraf.sync(cacheTemplate);
        }

        if (fs.existsSync(cacheTemplate)) {
            this.log(
                '\n' +
                chalk.yellow('[getTemplate] find cache template')
            );
            return callback.call(this, null, cacheTemplate);
        }

        this.log(
            '\n' +
            chalk.yellow('[getTemplate] get template from '+ archive)
        );
        
        remote.extract(archive, cacheTemplate,{strip: 1}, function (err) {
            callback.call(_this, err, cacheTemplate);
        });

    }
});
