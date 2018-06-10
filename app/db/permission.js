'use strict';
const DB = require('../common/mysql');

/**
 * 新建权限
 * @param conn
 * @param name
 * @param url
 * @param parent_id
 * @param type
 */
exports.add = async(conn, {name, url, parent_id, type}) => {
    let sql;
    let data = [name, url, parent_id || 0, type];

    sql = 'INSERT INTO permission(name, url, parent_id, type) VALUES (?,?,?,?)';
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

/**
 * 查看所有权限
 * @param conn
 * @param parent_id
 * @param tree
 */
exports.list = async(conn, parent_id = 0, tree = []) => {
    let sql;
    let data = [parent_id || 0];
    let result;

    sql = 'SELECT * FROM permission WHERE parent_id = ?';
    try {
        result = await DB.find({
            connection: conn,
            sql: sql,
            data: data
        });
    } catch (e) {
        throw e;
    }
    for (let i = 0; i < result.length; i++) {
        tree[i] = {
            id: result[i].id,
            label: `${result[i].name}[${result[i].type}]`
        };
        tree[i].children = [];
        try {
            await exports.list(conn, result[i].id, tree[i].children);
        } catch (e) {
            throw e;
        }
    }

    return tree;
};

exports.delete = async(conn, id) => {
    let sql;
    let data = [id];

    sql = 'DELETE FROM permission WHERE id = ?';
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