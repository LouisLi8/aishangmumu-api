const {OK} = require('../../utils/package');
const MediaModel = require('../../modules/media/media');
const UserModel = require('../../modules/user');

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
        const userInfo = await UserModel.getUserDetailByToken(headers.token);
        // OK(ctx, 200, '媒体创建成功！', userInfo); return
        if(userInfo){
            try{
                //创建媒体模型
                req.user_id = userInfo.id;
                const data = await MediaModel.create(req);
                OK(ctx, 200, '媒体创建成功！', data);
            }catch(err){
                OK(ctx, 300, '媒体创建失败，请稍后重试', await MediaModel.create(req));
            }
        }else {
            OK(ctx, 401, '信息已过期，请重新登录！', req);
        }
    }
    static async updateStatus(ctx){
        //接收客户端
        let headers = ctx.request.headers;
        let req = ctx.request.body;
        const userInfo = await UserModel.getUserDetailByToken(headers.token);
        if(userInfo){
            try{
                const data = await MediaModel.updateStatus(req);
                OK(ctx, 200, '媒体更新成功！', data);
            }catch(err){
                OK(ctx, 300, '媒体更新失败，请稍后重试', await MediaModel.updateStatus(req));
            }
        }else {
            OK(ctx, 401, '信息已过期，请重新登录！', req);
        }
    }
    static async updateNumber(ctx){
        //接收客户端
        let headers = ctx.request.headers;
        let req = ctx.request.body;
        const userInfo = await UserModel.getUserDetailByToken(headers.token);
        if(userInfo){
            try{
                const data = await MediaModel.updateNumber(req);
                OK(ctx, 200, '媒体更新成功！', data);
            }catch(err){
                OK(ctx, 300, '媒体的绑定ID必须真实存在！', null);
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
                let data = await MediaModel.getMediaDetail({id, name});
                OK(ctx, 200, '查询成功', data);
            }catch(err){
                OK(ctx, 300, '查询失败', err);
            }
        }else {
            OK(ctx, 300, '媒体ID或者名称必须传', null);
        }
    }
    static async delById(ctx){
        let id = ctx.request.body.id || "";
        let name = ctx.request.body.name || '';
        if(id || name){
            try{
                // 查询媒体详情模型
                let data = await MediaModel.delById(id);
                OK(ctx, 200, '删除成功', data);
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
                let data = await MediaModel.getMediaListAllByNameOrId(id, media_name);
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
                // 查询媒体详情模型--自己的
                let data = await MediaModel.getMediaList(userInfo.id);
                OK(ctx, 200, '查询成功', data);
            }catch(err){
                OK(ctx, 300, '查询失败', err);
            }
        } else {
            OK(ctx, 401, '未登录', null);
        }
    }
    static async del(ctx){
        let headers = ctx.request.headers;
        const id = ctx.request.body.id;
        const userInfo = await UserModel.getUserDetailByToken(headers.token);
        if(userInfo) {
            const data = await MediaModel.del(id);
            OK(ctx, 200, '成功！', data);
        } else {
            OK(ctx, 401, '信息已过期，请重新登录！', null);
        }
    }
    static async listAll(ctx){
        try{
            // 查询媒体详情模型--所有用户的
            let data = await MediaModel.getMediaListAll();
            // let data =  await Sequelize.query(`
            //     SELECT m.media_name u.real_name FROM media m LEFT JOIN user u ON m.user_id = u.id
            // `);
            OK(ctx, 200, '查询成功', data);
        }catch(err){
            OK(ctx, 300, '查询失败', err);
        }
    }
}

module.exports = MediaController;