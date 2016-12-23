'use strict'
var express = require('express');
var path = require('path');
var BASE_DIR = path.join(__dirname, '..');
var app = express();

app.use(express.static(BASE_DIR, {}));
app.use(require('yog-devtools')({
    view_path: '', // 避免报错。
    rewrite_file: [path.join(BASE_DIR, 'mock/server.conf')],
    data_path: [path.join(BASE_DIR, 'mock')]
}));

app.get('/', function(req, res) {
    res.sendFile(path.resolve(BASE_DIR + '/index.html'));
});

var PORT = process.env.port || 8000;
app.listen(PORT, function() {
    console.log('Server start! http://127.0.0.1:%d/', PORT);
});
