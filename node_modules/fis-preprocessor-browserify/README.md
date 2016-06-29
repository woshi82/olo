# fis-preprocessor-browserify

A browserify preprocessor for [fis](http://fex-team.github.io/fis-site/) / [Scrat](http://scrat.io) with default transforms:

- [debowerify](https://www.npmjs.com/package/debowerify)

## Usage

You can use all [browserify opts](https://github.com/substack/node-browserify#browserifyfiles--opts):

```javascript
fis.config.set('settings.preprocessor.browserify', {
    // browserify opts
    browserify: {
        debug: true
    },
});
```

### fis2

```javascript
fis.config.set('modules.preprocessor.js', 'browserify');
fis.config.set('roadmap.path', [
    {
        // entry js
        reg: 'views/**/*.js',
        // `isLayout` should be `TRUE`
        isLayout: true
    }, {
        // other js `isLayout` != `TRUE`
        reg: '**/*.js'
    }
]);
```

### fis3

```javascript
fis.match('index.js', {
    release: '$0',
    preprocessor: fis.plugin('browserify')
});
```
