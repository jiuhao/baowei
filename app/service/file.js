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