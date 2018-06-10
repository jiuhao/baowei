'use strict';
const DB = require('../common/mysql');
const articleDB = require('../db/article');
const ApiErrorNames = require('../error/apiErrorNames');

exports.getHome = async() => {
    let conn;
    let result;

    try {
        conn = await DB.getConnection();
        result = await articleDB.getHome(conn);
    } finally {
        await DB.release(conn);
    }

    return result;
};

exports.getBlock = async() => {
    let conn;
    let result;
    let obj = {};

    try {
        conn = await DB.getConnection();
        result = await articleDB.getBlock(conn);
    } finally {
        await DB.release(conn);
    }
    for (let i = 0; i < result.length; i++) {
        if (result[i].type in obj) {
            obj[result[i].type].push(result[i]);
        } else {
            obj[result[i].type] = [result[i]];
        }
    }

    return result;
};

/**
 *
 * @param param {currentPage, size, type}
 * @return {{total: *, list: *}}
 */
exports.listByClient = async(param) => {
    let conn;
    let list;
    let total;

    param.type = +param.type;
    try {
        conn = await DB.getConnection();
        list = await articleDB.listByClient(conn, param);
        total = await articleDB.countByClient(conn, param);
    } finally {
        await DB.release(conn);
    }

    return {
        total: total,
        list: list
    }
};

exports.loadByClient = async({id}) => {
    let conn;
    let result;

    if (!id) {
        throw new Error(ApiErrorNames.PARAM_ERROR);
    }

    try {
        conn = await DB.getConnection();
        result = await articleDB.load(conn, id);
    } finally {
        await DB.release(conn);
    }

    return result;
};
