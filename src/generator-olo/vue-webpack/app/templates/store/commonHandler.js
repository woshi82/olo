/*
 * @Author: zengyanling
 * @Date: 2017-04-28 16:15:57
 * @Last Modified by:   zengyanling
 * @Last Modified time: 2017-04-28 16:15:57
 */

import store from './index';
import { ACCOUNT } from './mutation-types';
import { fetchToken } from '../api';

export const commonRequestMutation = (name, type) => ({
    [type.REQUEST](state, payload) {
        state[name] = {
            ...state[name],
            isFetching: true,
            ...payload,
        };
    },
    [type.SUCCESS](state, payload = {}) {
        state[name] = {
            ...state[name],
            status: 0, // 请求成功默认为 0
            isFetching: false,
            ...payload,
        };
    },
    [type.FAILURE](state, error) {
        const data = error.data ? { data: error.data } : {};
        state[name] = {
            ...state[name],
            isFetching: false,
            status: error.status || -1, // -1 代表本地请求错误
            message:  error.status ? error.message : error,
            ...data,
        };
    },
});

const actionHandler = (type, token, payload, api, successCb) => {
    store.commit(type.REQUEST, payload);
    api(payload, token).then(
        (response) => {
            if (successCb) {
                successCb(response);
            } else {
                store.commit(type.SUCCESS);
            }
        },
        (error) => {
            store.commit(type.FAILURE, error);
        },
    );
};


export const commonAction = (type, payload, api, successCb) => {
    const token = store.state.account.account.token;
    if (token) {
        actionHandler(type, token.access_token, payload, api, successCb);
    } else {
        fetchToken().then(
            (response) => {
                store.commit(ACCOUNT, { token: { ...response.data } });
                actionHandler(type, response.data.access_token, payload, api, successCb);
            },
            (error) => {
                store.commit(type.FAILURE, error);
            },
        );
    }
};

const STORAGE_KEY = 'TEST';

export const storageHandler = {
    fetch(key) {
        const reg = new RegExp('(^| )' + (STORAGE_KEY + key) + '=([^;]*)(;|$)');
        const arr = document.cookie.match(reg);
        if (arr) {
            return unescape(arr[2]);
        }
        return null;
    },
    save(key, val) {
        const Days = 30;
        const exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = (STORAGE_KEY + key) + '=' + escape(val) + ';expires=' + exp.toGMTString();
    },
};
