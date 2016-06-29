'use strict';

[
    'clean',
    'start',
    'open',
    'stop'
].map(function (cmdLine) {
    exports[cmdLine] = function () {
        var commander = require('commander');
        var cmd = require('./fis3/scrat-command-server');

        cmd.register(
            commander
                .command(cmd.name)
                .usage(cmd.usage)
                .description(cmd.desc)
        );
        // '-L'： livereload server
        commander.parse(process.argv.slice(0, 2).concat(['server', cmdLine, '-L']));
    };
});
