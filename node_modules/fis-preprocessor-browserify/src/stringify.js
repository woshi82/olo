'use strict';


var path = require('path');
var through = require('through');

function hasStringifiableExtension (filename, extensions) {
    var fileExtName = path.extname(filename).toLowerCase();
    return extensions.indexOf(fileExtName) >= 0;
}

/**
 * 使用 fis 中的 __inline(*.html) 处理 require(*.html)
 */
function require2Inline (filepath) {
    return 'module.exports = __inline("' + filepath + '");\n';
}

module.exports = function (extensions, sourceDir) {
    if (!extensions) {
        extensions = [];
    }
    return function (inputFileRealPath) {
        if (!hasStringifiableExtension(inputFileRealPath, extensions)) {
            return through();
        }

        var onwrite = function () {};
        var onend = function () {
            var filePath = path.relative(sourceDir, inputFileRealPath);
            this.queue(require2Inline(filePath));
            this.queue(null);
        };
        return through(onwrite, onend);
    };
};
