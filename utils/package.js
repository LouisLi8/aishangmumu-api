// query sql
const OK = (ctx, code, msg, data) => {
    ctx.response.status = 200;
    ctx.body = {
        code: code,
        msg: msg,
        data: data
    }
}
const ERROR_500 = (ctx, data, msg) => {
    ctx.response.status = 500;
    ctx.body = {
        code: 500,
        msg: msg,
        data: data
    }
}

module.exports = {
    OK,
    ERROR_500
}