/*
 * @Author: zengyanling
 * @Date: 2017-04-20 10:46:38
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-04-26 21:49:37
 */

import { commonRequestMutation, commonAction, storageHandler } from '../commonHandler';
import { fetchLogin, fetchVerifyToken } from '../../api';
import * as types from '../mutation-types';

let storageAccount = storageHandler.fetch('account');
storageAccount = storageAccount ? JSON.parse(storageAccount) : {};
const state = {
    account: {
        token: storageAccount.token || null,
        info: storageAccount.info || null,
    },
    login: {
        isFetching: false,
    },
    register: {
        isFetching: false,
    },
    seccode: {
        isFetching: false,
    },
    findpassword: {
        isFetching: false,
    },
    setpassword: {
        isFetching: false,
    },
};

// getters
const getters = {
    infoData: state => state.account.info,
    loginData: state => state.login,
};

// actions
const actions = {
    verifyToken({ dispatch, commit, state }, payload) {
        const token = state.account.token;
        if (token && token.access_token) {
            fetchVerifyToken(token.access_token).then(
                (response) => {
                    commit(types.ACCOUNT, { ...response.data });
                },
                (error) => {
                    commit(types.LOGOUT);
                },
            );
        } else {
            commit(types.LOGOUT);
        }
    },
    login({ dispatch, commit }, payload) {
        commonAction(types.LOGIN, payload, fetchLogin, (response) => {
            commit(types.ACCOUNT, response.data);
            commit(types.LOGIN.SUCCESS);
        });
    },
};

// mutations
const mutations = {
    [types.ACCOUNT](state, payload) {
        storageHandler.save('account', JSON.stringify(payload));
        state.account = { ...payload };
    },
    [types.LOGOUT](state, payload) {
        storageHandler.save('account', '');
        state.account = { info: null, token: null };
    },
    ...commonRequestMutation('login', types.LOGIN),
};

export default {
    state,
    getters,
    actions,
    mutations,
};
