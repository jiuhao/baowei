'use strict';
const DB = require('../../common/mysql');
const roleDB = require('../../db/role');
const ApiErrorNames = require('../../error/apiErrorNames');

exports.add = async(param) => {
    let conn;

    if (!param.code || !param.name || !param.permissions) {
        throw new Error(ApiErrorNames.PARAM_ERROR);
    }
    try {
        conn = await DB.getConnection();
        await roleDB.add(conn, param);
    } catch (e) {
        throw e;
    } finally {
        await DB.release(conn);
    }

    return 'success';
};

exports.load = async({id}) => {
    let conn;
    let result;

    if (!id) {
        throw new Error(ApiErrorNames.PARAM_ERROR);
    }
    try {
        conn = await DB.getConnection();
        result = await roleDB.load(conn, id);
    } catch (e) {
        throw e;
    } finally {
        await DB.release(conn);
    }

    return result;
};

exports.list = async() => {
    let conn;
    let result;

    try {
        conn = await DB.getConnection();
        result = await roleDB.list(conn);
    } catch (e) {
        throw e;
    } finally {
        await DB.release(conn);
    }

    return result;
};