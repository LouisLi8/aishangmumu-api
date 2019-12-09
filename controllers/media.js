const {OK} = require('../utils/package');
const MediaModel = require('../modules/media');
const UserModel = require('../modules/user');

class MediaController {
    /**
     * 创建媒体
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx){
        //接收客户端
        let headers = ctx.request.headers;
        let req = ctx.request.body;
        if(headers.token) {
            const userInfo = await UserModel.getUserDetailByToken(headers.token);
            // OK(ctx, 200, '媒体创建成功！', userInfo); return
            if(req){
                try{
                    //创建媒体模型
                    req.user_id = userInfo.id;
                    const data = await MediaModel.create(req);
                    OK(ctx, 200, '媒体创建成功！', data);
                }catch(err){
                    OK(ctx, 300, '媒体创建失败，请稍后重试', err);
                }
            }else {
                OK(ctx, 300, '参数不齐全！', req);
            }
        } else {
            OK(ctx, 401, '未登录！', req);
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
                let data = await MediaModel.getMediaDetail({id, name});
                OK(ctx, 200, '查询成功', data);
               
            }catch(err){
                let data = await MediaModel.getMediaDetail({id, name});
                OK(ctx, 300, '查询失败', data);
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
                let data = await MediaModel.getMediaList(userInfo.id);
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
            let data = await MediaModel.getMediaListAll();
            OK(ctx, 200, '查询成功', data);
        }catch(err){
            OK(ctx, 300, '查询失败', err);
        }
    }
}

module.exports = MediaController;