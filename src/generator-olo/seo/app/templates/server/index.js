var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
	exphbs = require('express-handlebars'),
    app = express(),
    basePath = process.cwd(),
    hbs = exphbs.create({
    	extname: '.html',
		defaultLayout: 'main',
		// helpers      : helpers,
		partialsDir      : ['c']
	}),
	router = require('./router/init');

app.engine('.html', hbs.engine);
app.set('view engine', '.html');
app.set('views', path.join(basePath, 'views/'));

app.use(express.static(path.join(basePath, 'public/')));
app.use(favicon(basePath + '/public/images/favicon.ico'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.cookieParser());
// app.use(express.multipart());
app.use(session({
    secret: 'biketo',
    resave: true
}));

router(app);


var PORT = process.env.port || 2000;
var ROOT = process.env.root?('/' + process.env.root):'';    
express()
    .use(ROOT, app)
    .listen(PORT, function() {
        ROOT? console.log('Server start! http://127.0.0.1:%d/%s/', PORT, ROOT):console.log('Server start! http://127.0.0.1:%d/', PORT);
    });
