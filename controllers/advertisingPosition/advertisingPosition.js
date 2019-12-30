const {OK} = require('../../utils/package');
const AdvertisingModel = require('../../modules/advertisingPosition/advertisingPosition');
const UserModel = require('../../modules/user');

class MediaController {
    /**
     * 创建
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx){
        //接收客户端
        let headers = ctx.request.headers;
        let req = ctx.request.body;
        const userInfo = await UserModel.getUserDetailByToken(headers.token);
        if(userInfo){
            try{
                //创建模型
                req.user_id = userInfo.id;
                const data = await AdvertisingModel.create(req);
                OK(ctx, 200, '创建成功！', data);
            }catch(err){
                OK(ctx, 300, '创建失败，请稍后重试', err);
            }
        }else {
            OK(ctx, 401, '信息已过期，请重新登录！', req);
        }
    }
    /**
     * 获取媒体详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx){
        let id = ctx.request.body.id || "";
        let name = ctx.request.body.name || '';
        if(id || name){
            try{
                // 查询媒体详情模型
                let data = await AdvertisingModel.getMediaDetail({id, name});
                OK(ctx, 200, '查询成功', data);
            }catch(err){
                OK(ctx, 300, '查询失败', err);
            }
        }else {
            OK(ctx, 300, '媒体ID或者名称必须传', null);
        }
    }
    static async search(ctx){
        let id = ctx.request.body.id || "";
        let media_name = ctx.request.body.media_name || '';
        if(id || media_name){
            try{
                // 查询媒体详情模型
                let data = await AdvertisingModel.getMediaListAllByNameOrId(id, media_name);
                OK(ctx, 200, '查询成功', data);
            }catch(err){
                OK(ctx, 300, '查询失败', err);
            }
        }else {
            OK(ctx, 300, '媒体ID或者名称必须传', null);
        }
    }

    /**
     * 获取媒体列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async list(ctx){
        let headers = ctx.request.headers;
        const userInfo = await UserModel.getUserDetailByToken(headers.token);
        if(userInfo) {
            try{
                // 查询媒体详情模型
                let data = await AdvertisingModel.getList(userInfo.id);
                OK(ctx, 200, '查询成功', data);
            }catch(err){
                OK(ctx, 300, '查询失败', err);
            }
        } else {
            OK(ctx, 401, '未登录', null);
        }
    }
    static async listAll(ctx){
        try{
            // 查询媒体详情模型
            let data = await AdvertisingModel.getMediaListAll();
            OK(ctx, 200, '查询成功', data);
        }catch(err){
            OK(ctx, 300, '查询失败', err);
        }
    }
}

module.exports = MediaController;