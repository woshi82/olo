'use strict';
//var convert = require('convert-source-map');
var sm = require('source-map');
var fis = require('fis3');
var path = require('path');

module.exports = function(file, line, col, isAll) {
    var realPath = '',
        smFileName = getFileName(file) + '\.map',
        searchPath = path.resolve(isAll?'':'./sourcemap'),
        files;
    //direction is not exist
    if(!fis.util.realpath(searchPath)){
        searchPath = path.resolve();
    }
    files = fis.util.find(searchPath, [new RegExp(smFileName)], null, path.resolve());
    if(files.length===1){
        realPath = files[0];
    }else if(files.length<1){
        console.log('cannot find ' + file + '\'s source map');
        return;
    }else{
        console.log('more than one file name ' + smFileName);
        return;
    }
    var sourceMap = JSON.parse(fis.util.read(realPath));
    if (sourceMap) {
        var smc = new sm.SourceMapConsumer(sourceMap),
            origin = smc.originalPositionFor({
                line: parseInt(line),
                column: parseInt(col)
            });
        console.log('源文件 : ' + origin.source);
        console.log('错误行 : ' + origin.line);
        console.log('错误列 : ' + origin.column);
    }
}

function getFileName(errFile) {
    return errFile.substring(0, errFile.indexOf('.js') > -1 ? errFile.indexOf('.js') : errFile.length);
}