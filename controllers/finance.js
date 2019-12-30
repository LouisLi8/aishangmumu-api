
const {OK} = require('../utils/package');
const FinanceModel = require('../modules/finance');
const UserModel = require('../modules/user');
class FinanceController {
    /**
     * 创建用户
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx){
        //接收客户端
        let req = ctx.request.body;
        if(req.object) {
            const token = ctx.request.header.token;
            try{
                // 查询用户详情模型
                let user = await UserModel.getUserDetailByToken(token);
                if(data) {
                    req.user_id = user.id;
                    const ret = await FinanceModel.create(req);
                    if(data) {
                        OK(ctx, 200, '用户创建成功！', data);
                       } else {
                        OK(ctx, 300, '用户创建失败，请稍后重试！', null);
                       }
                }
                else {
                   OK(ctx, 300, '用户信息过期', err);
                }
            }catch(err){
                OK(ctx, 300, '用户创建失败，请稍后重试', err);
            }
        }else {
            OK(ctx, 300, '参数不齐全！', req);
        }
    }
    static async info(ctx){
        const token = ctx.request.header.token;
        // 查询用户详情模型
        let user = await UserModel.getUserDetailByToken(token);
        if(user) {
            const ret = await FinanceModel.getFinanceDetail(user.id);
            OK(ctx, 200, '查询成功！', ret);
        }
        else {
            OK(ctx, 300, '用户信息过期', err);
        }
    }
}

module.exports = FinanceController;