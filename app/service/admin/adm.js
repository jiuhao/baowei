const DB = require('../../common/mysql');
const admDB = require('../../db/adm');
const ApiErrorNames = require('../../error/apiErrorNames');
const ApiError = require('../../error/apiError');

exports.add = async({username, password, role, nickname, mobile}) => {
    let conn;
    if (!username || !password || !role || !nickname || !mobile) {
        throw new Error(ApiErrorNames.PARAM_ERROR);
    }

    try {
        conn = await DB.getConnection();
        await admDB.add(conn, {
            username: username,
            password: password,
            role: role,
            nickname: nickname,
            mobile: mobile
        });
    } catch (e) {
        throw e;
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
    if (!param.currentPage || !param.size) {
        throw new Error(ApiErrorNames.PARAM_ERROR);
    }
    try {
        conn = await DB.getConnection();
        list = await admDB.list(conn, param);
        total = await admDB.count(conn, param);
    } catch (e) {
        throw e;
    } finally {
        await DB.release(conn);
    }

    return {
        total: total,
        list: list
    };
};

exports.delete = async({id}) => {
    let conn;
    if (!id) {
        throw new Error(ApiErrorNames.PARAM_ERROR);
    }

    try {
        conn = await DB.getConnection();
        await admDB.delete(conn, id);
    } catch (e) {
        throw e;
    } finally {
        await DB.release(conn);
    }

    return 'success';
};

exports.update = async(param) => {
    let conn;

    if (!param.nickname && !param.mobile && !param.role) {
        throw new Error(ApiErrorNames.PARAM_ERROR);
    }
    try {
        conn = await DB.getConnection();
        await admDB.update(conn, param);
    } catch (e) {
        throw e;
    } finally {
        await DB.release(conn);
    }

    return 'success';
};

exports.login = async({username, password}) => {
    let conn;
    let adm;

    if (!username || !password) {
        throw new Error(ApiErrorNames.PARAM_ERROR);
    }

    try {
        conn = await DB.getConnection();
        adm = await admDB.loadByUsername(conn, username);
        if (!adm) {
            throw new ApiError({
                code: -1,
                message: '账户不存在'
            });
        }
        if (adm.password != password) {
            throw new ApiError({
                code: -1,
                message: '账户名或密码错误'
            });
        }
    } catch (e) {
        throw e;
    } finally {
        await DB.release(conn);
    }

    return {
        id: adm.id,
        username: adm.username,
        role: adm.role,
        nickname: adm.nickname
    };
};