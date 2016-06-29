'use strict';

var URI_REG = /\b(__uri)\(\s*('|")([^'"]+)\2\s*\)/g;      

var path = require('path');
var through = require('through');

/**
 * Browserify transform
 * change `__uri('path')` to relative path from sourceFilePath
 */
module.exports = function (sourceFilePath) {
    return function (inputFileRealPath) {
        var chunks = [];

        var onwrite = function (buffer) {
          chunks.push(buffer);
        };

        var onend = function () {
            var contents = Buffer.concat(chunks)
                .toString('utf8')
                .replace(URI_REG, function (match, uriFn, quotmark, depFileName) {
                    // 转换 __uri(当前文件相对路径) 为 入口文件的相对路径
                    var depFileRealPath = path.resolve(path.dirname(inputFileRealPath), depFileName);
                    var depFileRelativePath = path.relative(path.dirname(sourceFilePath), depFileRealPath)
                                                .replace(/\\/g, '/');
                    return uriFn + '(' + quotmark + depFileRelativePath + quotmark + ')';
                });
          this.queue(contents);
          this.queue(null);
        };

        return through(onwrite, onend);
    };
};
