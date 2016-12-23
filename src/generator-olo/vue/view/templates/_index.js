/**
 * @version 1.0.0
 * @description 
 * @author Xxx
 */

'use strict';

var Vue = require('vue');
module.exports = Vue.component('<%= viewName %>', {
    template: __inline('./<%= viewName %>.html')
});
