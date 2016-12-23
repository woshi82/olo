'use strict';
/**
 * app.js
 * @version 1.0
 * @description node服务入口文件
 * @author Xxx
 */

var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    exphbs = require('express-handlebars'),
    helpers = require('./utils/helpers'),
    app = express(),
    basePath = process.cwd(),
    hbs = exphbs.create({
        extname: '.html',
        defaultLayout: 'main',
        helpers: helpers,
        partialsDir: ['cmp']
    }),
    router = require('./routes/init'),
    configFile = require('./config.json');



if (!!configFile[process.env.NODE_ENV]) {
    var config = configFile[process.env.NODE_ENV];
    for (var attr in config) {
        process.env[attr] = config[attr];
    }
}

app.engine('.html', hbs.engine);
app.set('view engine', '.html');
app.set('views', path.join(basePath, 'views/'));

//压缩静态文件
app.use(compression());

app.use(express.static(path.join(basePath, 'public/')));
app.use(favicon(basePath + '/public/images/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.use(express.multipart());
app.use(session({
    secret: 'biketo',
    resave: true,
    saveUninitialized: false
}));

if (process.env.NODE_ENV === 'dev') {
    // mock 功能
    app.use(require('yog-devtools')({
        view_path: '', // 避免报错。
        rewrite_file: [path.join(basePath, 'mock/server.conf')],
        data_path: [path.join(basePath, 'mock')]
    }));
}

router(app);


var PORT = process.env.PORT || 8000;

app.listen(PORT, function() {
    console.log('Server start! http://127.0.0.1:%d/', PORT);
});
