'use strict';
const DB = require('../common/mysql');

/**
 * 创建角色
 * @param conn
 * @param code
 * @param name
 * @param permissions
 */
exports.add = async(conn, {code, name, permissions}) => {
    let sql;
    let data = [code, name, permissions || ''];

    sql = 'INSERT INTO role(name, code, permissions) VALUES (?,?,?)';
    try {
        await DB.insert({
            connection: conn,
            sql: sql,
            data: data
        })
    } catch (e) {
        throw e;
    }
};

exports.load = async(conn, id) => {
    let sql;
    let data = [id];
    let result;

    sql = 'SELECT permissions FROM role WHERE id = ?';
    try {
        result = await DB.findOne({
            connection: conn,
            sql: sql,
            data: data
        })
    } catch (e) {
        throw e;
    }

    return result.permissions;
};

exports.list = async(conn) => {
    let sql;
    let result;

    sql = 'SELECT id, code, name FROM role';
    try {
        result = await DB.find({
            connection: conn,
            sql: sql
        })
    } catch (e) {
        throw e;
    }

    return result;
};