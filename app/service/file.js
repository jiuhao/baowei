'use strict';
const DB = require('../common/mysql');
const fileDB = require('../db/file');
const ApiErrorNames = require('../error/apiErrorNames');
const config = require('../config');

exports.getBlock = async() => {
    let conn;
    let result;

    try {
        conn = await DB.getConnection();
        result = await fileDB.getBlock(conn);
    } finally {
        await DB.release(conn);
    }
    for (let i = 0; i < result.length; i++) {
        result[i].url = `${config.sys.file_prefix}${result[i].url}`
    }

    return result;
};

/**
 *
 * @param param {page, size, keyword}
 * @return {*}
 */
exports.list = async(param) => {
    let conn;
    let result;
    let list;
    let total;

    try {
        conn = await DB.getConnection();
        list = await fileDB.listByClient(conn, param);
        total = await fileDB.countByClient(conn, param);
    } finally {
        await DB.release(conn);
    }
    for (let i = 0; i < list.length; i++) {
        list[i].url = `${config.sys.file_prefix}${list[i].url}`
    }

    return {
        list: list,
        total: total
    };
};