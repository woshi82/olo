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
	router = require('./routes/init');

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

router(app);


var PORT = process.env.config.port || 2000;
var ROOT = process.env.config.root?('/' + process.env.config.root):'';
express()
    .use(ROOT, app)
    .listen(PORT, function() {
        ROOT? console.log('Server start! http://127.0.0.1:%d/%s/', PORT, process.env.root):console.log('Server start! http://127.0.0.1:%d/', PORT);
    });
