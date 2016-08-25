'use strict';

var browserify = require('./src/browserify');
var isFis3 = require('./src/version').isFis3;

module.exports = function (content, file, conf) {
    if (file.isJsLike && /\.js/.test(file.realpath)) {
        // 如果不是 fis3 需要声明 isLayout = true
        if (isFis3 || file.isLayout) {
            content = browserify(file, (conf || {}).browserify);
        }
    }
    return content;
};
