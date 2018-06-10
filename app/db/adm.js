'use strict';
const DB = require('../common/mysql');

/**
 *
 * @param conn
 * @param username
 * @param password
 * @param role
 * @param nickname
 * @param mobile
 */
exports.add = async(conn, {username, password, role, nickname, mobile}) => {
    let sql;
    let data = [];

    sql = 'INSERT INTO adm(username,password,role,mobile,nickname) VALUES (?, ?, ?, ?, ?)';
    data.push(username);
    data.push(password);
    data.push(role);
    data.push(mobile);
    data.push(nickname);
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

exports.list = async(conn, param) => {
    let sql;
    let data = [];
    let skip = (param.currentPage - 1) * param.size;
    let result;

    sql = 'SELECT id, username, role, mobile, nickname FROM adm WHERE is_deleted = 0';
    if (param.keyword) {
        sql += ' AND (username LIKE ? OR nickname LIKE ? OR mobile LIKE ?)';
        data.push(`%${param.keyword}%`);
        data.push(`%${param.keyword}%`);
    }
    sql += ' ORDER BY id ASC LIMIT ?,?';
    data.push(skip);
    data.push(param.size);
    try {
        result = await DB.find({
            connection: conn,
            sql: sql,
            data: data
        })
    } catch (e) {
        throw e;
    }

    return result;
};
exports.count = async(conn, param) => {
    let sql;
    let data = [];
    let result;

    sql = 'SELECT count(id) countNum FROM adm WHERE is_deleted = 0';
    if (param.keyword) {
        sql += ' AND (username LIKE ? OR nickname LIKE ? OR mobile LIKE ?)';
        data.push(`%${param.keyword}%`);
        data.push(`%${param.keyword}%`);
    }
    try {
        result = await DB.findOne({
            connection: conn,
            sql: sql,
            data: data
        })
    } catch (e) {
        throw e;
    }

    return result.countNum;
};

exports.delete = async(conn, id) => {
    let sql;
    let data = [];
    let result;

    sql = 'UPDATE adm SET is_deleted = 1 WHERE id = ?';
    data.push(id);
    try {
        result = await DB.update({
            connection: conn,
            sql: sql,
            data: data
        })
    } catch (e) {
        throw e;
    }

    return result;
};

exports.update = async(conn, param) => {
    let sql;
    let data = [];
    let result;

    sql = 'UPDATE adm SET ';
    if (param.nickname) {
        sql += ' nickname = ?,';
        data.push(param.nickname);
    }
    if (param.mobile) {
        sql += ' mobile = ?,';
        data.push(param.mobile);
    }
    if (param.role) {
        sql += ' role = ?,';
        data.push(param.role);
    }
    sql = sql.substring(0, sql.length - 1);
    sql += ' WHERE id = ?';
    data.push(param.id);
    try {
        result = await DB.update({
            connection: conn,
            sql: sql,
            data: data
        })
    } catch (e) {
        throw e;
    }

    return result;
};

exports.loadByUsername = async(conn, username) => {
    let sql;
    let data = [username];
    let result;

    sql = 'SELECT * FROM adm WHERE username = ? AND is_deleted = 0';
    try {
        result = await DB.findOne({
            connection: conn,
            sql: sql,
            data: data
        })
    } catch (e) {
        throw e;
    }

    return result;
};