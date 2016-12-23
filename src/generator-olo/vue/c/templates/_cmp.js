/**
 * @version 1.0.0
 * @description 
 * @author Xxx
 */

'use strict';

var Vue = require('vue');
module.exports = Vue.component('<%= cmpName %>', {
    template: __inline('./<%= cmpName %>.html')
});
