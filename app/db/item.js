'use strict';
const DB = require('../common/mysql');
const ApiErrorNames = require('../error/apiErrorNames');

/**
 * 插入栏目
 * @param conn
 * @param name
 * @param url
 * @param parent_id
 */
exports.add = async(conn, {name, url, parent_id}) => {
    let sql;
    let data = [name, url, parent_id || 0];

    sql = 'INSERT INTO item(name, url, parent_id) VALUES (?,?,?)';
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
 * 查看所有栏目
 * @param conn
 * @param parent_id
 * @param tree
 */
exports.list = async(conn, parent_id, tree = []) => {
    let sql;
    let data = [parent_id || 0];
    let result;

    sql = 'SELECT id, name, parent_id, url FROM item WHERE is_deleted = 0 AND parent_id = ?';
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
            label: result[i].name,
            url: result[i].url
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

exports.update = async(conn, {id, name, url}) => {
    let sql;
    let data = [name, url, id];

    sql = 'UPDATE item SET name = ?, url = ? WHERE id = ?';
    try {
        await DB.update({
            connection: conn,
            sql: sql,
            data: data
        })
    } catch (e) {
        throw e;
    }
};