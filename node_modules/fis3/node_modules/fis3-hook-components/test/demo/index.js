/**
 * Created by ryan on 15/5/15.
 */
var fs = require('fs'),
  path   = require('path');
var fis = require('fis');
var _      = fis.util,
  config = fis.config;
var expect = require('chai').expect;
var fis3_plugin_components = require('fis3-plugin-components');

describe('fis3-plugin-components index：', function() {
  beforeEach(function() {
    fis
      .media('production')

      .match('**/*.(*)', {
        useHash: false,
        release: '/output/$1/$&'
      })

      .match('**/*.js', {

        // optimizer: fis.plugin('uglify-js'),
      })

      .match('*.{css,scss}', {
        optimizer: fis.plugin('clean-css')
      })

      .match('*.png', {
        optimizer: fis.plugin('png-compressor')
      })

      .match('/components/**/*.js', {
        packTo: '/pkg/components.js'
      })

      .match('/components/**/*.css', {
        packTo: '/pkg/components.css'
      });

// 开启 autuload, 好处是，依赖自动加载。
    fis.set('modules.postpackager', fis.plugin('autoload'));

// 添加 scss 插件
    fis.match('*.scss', {
      parser: fis.plugin('sass', {
        include_paths: ['./static/scss']
      })
    });


  });

  it('release:start', function() {
    fis3_plugin_components(fis);
    console.log(__dirname);
    var root = path.join(__dirname, '');
    root = root.substring(0,root.lastIndexOf("/"));
    fis.project.setProjectRoot(root);
    fis.emit("release:start");


  });

  it('lookup:file', function() {
    fis3_plugin_components(fis);
    var root = path.join(__dirname, '');
    root = root.substring(0,root.lastIndexOf("/"));
    fis.project.setProjectRoot(root);
    var info = fis.project.lookup('/demo/fis-conf.js');
    expect(!info.file==false).to.be.true;
    var info = fis.project.lookup('/demo/component.json');
    expect(!info.file==false).to.be.true;
    var info = fis.project.lookup('/demo/index.html');
    expect(!info.file==false).to.be.true;
    var info = fis.project.lookup('/demo/static/css/style.css');
    expect(!info.file==false).to.be.true;
    var info = fis.project.lookup('/demo/static/scss/_mixin.scss');
    expect(!info.file==false).to.be.true;
  });

});
