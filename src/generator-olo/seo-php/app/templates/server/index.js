var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    app = express(),
    ROOT = process.env.root?('/' + process.env.root):'',
    BASE_DIR = path.join(__dirname, '..');    

app.use(express.static(BASE_DIR, {}));

/**
 * 生成 404 页面 HTML
 * @param  {string} pageName 页面
 * @return {string}          404 页面 HTML
 */
function generate404HTML(pageName) {
    return [
        '<html><body>',
            '<h1>404</h1>',
            '<p>',
                'page `<span style="color:red">',
                pageName,
            '</p>',
        '</body></html>'
    ].join('');
}

/**
 * @Important!!
 * 请保持这段代码在最后的位置，保证页面路由(/:pageName)的优先级不会高过于其它
 */
app.get('/:pageName', function (req, res, next) {
    var pageName = req.params.pageName,
        filePath = path.resolve(BASE_DIR, (pageName||'index')+ '.html');
    try {
        var stats = fs.lstatSync(filePath);
        if (stats.isFile()) {
            res.sendFile(filePath);
        } else {
            res.status(400).send(generate404HTML(pageName));
        }
    } catch(e) {
        res.status(400).send(generate404HTML(pageName));
    }
});

var PORT = process.env.port || 2000;
express()
    .use(ROOT, app)
    .listen(PORT, function() {
       ROOT? console.log('Server start! http://127.0.0.1:%d/%s/', PORT, process.env.root):console.log('Server start! http://127.0.0.1:%d/', PORT);
    });

