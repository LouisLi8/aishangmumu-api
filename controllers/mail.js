
const {OK} = require('../utils/package');
const UserModel = require('../modules/user');
// const session = require('koa-session');
// const redis = require('koa-redis')
// redis数据库
// const store = redis().client
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
        if(ctx.cookies.get(`expire:${username}`)){
            OK(ctx, 300, '验证请求过于频繁，1分钟内1次', null);return;
        }
        // const expire = await store.hget(`nodemail:${username}`, 'expire')
        // OK(ctx, 200, '验证码发送成功', await store.hget(`nodemail:${username}`, 'expire')); return
        // 频率--1分钟内1次
        // if (expire && (+new Date() - expire < 0)) {
        //     ctx.body = {
        //         code: -1,
        //         msg: '验证请求过于频繁，1分钟内1次'
        //     }
        //     return
        // }

        // 配置参数
        const conf = {
            get user() {
                return '714626676@qq.com'
            },
            get pass() { // smtp授权码 ，自行替换
                return 'cugwvetuomwxbdfi'
            },
            get code() { // 验证码
                return () => {
                    return Math.random().toString(16).slice(2, 6).toUpperCase()
                }
            },
            get expire() { // 到期时间， 48小时
                return () => {
                    return +new Date() + 48 * 60 * 60  * 1000
                }
            }
        }

        const transportOptions = {
            service: 'QQ', // no need to set host or port etc. 更多邮箱支持 https://nodemailer.com/smtp/well-known/
            
            // host: "smtpdm.aliyun.com",
            port: 25,
            //"secureConnection": true, // use SSL, the port is 465
            auth: {
                user: conf.user, // 发件邮箱
                pass: conf.pass // smtp授权码
            }
        }

        let code

        // 邮件模版
        const sendMailOptions = {
            from: `"system"<${conf.user}>`, // 发件人
            to: email, // 收件人
            subject: '爱尚盟卡媒体账号邮箱验证', // 邮件主题
            html: `
            <h3>尊敬的 ${username}:</h3>
            <p>欢迎您使用爱尚盟卡媒体平台（http://asmumu.jmaogou.com/）。</p>
            <p>您的登录邮箱是 ${email}。请使用以下验证码验证邮箱有效性，验证成功可以加速账户资质审核。 </p>
            <p>验证码: ${code = conf.code()}</p>
            <p>该验证码在48小时内有效，48小时后需要重新发送验证邮箱</p>
            <p>此为系统邮件，请勿回复</p>
            <p>一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一</p>
            <p>爱尚盟卡媒体平台</p>
            ` // 邮件内容
        }

        // create reusable transporter 
        let transporter = nodeMailer.createTransport(transportOptions)

        try {
            // send mail
            let info = await transporter.sendMail(sendMailOptions)
            if (info) {
                // 存储状态
                // await store.hmset(`nodemail:${username}`, 'code', code, 'expire', conf.expire(), 'email', email, 'storageTime', +new Date())
                ctx.cookies.set(`nodemail:${username}`, code, {maxAge: conf.expire()}); // 验证码48小时有效
                ctx.cookies.set(`expire:${username}`, 'expire', {maxAge: 60 * 1000}); // 一分钟之内发送一条
                OK(ctx, 200, '验证码发送成功', true);
            }
        } catch (error) {
            OK(ctx, -1, '验证码发送失败，请重新尝试', error);
        }
    }
}

module.exports = MailController;