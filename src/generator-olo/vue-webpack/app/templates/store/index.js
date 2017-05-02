
import Vue from 'vue';
import Vuex from 'vuex';
import account from './modules/account';
// import createLogger from '../../../src/plugins/logger';
Vue.use(Vuex);
// const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
    modules: {
        account,
    },
    strict: true,
    // plugins: debug ? [createLogger()] : []
});
