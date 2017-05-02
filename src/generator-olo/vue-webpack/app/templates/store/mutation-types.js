/*
 * @Author: zengyanling
 * @Date: 2017-04-28 16:16:12
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-04-28 16:16:35
 */

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
    return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
        acc[type] = `${base}_${type}`;
        return acc;
    }, {});
}

export const ACCOUNT = 'ACCOUNT';
export const LOGOUT = 'LOGOUT';
export const LOGIN = createRequestTypes('LOGIN');

