
const {OK} = require('../utils/package');
const RevenueModel = require('../modules/revenue');
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
        const token = ctx.request.header.token;
        try{
            // 查询用户详情模型
            let user = await UserModel.getUserDetailByToken(token);
            if(user) {
                const ret = await RevenueModel.create(req);
                OK(ctx, 200, '成功！', true);
            }
            else {
                OK(ctx, 300, '信息过期', err);
            }
        }catch(err){
            OK(ctx, 300, '创建失败，请稍后重试', err);
        }
    }
    static async listAll(ctx){
        //接收客户端
        const token = ctx.request.header.token;
        try{
            // 查询用户详情模型
            let user = await UserModel.getUserDetailByToken(token);
            if(user) {
                const ret = await RevenueModel.listALl();
                OK(ctx, 200, '创建成功！', true);
            }
            else {
                OK(ctx, 300, '信息过期', err);
            }
        }catch(err){
            OK(ctx, 300, '创建失败，请稍后重试', err);
        }
    }
    static async update(ctx){
        //接收客户端
        const token = ctx.request.header.token;
        const req = ctx.request.body;
        try{
            // 查询用户详情模型
            let user = await UserModel.getUserDetailByToken(token);
            if(user) {
                const ret = await RevenueModel.update(req);
                OK(ctx, 200, '更新成功！', ret);
            }
            else {
                OK(ctx, 300, '信息过期', err);
            }
        }catch(err){
            OK(ctx, 300, '更新失败，请稍后重试', err);
        }
    }
}

module.exports = FinanceController;