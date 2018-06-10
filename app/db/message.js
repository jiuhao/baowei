'use strict';
const DB = require('../common/mysql');
const Time = require('../utils/time');

/**
 * 提交留言
 */
exports.add = async(conn, content) => {
    let sql;
    let data = [content];

    sql = 'INSERT INTO message(content) VALUES (?)';
    await DB.insert({
        connection: conn,
        sql: sql,
        data: data
    });
};

exports.list = async(conn, param) => {
    let sql;
    let data = [];
    let skip = (param.currentPage - 1) * param.size;

    sql = 'SELECT id, content, answer, is_public_show, create_time FROM message WHERE is_deleted = 0';
    if ([0, 1].includes(param.is_public_show)) {
        sql += ' AND is_public_show = ?';
        data.push(param.is_public_show);
    }
    sql += ' LIMIT ?,?';
    data.push(skip);
    data.push(param.size);
    return await DB.find({
        connection: conn,
        sql: sql,
        data: data
    });
};
exports.count = async(conn, param) => {
    let sql;
    let data = [];
    let result;

    sql = 'SELECT COUNT(id) countNum FROM message WHERE is_deleted = 0';
    if ([0, 1].includes(param.is_public_show)) {
        sql += ' AND is_public_show = ?';
        data.push(param.is_public_show);
    }
    result = await DB.findOne({
        connection: conn,
        sql: sql,
        data: data
    });

    return result.countNum;
};

exports.answer = async(conn, {id, answer}) => {
    let sql;
    let data = [];

    sql = 'UPDATE message SET answer = ?, answer_time = ? WHERE id = ?';
    data.push(answer);
    data.push(Time.timestampToString(+new Date(), 'YYYY-MM-DD hh:mm:ss'));
    data.push(id);
    await DB.find({
        connection: conn,
        sql: sql,
        data: data
    });
};