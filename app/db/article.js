'use strict';
const DB = require('../common/mysql');
const Time = require('../utils/time');

exports.add = async(conn, param) => {
    let sql;
    let data = [];

    sql = 'INSERT INTO article(title,author_name,type,publisher_id,content,';
    data.push(param.title);
    data.push(param.author_name);
    data.push(param.type);
    data.push(param.publisher_id);
    data.push(param.content);
    if (param.subtitle) {
        sql += 'subtitle,';
    }
    if (param.subimg) {
        sql += 'subimg,';
    }
    if ([0, 1].includes(param.is_public_show)) {
        sql += 'is_public_show,';
    }
    sql = sql.substring(0, sql.length - 1) + ') VALUES (?, ?, ?, ?, ?,';
    if (param.subtitle) {
        sql += '?,';
        data.push(param.subtitle);
    }
    if (param.subimg) {
        sql += '?,';
        data.push(param.subimg);
    }
    if ([0, 1].includes(param.is_public_show)) {
        sql += '?,';
        data.push(param.is_public_show);
    }
    sql = sql.substring(0, sql.length - 1) + ')';
    await DB.insert({
        connection: conn,
        sql: sql,
        data: data
    });
};


exports.updateShow = async(conn, {id, status}) => {
    let sql;
    let data = [];

    sql = 'UPDATE article SET is_public_show = ? WHERE id = ?';
    data.push(status);
    data.push(id);
    await DB.update({
        connection: conn,
        sql: sql,
        data: data
    });

};

exports.delete = async(conn, id) => {
    let sql;
    let data = [];

    sql = 'UPDATE article SET is_deleted = 1 WHERE id = ?';
    data.push(id);
    await DB.update({
        connection: conn,
        sql: sql,
        data: data
    });
};

exports.list = async(conn, param) => {
    let sql;
    let data = [];
    let skip = (param.currentPage - 1) * param.size;
    let result;

    sql = 'SELECT id, title, author_name, create_time, type, subtitle, subimg, is_public_show, update_time FROM article WHERE 1 = 1';
    if (param.type) {
        sql += ' AND type = ?';
        data.push(param.type);
    }
    if ([0, 1].includes(param.is_public_show)) {
        sql += ' AND is_public_show = ?';
        data.push(param.is_public_show);
    }
    if (param.startTime) {
        sql += ' AND update_time >= ?';
        data.push(param.startTime);
    }
    if (param.endTime) {
        sql += ' AND update_time <= ?';
        data.push(param.endTime);
    }
    if (param.keyword) {
        sql += ' AND (title LIKE ? OR subtitle LIKE ? OR author_name LIKE ?)';
        data.push(`%${param.keyword}%`);
        data.push(`%${param.keyword}%`);
        data.push(`%${param.keyword}%`);
    }
    sql += ' ORDER BY update_time DESC LIMIT ?,?';
    data.push(skip);
    data.push(param.size);
    result = await DB.find({
        connection: conn,
        sql: sql,
        data: data
    });

    return result;
};
exports.count = async(conn, param) => {
    let sql;
    let data = [];
    let result;

    sql = 'SELECT count(id) countNum FROM article WHERE 1 = 1';
    if (param.type) {
        sql += ' AND type = ?';
        data.push(param.type);
    }
    if ([0, 1].includes(param.is_public_show)) {
        sql += ' AND is_public_show = ?';
        data.push(param.is_public_show);
    }
    if (param.keyword) {
        sql += ' AND (title LIKE ? OR subtitle LIKE ?)';
        data.push(`%${param.keyword}%`);
        data.push(`%${param.keyword}%`);
    }
    result = await DB.findOne({
        connection: conn,
        sql: sql,
        data: data
    });

    return result.countNum
};

exports.update = async(conn, param) => {
    let sql;
    let data = [];

    sql = 'UPDATE article SET update_time = ?,';
    data.push(Time.timestampToString(+new Date(), 'YYYY-MM-DD hh:mm:ss'));
    if (param.title) {
        sql += 'title = ?,';
        data.push(param.title);
    }
    if (param.subtitle) {
        sql += 'subtitle = ?,';
        data.push(param.subtitle);
    }
    if (param.content) {
        sql += 'content = ?,';
        data.push(param.content);
    }
    if (param.type) {
        sql += 'type = ?,';
        data.push(param.type);
    }
    if (param.author_name) {
        sql += 'author_name = ?,';
        data.push(param.author_name);
    }
    if (param.is_public_show) {
        sql += 'is_public_show = ?,';
        data.push(param.is_public_show);
    }
    if (param.subimg) {
        sql += 'subimg = ?,';
        data.push(param.subimg);
    }
    sql = sql.substring(0, sql.length - 1);
    sql += ' WHERE id = ?';
    data.push(param.id);
    await DB.update({
        connection: conn,
        sql: sql,
        data: data
    });
};

exports.load = async(conn, id) => {
    let sql;
    let data = [id];

    sql = 'SELECT * FROM article WHERE id = ?';
    return await DB.findOne({
        connection: conn,
        sql: sql,
        data: data
    });
};

exports.getHome = async(conn) => {
    let sql;

    sql = 'SELECT id, title, author_name, update_time, subtitle FROM article WHERE is_deleted = 0 AND is_public_show = 1 ORDER BY update_time DESC LIMIT 20';
    return await DB.find({
        connection: conn,
        sql: sql
    });
};

exports.listByClient = async(conn, param) => {
    let sql;
    let data = [];
    let skip = (param.page - 1) * param.size;

    sql = 'SELECT * FROM article WHERE is_deleted = 0 AND is_public_show = 1';
    if(param.type){
        sql += ' AND type = ?';
        data.push(param.type);
    }
    sql += ' ORDER BY update_time DESC LIMIT ?,?';
    data.push(skip);
    data.push(param.size);
    return await DB.find({
        connection: conn,
        sql: sql,
        data: data
    });
};

exports.countByClient = async(conn, param) => {
    let sql;
    let data = [];
    let result;

    sql = 'SELECT COUNT(*) countNum FROM article WHERE is_deleted = 0 AND is_public_show = 1';
    if(param.type){
        sql += ' AND type = ?';
        data.push(param.type);
    }
    result = await DB.findOne({
        connection: conn,
        sql: sql,
        data: data
    });
    return result.countNum;
};

exports.getBlock = async(conn) => {
    let sql;

    sql = `(SELECT * FROM article where type = 1 order by update_time limit 6)
union
(SELECT * FROM article where type = 2 order by update_time limit 6)
union
(SELECT * FROM article where type = 3 order by update_time limit 6)
union
(SELECT * FROM article where type = 4 order by update_time limit 6)
union
(SELECT * FROM article where type = 5 order by update_time limit 6)
union
(SELECT * FROM article where type = 6 order by update_time limit 6)`;
    return await DB.find({
        connection: conn,
        sql: sql
    });
};

exports.listBlockBanner = async(conn) => {
    let sql = 'SELECT id, subimg, title FROM article WHERE is_deleted = 0 AND is_public_show = 1 AND length(subimg) > 0 LIMIT 5';
    return await DB.find({
        connection: conn,
        sql: sql
    });
};