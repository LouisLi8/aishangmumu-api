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
        if(req.email && req.password && req.category && req.company_name
            && req.real_name  && req.phone && req.has_media_contact){
            try{
                //创建用户模型
                const hasEmail = await User.findOne({
                    where: {
                        email: req.email
                    }
                });
                if(hasEmail) {
                    OK(ctx, 300, '邮箱已经存在！', null);
                }
                else {
                    const ret = await User.create(req);
                    //使用刚刚创建的用户ID查询文章详情，且返回用户详情信息
                    const data = await User.findOne({
                        where: {
                           id: ret.id
                        }
                    });
                   if(data) {
                    OK(ctx, 200, '用户创建成功！', data);
                   } else {
                    OK(ctx, 300, '用户创建失败，请稍后重试！', null);
                   }
                }
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
                let data = await UserModel.findOne({
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
                const ret = await User.findOne({
                    where: {
                       email: req.email
                    }
               });
               if(ret) {
                   const password = ret.password;
                   if(password === req.password) {
                       OK(ctx, 200 ,'登录成功', null);
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