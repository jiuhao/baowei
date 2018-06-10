'use strict';
const DB = require('../../common/mysql');
const permissionDB = require('../../db/permission');
const ApiErrorNames = require('../../error/apiErrorNames');

exports.list = async() => {
    let conn;
    let result;

    try {
        conn = await DB.getConnection();
        result = await permissionDB.list(conn);
    } catch (e) {
        throw e;
    } finally {
        await DB.release(conn);
    }

    return result;
};

/**
 *
 * @param param {name, url, parent_id, type}
 * @return {string}
 */
exports.add = async(param) => {
    let conn;

    if (!param.name || !param.url || !['menu', 'method'].includes(param.type)) {
        throw new Error(ApiErrorNames.PARAM_ERROR);
    }
    try {
        conn = await DB.getConnection();
        await permissionDB.add(conn, param);
    } catch (e) {
        throw e;
    } finally {
        await DB.release(conn);
    }

    return 'success';
};

exports.delete = async({id}) => {
    let conn;

    if (!id) {
        throw new Error(ApiErrorNames.PARAM_ERROR);
    }
    try {
        conn = await DB.getConnection();
        await permissionDB.delete(conn, id);
    } catch (e) {
        throw e;
    } finally {
        await DB.release(conn);
    }

    return 'success';
};