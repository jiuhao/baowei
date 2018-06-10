'use strict';
const DB = require('../../common/mysql');
const fileDB = require('../../db/file');
const ApiErrorNames = require('../../error/apiErrorNames');
const uploadFile = require('../../common/upload').uploadFile;
const path = require('path');
const config = require('../../config');

exports.add = async(ctx) => {
    let conn;
    let paths = [];
    let serverFilePath = path.resolve(__dirname, `../../../upload-files`);
    const result = await uploadFile(ctx, {
        path: serverFilePath
    });
    try {
        conn = await DB.getConnection();
        for (let i = 0; i < result.files.length; i++) {
            paths.push(result.files[i].path.split('upload-files')[1]);
            await fileDB.add(conn, {
                name: result.files[i].filename,
                url: result.files[i].path.split('upload-files')[1]
            })
        }
    } catch (e) {
        throw e;
    } finally {
        await DB.release(conn);
    }

    return paths;
};

exports.list = async(param) => {
    param.currentPage = +param.currentPage;
    param.size = +param.size;

    let conn;
    let total;
    let list;
    param.currentPage = +param.currentPage;
    param.size = +param.size;
    param.is_public_show = +param.is_public_show;

    try {
        conn = await DB.getConnection();
        list = await fileDB.list(conn, param);
        total = await fileDB.count(conn, param);
    } catch (e) {
        throw e;
    } finally {
        await DB.release(conn);
    }
    for (let i = 0; i < list.length; i++) {
        list[i].url = `${config.sys.file_prefix}${list[i].url}`;
    }

    return {
        list: list,
        total: total
    };
};