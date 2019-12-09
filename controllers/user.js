
const {OK} = require('../utils/package');
const UserModel = require('../modules/user');

class userController {
    /**
     * 创建用户
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx){
        //接收客户端
        let req = ctx.request.body;
        if(req.email && req.password && req.category && req.company_name
            && req.real_name  && req.phone && req.has_media_contact){
            try{
                //创建用户模型
                const hasEmail = await UserModel.getUserDetail({email:req.email});
                if(hasEmail) {
                    OK(ctx, 300, '邮箱已经存在！', null);
                }
                else {
                    const ret = await UserModel.create(req);
                    //使用刚刚创建的用户ID查询文章详情，且返回用户详情信息
                    const data = await UserModel.getUserDetail({email:ret.email});
                   if(data) {
                    OK(ctx, 200, '用户创建成功！', data);
                   } else {
                    OK(ctx, 300, '用户创建失败，请稍后重试！', null);
                   }
                }
            }catch(err){
                OK(ctx, 300, '用户创建失败，请稍后重试', err);
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
    static async info(ctx){
        let email = ctx.request.body.email;
        let id = ctx.request.body.id;
        if(email || id) {
            try{
                // 查询用户详情模型
                let data = await UserModel.getUserDetail({email,id});
                if(data) {
                    OK(ctx, 200, '查询成功', data);
                }
                else {
                    OK(ctx, 401, '用户信息已经失效,请重新登录', data);
                }
                
            }catch(err){
                OK(ctx, 300, '查询失败', err);
            }
        } else {
            OK(ctx, 300, 'email或id必传！', ctx);
        }
    }
    static async getInfoByToken(ctx){
        const token = ctx.request.header.token;
        if(token) {
            try{
                // 查询用户详情模型
                let data = await UserModel.getUserDetailByToken(token);
                if(data) {
                    OK(ctx, 200, '查询成功', data);
                }
                else {
                    OK(ctx, 401, '用户信息已经失效,请重新登录', data);
                }
            }catch(err){
                OK(ctx, 300, '查询失败', err);
            }
        }else {
            OK(ctx, 300, '用户信息不存在！', ctx);
        }
    }
    /**
     * 获取用户列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async list(ctx){
        const req = ctx.request.body;
        // OK(ctx, 200, '查询成功', ctx);return
        req.page = req.page || 1;
        req.size = req.size || 2;
        try{
            // 查询用户详情模型
            let data = await UserModel.getUserList(req);
            if(data) {
                OK(ctx, 200, '查询成功', data);
            }
            else {
                OK(ctx, 300, '未询到数据', data);
            }
            
        }catch(err){
            OK(ctx, 300, '查询失败', err);
        }
    }
    /**
     * 登录
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async login(ctx){
        let req = ctx.request.body;
        if(req.email && req.password){
            try{
                //创建用户模型
               const data = await UserModel.getUserDetail(req.email);
               if(data) {
                   const password = data.password;
                   if(password === req.password) {
                       OK(ctx, 200 ,'登录成功', data);
                   } else {
                    OK(ctx, 300 ,'密码错误', null);
                   }
               } else {
                OK(ctx, 300 ,'您还未注册，请先注册', null)
               }
            }catch(err){
                OK(ctx, 300 ,'登录失败', err)
            }
        }else {
            OK(ctx, 300 ,'参数不齐全', null)
        }
    }
}

module.exports = userController;