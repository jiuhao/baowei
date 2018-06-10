const DB = require('../../common/mysql');
const articleDB = require('../../db/article');
const ApiErrorNames = require('../../error/apiErrorNames');
const config = require('../../config');

/**
 * 新增文章
 * @param param {title, type, content, subtitle, subimg}
 * @param operator
 * @return {string}
 */
exports.add = async(param, operator) => {
    let conn;

    param.type = +param.type;
    param.is_public_show = +param.is_public_show;
    if (!param.title || !param.content || ![1, 2, 3, 4, 5, 6].includes(param.type)) {
        throw new Error(ApiErrorNames.PARAM_ERROR);
    }
    param.author_name = operator.nickname;
    param.publisher_id = operator.id;
    try {
        conn = await DB.getConnection();
        await articleDB.add(conn, param);
    } finally {
        await DB.release(conn);
    }

    return 'success';
};

/**
 * 查看文章
 * @param param{ type, is_public_show, keyword}
 * @return {{list: *, total: *}}
 */
exports.list = async(param) => {
    let conn;
    let total;
    let list;
    param.currentPage = +param.currentPage;
    param.size = +param.size;

    if (!param.currentPage || !param.size) {
        throw new Error(ApiErrorNames.PARAM_ERROR);
    }
    try {
        conn = await DB.getConnection();
        list = await articleDB.list(conn, param);
        total = await articleDB.count(conn, param);
    } finally {
        await DB.release(conn);
    }
    for (let i = 0; i < list.length; i++) {
        if (list[i].subimg) {
            list[i].subimg = `${config.sys.file_prefix}${list[i].subimg}`;
        }
    }

    return {
        list: list,
        total: total
    };
};

/**
 *
 * @param param {title, subtitle, content}
 * @return {string}
 */
exports.update = async(param) => {
    let conn;

    param.id = +param.id;
    param.type = +param.type;
    param.is_public_show = +param.is_public_show;

    if (!param.id) {
        throw new Error(ApiErrorNames.PARAM_ERROR);
    }
    try {
        conn = await DB.getConnection();
        await articleDB.update(conn, param);
    } finally {
        await DB.release(conn);
    }

    return 'success';
};

exports.load = async({id}) => {
    let conn;
    let result;

    if (!id) {
        throw new Error(ApiErrorNames.PARAM_ERROR);
    }
    try {
        conn = await DB.getConnection();
        result = await articleDB.load(conn, id);
    } finally {
        await DB.release(conn);
    }
    if (result.subimg) {
        result.subimg = `${config.sys.file_prefix}${result.subimg}`;
    }

    return result;
};