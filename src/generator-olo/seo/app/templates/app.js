/**
 * node服务入口文件
 */
var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    exphbs = require('express-handlebars'),
    helpers = require('./utils/helpers'),
    app = express(),
    basePath = process.cwd(),
    hbs = exphbs.create({
        extname: '.html',
        defaultLayout: 'main',
        helpers      : helpers,
        partialsDir      : ['components']
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
        view_path: '',    // 避免报错。
        rewrite_file: [ path.join(basePath, 'mock/server.conf')],
        data_path: [path.join(basePath, 'mock')]
    }));
}

router(app);


var PORT = process.env.PORT || 2000;
var ROOT = process.env.ROOT?('/' + process.env.ROOT):'';
express()
    .use(ROOT, app)
    .listen(PORT, function() {
        ROOT? console.log('Server start! http://127.0.0.1:%d/%s/', PORT, process.env.ROOT):console.log('Server start! http://127.0.0.1:%d/', PORT);
    });
