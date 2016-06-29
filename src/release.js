'use strict';

var RELEASE = 'release';

module.exports = function (argv, media) {
    var fis = require('./fis3/fis');
    var cmd = fis.require('command', RELEASE);
    var FIS_ENV = require('./fis3/env');
    if (media) {
        fis.project.currentMedia(media);
        argv._ = [RELEASE, media];
    } else {
        argv._ = [RELEASE];
    }
    // fis.cli.run(argv, FIS_ENV)
    fis.set('options', argv);
    cmd.run(argv, {}, FIS_ENV);
};