var path = require('path');
var componentsInfo, componentsDir;


function onReleaseStart() {
  // 读取组件信息
  componentsInfo = {};
  componentsDir = (fis.config.env().get('component.dir') || 'components/').replace(/\/$/, '');

  if (componentsDir.substr(-1) !== '/') {
    componentsDir += '/';
  }

  var files = fis.project.getSourceByPatterns(componentsDir + '**/component.json');
  Object.keys(files).forEach(function(subpath) {
    var file = files[subpath];
    var cName = path.basename(path.dirname(subpath));
    var json;

    try {
      json = JSON.parse(file.getContent());
    } catch (e) {
      fis.log.warn('unable to load component.json of component `%s`.', cName);
    }

    if (json.hook && typeof json.hook === 'string') {
      try {
        var root = fis.project.getProjectPath();
        var hook = require(path.join(root, componentsDir, cName, json.hook));
        hook && hook(json, files);
      } catch (e) {
        // don't care
      }
    }
    
    json.name = json.name || cName;
    componentsInfo[json.name] = json;
  });

  fis.emit('components:info', componentsInfo);
}

function _findResource(name, path) {
  var extList = ['.js', '.jsx', '.coffee', '.css', '.sass', '.scss', '.less', '.html', '.tpl', '.vm'];
  var info = fis.uri(name, path);

  for (var i = 0, len = extList.length; i < len && !info.file; i++) {
    info = fis.uri(name + extList[i], path);
  }

  return info;
}

function findResource(name, dir) {
  var list = [
    name, 
    path.join(name, 'index'), 
    path.join(name, path.basename(name))
  ];
  var info;

  while (list.length) {
    name = list.shift();
    info = _findResource(name, dir);

    if (info && info.file) {
      break;
    }
  }

  return info;
}

function onFileLookUp(info, file) {

  // 如果已经找到了，没必要再找了。
  if (info.file || file && file.useShortPath === false) {
    return;
  }

  var m = /^([0-9a-zA-Z\.\-_]+)(?:\/(.+))?$/.exec(info.rest);
  if (m) {
    var cName = m[1];
    var subpath = m[2];
    var config = componentsInfo[cName] || {};
    var resolved;

    if (subpath) {
      resolved = findResource('/' + componentsDir+ cName + '/' + subpath, file ? file.dirname : fis.project.getProjectPath());
    } else {
      resolved = findResource('/' + componentsDir + cName + '/' + (config.main || 'index'), file ? file.dirname : fis.project.getProjectPath());

      if (!resolved.file) {
        resolved = findResource('/' + componentsDir + cName + '/' + cName, file ? file.dirname : fis.project.getProjectPath());
      }
    }

    // 根据规则找到了。
    if (resolved.file) {
      info.id = resolved.file.getId();
      info.file = resolved.file;
    }
  }
}


module.exports = function(fis, opts) {
  fis.on('release:start', onReleaseStart);
  fis.on('lookup:file', onFileLookUp);
};
