
const {OK} = require('../utils/package');
const UserModel = require('../modules/user');
// redis数据库
const redis = require('koa-redis')
const store = redis().client
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
            && req.real_name  && req.phone) {
            try{
                //创建用户模型
                const data = await UserModel.getUserDetail({email:req.email});
                if(data) {
                    OK(ctx, 300, '邮箱已经存在！', null);
                }
                else {
                    const sms = await store.hget(`nodemail:${req.email}`, 'code')
                    if(sms == req.sms) {
                        delete(req.sms);
                        const ret = await UserModel.create(req);
                        const data = await UserModel.getUserDetail({email:ret.email});
                        if(data) {
                                OK(ctx, 200, '成功！', true);
                        } else {
                                OK(ctx, 300, '用户创建失败，请稍后重试！', null);
                        }
                    } else {
                        OK(ctx, 300, '邮箱验证码错误或者失效！', null);
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
    // 更新用户合同信息
    static async updateAgentInfo(ctx){
        let agent_adress = ctx.request.body.agent_adress;
        let agent_tel = ctx.request.body.agent_tel;
        let agent_consignee = ctx.request.body.agent_consignee;
        const token = ctx.request.header.token;
        if(agent_adress || agent_tel || agent_consignee) {
            try{
                // 查询用户详情模型
                // 查询用户详情模型
                let userInfo = await UserModel.getUserDetailByToken(token);
                if(userInfo) {
                    let params = {
                        id: userInfo.id,
                        agent_adress,
                        agent_tel,
                        agent_consignee
                    };
                    let data = await UserModel.updateAgentInfo(params);
                    OK(ctx, 200, '查询成功', data);
                }
                else {
                    OK(ctx, 401, '用户信息已经失效,请重新登录', data);
                }
            }catch(err){
                OK(ctx, 300, '查询失败', err);
            }
        } else {
            OK(ctx, 300, '地址、联系方式和收件人信息不能为空！', ctx);
        }
    }
    static async updateAgentStatus(ctx){
        let req = ctx.request.body;
        try{
            let data = await UserModel.updateAgentStatus(req);
            OK(ctx, 200, '合同状态修改成功', data);
        }catch(err){
            OK(ctx, 300, '合同状态修改失败', err);
        }
    }
    static async updatePercentage(ctx){
        let req = ctx.request.body;
        try{
            let data = await UserModel.updatePercentage(req);
            OK(ctx, 200, '分成比例修改成功', data);
        }catch(err){
            OK(ctx, 300, '分成比例修改失败', err);
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
        req.size = req.size || 10;
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
            OK(ctx, 300, '查询失败', await UserModel.getUserList(req));
        }
    }
    static async subUserList(ctx){
        const req = ctx.request.body;
        const token = ctx.request.header.token;
        // 查询用户详情模型
        let userInfo = await UserModel.getUserDetailByToken(token);
        if(userInfo) {
            // OK(ctx, 200, '查询成功', ctx);return
            req.page = req.page || 1;
            req.size = req.size || 20;
            try{
                // 查询用户详情模型
                let data = await UserModel.subUserList(userInfo.id);
                if(data) {
                    OK(ctx, 200, '查询成功', data);
                }
                else {
                    OK(ctx, 300, '未询到数据', data);
                }
                
            }catch(err){
                OK(ctx, 300, '查询失败', await UserModel.subUserList(req));
            }
        } else {
            OK(ctx, 401, '身份过期,请重新登录', null);
        }
    }
    static async search(ctx){
        const email = ctx.request.body.email;
        try{
            // 查询用户详情模型
            let data = await UserModel.getUserListByEmail(email);
            if(data) {
                OK(ctx, 200, '查询成功', data);
            }
            else {
                OK(ctx, 300, '未询到数据', data);
            }
            
        }catch(err){
            OK(ctx, 300, '查询失败', await UserModel.getUserListByEmail(email));
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
               const data = await UserModel.getUserDetail({email: req.email});
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
    static async resetPassword(ctx){
        let req = ctx.request.body;
        if(req.old_pass && req.password && req.confirm_password){
            //接收客户端
            const token = ctx.request.header.token;
            const { old_pass, password, confirm_password } = ctx.request.body
            // 查询用户详情模型
            let data = await UserModel.getUserDetailByToken(token);
            if(data) {
                if(old_pass === data.password){
                    if(password !== confirm_password) {
                        OK(ctx, 300 ,'两次密码不一致', null)
                    } else {
                        const res = await UserModel.updatePassword({password, id: data.id});
                        OK(ctx, 200, '密码修改成功', res);
                    }
                }else{
                    OK(ctx, 300 ,'原密码输入错误', null)
                }
            }
            else {
                OK(ctx, 401, '用户信息已经失效,请重新登录', data);
            }
        }else {
            OK(ctx, 300 ,'参数不齐全', null)
        }
    }
    static async del(ctx){
        let req = ctx.request.body;
        if(req.old_pass && req.password && req.confirm_password){
            //接收客户端
            const token = ctx.request.header.token;
            const { id } = ctx.request.body
            // 查询用户详情模型
            let data = await UserModel.getUserDetailByToken(token);
            if(data && data.is_admin) {
                const res = await UserModel.del(id);
                OK(ctx, 200, '用户删除成功', res);
            }
            else {
                OK(ctx, 401, '用户信息已经失效,请重新登录', data);
            }
        }else {
            OK(ctx, 300 ,'参数不齐全', null)
        }
    }
    static async resetPasswordWithoutLogin(ctx){
        let req = ctx.request.body;
        const {email , password, confirm_password, sms} = req;
        if( password && confirm_password && sms){
            //接收客户端
            // 查询用户详情模型
            let data = await UserModel.getUserDetail({email});
            if(data) {
                if(password !== confirm_password) {
                    OK(ctx, 300 ,'两次密码不一致', null)
                } else {
                    const sms_ = await store.hget(`nodemail:${data.email}`, 'code')
                    if(sms === sms_) {
                        delete(req.sms);
                        const res = await UserModel.updatePassword({password, id: data.id});
                        OK(ctx, 200, '密码修改成功', res);
                    } else {
                        OK(ctx, 300, '邮箱验证码错误或者失效！', null);
                    }
                }
            }
            else {
                OK(ctx, 300, '用户信息不存在', null);
            }
        }else {
            OK(ctx, 300 ,'参数不齐全', null)
        }
    }
}

module.exports = userController;