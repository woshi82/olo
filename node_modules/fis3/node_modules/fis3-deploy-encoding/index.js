/*
 * fis.baidu.com
 */

'use strict';

module.exports = function (options, modified, total, next) {
  var charset = fis.media().get('project.charset', 'utf8');
  modified.forEach(function (file) {
    if (file.isText() || typeof (file.getContent()) === 'string') {
      var to = file.charset || options.charset || charset;
      if (to !== 'utf8' && to !== 'utf-8') {
        file.setContent(
          fis.util.toEncoding(file.getContent(), to)
        );
        fis.log.debug('encoding to %s in file [%s]', to, file);
      }
    }
  });
  next();
};
