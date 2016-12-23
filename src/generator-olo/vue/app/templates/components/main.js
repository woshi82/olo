var Vue = require('vue');
var VueRouter = require('vue-router');

Vue.use(VueRouter);
// var VueValidator = require('vue-validator');
// Vue.use(VueValidator);
// console.log(VueValidator);
var VueResource = require('vue-resource');
Vue.use(VueResource);

var Translation = {
    data: function(){
        return {
            URLPRE: ''
        }
    }
};
Vue.mixin(Translation);

var router = new VueRouter({
    routes: [
        {
            path: '/index',
            component: require('page/home/home.js')
        },
        { path: '*', redirect: '/index' }
    ]
});


var vm = new Vue({
    el: '#app',
    router: router,
    render: function(createElement){
        return createElement(
            'router-view'
        )
    }
});

