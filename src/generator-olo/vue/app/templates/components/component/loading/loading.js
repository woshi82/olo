/**
 * @version 1.0
 * @description 加载组件
 * @author Xxx
 */

'use strict';

var Vue = require('vue');
module.exports = Vue.component('loading', {
    props: ['loading'],
    template: __inline('./loading.html')
});
