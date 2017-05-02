/*
 * @Author: yourName
 * @Date: 2017-04-28 16:22:29
 * @Last Modified by:   zengyanling
 * @Last Modified time: 2017-04-28 16:22:29
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Index from 'page/index/index';

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
    routes: [
        {
            path: '/index',
            component: Index,
        }, {
            path: '*',
            redirect: '/index',
        },
    ],
});

new Vue({
    el: '#app',
    router,
    render(createElement) {
        return createElement('router-view');
    },
    // render: h => h(App)
});
