'use strict';

var Vue = require('vue');
var Loading = require('loading/loading.js');

module.exports = Vue.extend({
    template: __inline('./home.html'),
    components: {
        loading: Loading
    },
    data: function () {
        return {
            loaded: false
        };
    }
});


