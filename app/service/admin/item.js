'use strict';
const DB = require('../../common/mysql');
const itemDB = require('../../db/item');
const ApiErrorNames = require('../../error/apiErrorNames');

/**
 *
 * @param param {name, url, parent_id}
 * @return {string}
 */
exports.add = async(param) => {
    let conn;
    if (!param.name) {
        throw new Error(ApiErrorNames.PARAM_ERROR);
    }
    try {
        conn = await DB.getConnection();
        await itemDB.add(conn, param);
    } catch (e) {
        throw e;
    } finally {
        await DB.release(conn);
    }

    return 'success';
};

exports.list = async() => {
    let conn;
    let result;

    try {
        conn = await DB.getConnection();
        result = await itemDB.list(conn);
    } catch (e) {
        throw e;
    } finally {
        await DB.release(conn);
    }

    return result;
};