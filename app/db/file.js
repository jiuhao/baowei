'use strict';
const DB = require('../common/mysql');

exports.add = async(conn, {name, url}) => {
    let sql;
    let data = [];

    sql = 'INSERT INTO file(name,url) VALUES (?, ?)';
    data.push(name);
    data.push(url);
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

    sql = 'SELECT id,name,url,create_time, is_public_show FROM file WHERE is_deleted = 0';
    if ([0, 1].includes(param.is_public_show)) {
        sql += ' is_public_show = ?';
        data.push(param.is_public_show);
    }
    if (param.keyword) {
        sql += ' AND name LIKE ?';
        data.push(param.keyword);
    }
    sql += ' LIMIT ?,?';
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

    sql = 'SELECT count(id) countNum FROM file WHERE is_deleted = 0';
    if ([0, 1].includes(param.is_public_show)) {
        sql += ' is_public_show = ?';
        data.push(param.is_public_show);
    }
    if (param.keyword) {
        sql += ' AND name LIKE ?';
        data.push(param.keyword);
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

exports.getBlock = async(conn) => {
    let sql;

    sql = 'SELECT name, url FROM file ORDER BY create_time DESC LIMIT 6';
    return await DB.find({
        connection: conn,
        sql: sql
    })
};

exports.listByClient = async(conn, param) => {
    let sql;
    let data = [];
    let skip = (param.page - 1) * param.size;
    let result;

    sql = 'SELECT name,url,create_time FROM file WHERE is_deleted = 0 AND is_public_show = 1';
    if (param.keyword) {
        sql += ' AND name LIKE ?';
        data.push(param.keyword);
    }
    sql += ' ORDER BY create_time DESC LIMIT ?,?';
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
exports.countByClient = async(conn, param) => {
    let sql;
    let data = [];
    let result;

    sql = 'SELECT count(*) countNum FROM file WHERE is_deleted = 0 AND is_public_show = 1';
    if (param.keyword) {
        sql += ' AND name LIKE ?';
        data.push(param.keyword);
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