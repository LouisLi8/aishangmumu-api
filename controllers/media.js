const {OK} = require('../utils/package');
const MediaModel = require('../modules/media');

class MediaController {
    /**
     * 创建用户
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx){
        //接收客户端
        let req = ctx.request.body;
        if(req){
            try{
                //创建用户模型
                const ret = await MediaModel.create(req);
                OK(ctx, 200, '用户创建成功！', ret);
            }catch(err){
                OK(ctx, 300, '用户创建失败，请稍后重试', hasEmail);
            }
        }else {
            OK(ctx, 300, '参数不齐全！', req);
        }
    }

    /**
     * 获取用户详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx){
        let id = ctx.params.id;
        if(id){
            try{
                // 查询用户详情模型
                let data = await MediaModel.findOne({
                    where: {
                       id: id
                    }
                });
                if(data) {
                    OK(ctx, 200, '查询成功', data);
                }
                else {
                    OK(ctx, 300, '为查询到数据', data);
                }
               
            }catch(err){
                OK(ctx, 300, '查询失败', err);
            }
        }else {
            OK(ctx, 300, '用户ID必须传', null);
        }
    }
}

module.exports = MediaController;