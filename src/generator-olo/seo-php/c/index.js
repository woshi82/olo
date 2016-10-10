'use strict';

var generators = require('yeoman-generator');
var chalk = require('chalk');
var _ = require('lodash');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        this.argument('subCommander', { type: String, required: true });
        this.argument('cmpName', { type: String, required: false });
    },

    // 初始化一个组件
    _createNewComponent: function () {
        if (!this.cmpName) {
            this.log(chalk.red('Error'), 'arg `cmpName` NOT found!');
            return;
        }
        // 固定入口文件为 `cmp/${cmpName}/index.${handlebars|js|scss}`
        
        // this.cmpName = _.kebabCase(this.cmpName);
        var componentPath = 'cmp/' + this.cmpName;
        var cmpName = componentPath  + '/' + this.cmpName;
        // this.directory('images', componentPath + '/images');
        this.template('_cmp.js', cmpName + '.js');
        this.template('_cmp.handlebars', cmpName + '.handlebars');
        this.template('_cmp.scss', cmpName + '.scss');
        this.template('_data-mock.js', cmpName + '-mock.js');
        // package.json 方便 require
        // this.template('_package.json', componentPath + '/package.json');
    },
    // 安装全部组件
    _bowerInstallAllCmp: function () {
        this.bowerInstall();
    },

    // 安装一个组件
    _bowerInstallCmp: function () {
        var cmpnt = this.cmpName;
        if (!cmpnt) {
            this.log(chalk.red('Error'), 'arg `cmpName` NOT found!');
            return;
        }
        // git 仓库 component
        cmpnt = 'git@github.com:general-cmps/'+cmpnt ;
        // 通过 bower 下载
        this.bowerInstall(cmpnt, {
            save: true
        },function(e){
            console.log('OK');
        });
    },
    // 主函数：创建文件结构
    makeComponent: function () {
        switch (this.subCommander) {
            // 初始化一个组件
            case 'create':
            case 'new':
            case 'n':
                if (this.cmpName) {
                    // 如果有指定 组件名称，则直接创建
                    this._createNewComponent();
                } else {
                    // 如果没有指定 组件名称，则询问
                    var done = this.async();
                    this.prompt([{
                        type: 'input',
                        name: 'cmpName',
                        message: 'Your component name',
                        default: 'my-cmp'
                    }], function (answers) {
                        this.cmpName = answers.cmpName;
                        this._createNewComponent();
                        done();
                    }.bind(this));
                }
                break;
            // 安装组件
            case 'install':
            case 'i':
                if (this.cmpName) {
                    // 如果有指定 组件名称，则直接下载改组件
                    this._bowerInstallCmp();
                } else {
                    // 如果没有指定 组件名称，则下载全部组件
                    // this._bowerInstallAllCmp();
                    var done = this.async();
                    this.prompt([{
                        type: 'input',
                        name: 'cmpName',
                        message: "what's name of the component you want to install"

                    }], function (answers) {
                        this.cmpName = answers.cmpName;
                        this._bowerInstallCmp();
                        done();
                    }.bind(this));
                }
                break;
            default:
                this.log(this.help());
        }
    }
});
