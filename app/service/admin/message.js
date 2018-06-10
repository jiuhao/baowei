'use strict';
const DB = require('../../common/mysql');
const messageDB = require('../../db/message');
const ApiErrorNames = require('../../error/apiErrorNames');

exports.add = async({content}) => {
    let conn;

    if (!content) {
        throw new Error(ApiErrorNames.PARAM_ERROR);
    }
    try {
        conn = await DB.getConnection();
        await messageDB.add(conn, content);
    } finally {
        await DB.release(conn);
    }

    return 'success';
};

exports.answer = async({id, answer}) => {
    let conn;

    if (!id || !answer) {
        throw new Error(ApiErrorNames.PARAM_ERROR);
    }
    try {
        conn = await DB.getConnection();
        await messageDB.answer(conn, {
            id: id,
            answer: answer
        });
    } finally {
        await DB.release(conn);
    }

    return 'success';
};

exports.list = async(param) => {
    let conn;
    let total;
    let list;
    param.currentPage = +param.currentPage;
    param.size = +param.size;
    param.is_public_show = +param.is_public_show;

    if (!param.currentPage || !param.size) {
        throw new Error(ApiErrorNames.PARAM_ERROR);
    }
    try {
        conn = await DB.getConnection();
        list = await messageDB.list(conn, param);
        total = await messageDB.count(conn, param);
    } finally {
        await DB.release(conn);
    }

    return {
        list: list,
        total: total
    };
};