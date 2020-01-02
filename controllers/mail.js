
const {OK} = require('../utils/package');
const UserModel = require('../modules/user');
const redis = require('koa-redis')
// redis数据库
const store = redis().client
const nodeMailer = require('nodemailer')

class MailController {
    /**
     * 创建用户
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async send(ctx){
        //接收客户端
        let req = ctx.request.body;
        const { username, email } = ctx.request.body
        // 请求到期时间
        const expire = await store.hget(`nodemail:${username}`, 'expire')

        // 频率--1分钟内1次
        if (expire && (+new Date() - expire < 0)) {
        ctx.body = {
            code: -1,
            msg: '验证请求过于频繁，1分钟内1次'
        }
            return
        }

        // 配置参数
        const conf = {
            get user() {
                return '963097377@qq.com'
            },
            get pass() { // smtp授权码，自行替换
                return 'azfrzyervgzlbeci'
            },
            get code() { // 验证码
                return () => {
                return Math.random().toString(16).slice(2, 6).toUpperCase()
                }
            },
            get expire() { // 到期时间
                return () => {
                return +new Date() + 60 * 1000
                }
            }
        }

        const transportOptions = {
        service: 'QQ', // no need to set host or port etc. 更多邮箱支持 https://nodemailer.com/smtp/well-known/
        auth: {
            user: conf.user, // 发件邮箱
            pass: conf.pass // smtp授权码
        }
        }

        let code

        // 邮件模版
        const sendMailOptions = {
            from: `"认证邮件"<${conf.user}>`, // 发件人
            to: email, // 收件人
            subject: '注册验证', // 邮件主题
            html: `<h3>欢迎使用爱尚盟卡，您本次的验证码是${code = conf.code()}，一分钟之内有效</h3>` // 邮件内容
        }

        // create reusable transporter 
        let transporter = nodeMailer.createTransport(transportOptions)

        try {
            // send mail
            let info = await transporter.sendMail(sendMailOptions)

            if (info) {
                // 存储状态
                await store.hmset(`nodemail:${username}`, 'code', code, 'expire', conf.expire(), 'email', email, 'storageTime', +new Date())
                OK(ctx, 200, '验证码发送成功', null);
            }
        } catch (error) {
            console.log(error)
            OK(ctx, -1, '验证码发送失败，请重新尝试', error);
        }
    }
}

module.exports = MailController;