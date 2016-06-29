var config = require('./config.json');
var keys = Object.keys(config);

function startWidth(str, search) {
  return str.indexOf(search) === 0;
}

function search(error) {
  var found = null;

  error = error + '';
  if (config[error]) {
    return config[error];
  }

  keys.every(function(key) {
    if (startWidth(error, key)) {
      found = key;
      return false;
    }

    return true;
  });

  return found && config[found];
}

module.exports = function(err, raw) {
  var item = search(raw);

  if (err && item) {
    err.message += '\n\n Check this out: '.red + item + '\n\n';
  }

  return err;
};
