// 引入mysql的配置文件
const db = require('../config/db');
const {OK} = require('../utils/package');

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const User = Sequelize.import('../schema/User');
User.sync({force: false}); //自动创建表

class userController {
    /**
     * 创建用户
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx){
        //接收客户端
        let req = ctx.request.body;
        if(req.title && req.author && req.content && req.category){
            try{
                //创建用户模型
                const ret = await UserModel.createUser(req);
                //使用刚刚创建的用户ID查询文章详情，且返回用户详情信息
                const data = await UserModel.getUserDetail(ret.id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '创建用户成功',
                    data
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '创建用户失败',
                    data: err
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全'
            }
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
                let data = await UserModel.getUserDetail(id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                    data
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '用户ID必须传'
            }
        }
    }
    /**
     * 登录
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async login(ctx){
        let req = ctx.query;
        if(req.email && req.password){
            try{
                //创建用户模型
                const ret = await User.findOne({
                    where: {
                       email: req.email
                    }
               });
               if(ret) {
                   const password = ret.password;
                   if(password === req.password) {
                       OK(ctx, 200 ,'登录成功', null);
                   }
               } else {
                OK(ctx, "app_404" ,'您还未注册，请先注册', null)
               }
            }catch(err){
                OK(ctx, "app_407" ,'登录失败', err)
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: "app_407",
                msg: '参数不齐全',
                data: ctx.request,
                data1: ctx.params,
            }
        }
    }
}

module.exports = userController;