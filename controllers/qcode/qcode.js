
const {OK} = require('../../utils/package');
const UserModel = require('../../modules/user');
const QcodeModel = require('../../modules/qcode/qcode.js');
class QcodeController {
    /**
     * 创建用户
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async update(ctx){
        //接收客户端
        let req = ctx.request.body;
        const token = ctx.request.header.token;
        try{
            // 查询用户详情模型
            let user = await UserModel.getUserDetailByToken(token);
            if(user) {
                req.user_id = user.id;
                const ret = await QcodeModel.update(req);
                OK(ctx, 200, '更新成功！', true);
            }
            else {
                OK(ctx, 300, '信息过期', err);
            }
        }catch(err){
            OK(ctx, 300, '创建失败，请稍后重试', err);
        }
    }
    static async info(ctx){
        const token = ctx.request.header.token;
        // 查询用户详情模型
        let user = await UserModel.getUserDetailByToken(token);
        if(user) {
            const ret = await QcodeModel.getInfo();
            OK(ctx, 200, '查询成功！', ret);
        }
        else {
            OK(ctx, 401, '用户信息过期', null);
        }
    }
}

module.exports = QcodeController;