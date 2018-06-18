'use strict';
const DB = require('../common/mysql');
const messageDB = require('../db/message');
const ApiErrorNames = require('../error/apiErrorNames');
const ApiError = require('../error/apiError');

exports.add = async({content}) => {
    let conn;

    if (!content || content.replace(/' '/g, '') == '填写留言') {
        throw new ApiError({
            code: -1,
            message: '内容必填'
        });
    }
    try {
        conn = await DB.getConnection();
        await messageDB.add(conn, content);
    } catch (e) {
        throw e;
    } finally {
        await DB.release(conn);
    }

    return 'success';
};